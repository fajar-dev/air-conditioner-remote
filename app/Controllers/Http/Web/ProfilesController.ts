import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class ProfilesController {
  public async changePassword({ auth, request, session, response }: HttpContextContract) {
    const getUser = await auth.use('web').authenticate()

    const payload = await request.validate({
      schema: schema.create({
        password: schema.string({}, [rules.confirmed('password_confirmation'), rules.minLength(6)]),
      }),
      messages: {
        'password.required': 'Password is required',
        'password_confirmation.required': 'Password confirmation is required',
        'password.confirmed': 'Passwords do not match',
      },
    })

    const user = await User.findOrFail(getUser.id)
    user.password = payload.password
    await user.save()

    session.flash('success', 'Password has been changed successfully')
    return response.redirect().back()
  }
}
