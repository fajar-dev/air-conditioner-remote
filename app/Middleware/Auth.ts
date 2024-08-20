import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle({ session, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.use('web').check()
    if (!auth.use('web').isLoggedIn) {
      session.flash('error', 'You must login to be continued.')
      return response.redirect().toRoute('login')
    }

    await next()
  }
}
