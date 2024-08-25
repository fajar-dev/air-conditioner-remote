import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class ProfilesController {
  public async index({ view }: HttpContextContract) {
    return await view.render('users/profile/index')
  }

  public async update({ auth, request, session, response }: HttpContextContract) {
    const getUser = await auth.use('web').authenticate()
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string([
          rules.email(),
          rules.unique({
            table: 'users',
            column: 'email',
            whereNot: { id: getUser.id },
          }),
        ]),
      }),
      messages: {
        'name.required': 'The name field is required.',
        'email.required': 'The email field is required.',
        'email.email': 'The email must be a valid email address.',
        'email.unique': 'The email is already taken.',
      },
    })

    const user = await User.findOrFail(getUser.id)
    user.name = payload.name
    user.email = payload.email
    await user.save()

    session.flash('success', 'Profile has been update successfully')
    return response.redirect().toRoute('profile')
  }

  public async changePassword({ auth, request, session, response }: HttpContextContract) {
    const getUser = await auth.use('web').authenticate()
    const payload = await request.validate({
      schema: schema.create({
        password: schema.string({}, [rules.confirmed(), rules.minLength(6)]),
      }),
      messages: {
        'password.required': 'Password is required',
        'password_confirmation.required': 'Password confirmation is required',
        'password_confirmation.confirmed': 'Passwords do not match',
      },
    })
    const user = await User.findOrFail(getUser.id)
    user.password = payload.password
    await user.save()

    session.flash('success', 'Password has been change successfully')
    return response.redirect().toRoute('profile')
  }
}
