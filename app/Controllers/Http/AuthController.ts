import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import uuid from 'uuid-wand'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
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

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('main')
  }

  public async forget({ view }: HttpContextContract) {
    return view.render('auth/forgot')
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
    session.flash('success', 'Mail has been sent successfully')
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
    return view.render('auth/reset', { token, email })
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
