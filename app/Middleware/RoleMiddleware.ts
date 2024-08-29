import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleMiddleware {
  public async handle(
    { auth, response, session }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: string[]
  ) {
    // Pastikan pengguna sudah login
    await auth.use('web').authenticate()

    const user = auth.user

    if (!user || !allowedRoles.includes(user.role)) {
      session.flash('error', 'You do not have permission to perform this action.')
      return response.redirect().toRoute('dashboard')
    }

    await next()
  }
}
