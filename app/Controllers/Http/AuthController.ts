import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import uuid from 'uuid-wand'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render('pages/auth/login')
  }

  public async loginSubmit({ auth, request, session, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      await auth.use('web').attempt(email, password)
      return response.redirect().toRoute('main')
    } catch {
      session.flash('error', 'Email or password is wrong')
      return response.redirect().toRoute('login')
    }
  }

  public async register({ view }: HttpContextContract) {
    return view.render('pages/auth/register')
  }

  public async registerSubmit({ request, session, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
        password: schema.string([rules.minLength(6)]),
      }),
      messages: {
        'name.required': 'The name field is required.',
        'email.required': 'The email field is required.',
        'email.email': 'The email must be a valid email address.',
        'email.unique': 'The email is already taken.',
        'password.required': 'The password field is required.',
        'password.minLength': 'The password must be at least 6 characters long.',
      },
    })

    const token = uuid.v4()

    const user = new User()
    user.name = payload.name
    user.email = payload.email
    user.password = payload.password
    user.verifiedToken = token
    await user.save()

    await Mail.send((message) => {
      message
        .from('no_reply@unimal.link')
        .to(payload.email)
        .subject('Account Verify')
        .htmlView('email/verify', { payload, token })
    })

    session.flash('msgSuccess', 'Mail has been sent successfully')
    return response.redirect().toRoute('register')
  }

  public async verify({ params, response, session }: HttpContextContract) {
    const user = await User.findBy('verified_token', params.token)
    if (!user) {
      session.flash('error', 'Invalid Token')
      return response.redirect().toRoute('login')
    }
    user.verifiedAt = new Date()
    user.verifiedToken = null
    await user.save()
    session.flash('msgSuccess', 'account is verified')
    return response.redirect().toRoute('login')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('main')
  }

  public async forget({ view }: HttpContextContract) {
    return view.render('pages/auth/forget')
  }

  public async forgetSubmit({ request, session, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        email: schema.string([rules.email(), rules.exists({ table: 'users', column: 'email' })]),
      }),
      messages: {
        'email.required': 'The email field is required.',
        'email.email': 'The email must be a valid email address.',
        'email.exists': 'The email does not exist.',
      },
    })
    const user = await User.findByOrFail('email', payload.email)
    const token = uuid.v4()
    await Database.insertQuery()
      .table('password_reset_tokens')
      .insert({
        email: user.email,
        token: token,
        expires_at: new Date(Date.now() + 3600000), // 1 hour expiration
      })
    await Mail.send((message) => {
      message
        .from('no_reply@unimal.link')
        .to(user.email)
        .subject('Reset Password')
        .htmlView('email/password_reset', { user, token })
    })
    session.flash('msgSuccess', 'Mail has been sent successfully')
    return response.redirect().toRoute('forget')
  }

  public async reset({ view, params, session, response }: HttpContextContract) {
    const token = params.token
    const email = params.email
    const resetRecord = await Database.from('password_reset_tokens')
      .where('email', email)
      .where('token', token)
      .where('expires_at', '>', new Date())
      .first()
    if (!resetRecord) {
      session.flash('error', 'Invalid or expired reset token')
      return response.redirect().toRoute('login')
    }
    return view.render('pages/auth/reset', { token, email })
  }

  public async resetSubmit({ params, session, response, request }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        password: schema.string([rules.minLength(6)]),
      }),
      messages: {
        'password.required': 'The password field is required.',
        'password.minLength': 'The password must be at least 6 characters long.',
      },
    })
    const user = await User.findByOrFail('email', params.email)

    const resetRecord = await Database.from('password_reset_tokens')
      .where('email', params.email)
      .where('token', params.token)
      .where('expires_at', '>', new Date())
      .first()
    if (!resetRecord) {
      session.flash('error', 'Invalid or expired reset token')
      return response.redirect().toRoute('login')
    }

    user.password = payload.password
    await user.save()

    await Database.from('password_reset_tokens').where('email', params.email).delete()
    session.flash('success', 'Your password has been change')
    return response.redirect().toRoute('login')
  }
}
