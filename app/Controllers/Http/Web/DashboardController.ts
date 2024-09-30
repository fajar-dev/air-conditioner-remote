import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public async index({ view }: HttpContextContract) {
    const now = new Date()
    const hour = now.getHours()

    let great = ''

    if (hour >= 5 && hour < 12) {
      great = 'Good Morning'
    } else if (hour >= 12 && hour < 17) {
      great = 'Good Afternoon'
    } else if (hour >= 17 && hour < 21) {
      great = 'Good Evening'
    } else {
      great = 'Good Night'
    }
    return view.render('pages/dashboard', { great })
  }
}
