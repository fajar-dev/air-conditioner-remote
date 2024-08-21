import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Building from 'App/Models/Building'

export default class MasterDataController {
  public async building({ view, auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await Building.query().paginate(page, limit)
    // return data
    return view.render('pages/master-data/building', { data })
  }

  public async buildingDestroy({ auth, params, response, session }: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = await Building.findOrFail(params.id)
    await data.delete()
    session.flash('success', 'Building has been deleted successfully')
    return response.redirect().toRoute('master-data.building')
  }

  public async room({ view }: HttpContextContract) {
    return view.render('pages/master-data/room')
  }
}
