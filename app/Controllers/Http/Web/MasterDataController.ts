import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Building from 'App/Models/Building'
import Room from 'App/Models/Room'

export default class MasterDataController {
  public async building({ view, auth, request }: HttpContextContract) {
    await auth.use('web').authenticate()
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await Building.query().paginate(page, limit)
    // return data
    return view.render('pages/master-data/building', { data })
  }

  public async buildingStore({ request, session, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        description: schema.string.nullable(),
      }),
      messages: {
        'name.required': 'The name field is required.',
      },
    })
    const building = new Building()
    building.name = payload.name
    building.description = payload.description
    await building.save()

    session.flash('success', 'Building has been updated successfully')
    return response.redirect().toRoute('master-data.building')
  }

  public async buildingUpdate({ request, session, response, params }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        description: schema.string.nullable(),
      }),
      messages: {
        'name.required': 'The name field is required.',
      },
    })
    const building = await Building.findOrFail(params.id)
    building.name = payload.name
    building.description = payload.description
    await building.save()

    session.flash('success', 'Building has been updated successfully')
    return response.redirect().toRoute('master-data.building')
  }

  public async buildingDestroy({ params, response, session }: HttpContextContract) {
    const data = await Building.findOrFail(params.id)
    await data.delete()
    session.flash('success', 'Building has been deleted successfully')
    return response.redirect().toRoute('master-data.building')
  }

  public async room({ view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await Room.query().preload('building').paginate(page, limit)
    const building = await Building.all()
    // return data
    return view.render('pages/master-data/room', { data, building })
  }

  public async roomStore({ request, session, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        building: schema.string(),
        description: schema.string.nullable(),
      }),
      messages: {
        'name.required': 'The name field is required.',
        'building.required': 'The Building field is required.',
      },
    })
    const room = new Room()
    room.buildingId = payload.building
    room.name = payload.name
    room.description = payload.description
    await room.save()

    session.flash('success', 'Room has been updated successfully')
    return response.redirect().toRoute('master-data.room')
  }

  public async roomUpdate({ request, session, response, params }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string(),
        building: schema.string(),
        description: schema.string.nullable(),
      }),
      messages: {
        'name.required': 'The name field is required.',
        'building.required': 'The Building field is required.',
      },
    })
    const room = await Room.findOrFail(params.id)
    room.buildingId = payload.building
    room.name = payload.name
    room.description = payload.description
    await room.save()

    session.flash('success', 'Room has been updated successfully')
    return response.redirect().toRoute('master-data.room')
  }

  public async roomDestroy({ params, response, session }: HttpContextContract) {
    const data = await Room.findOrFail(params.id)
    await data.delete()
    session.flash('success', 'Room has been deleted successfully')
    return response.redirect().toRoute('master-data.room')
  }
}
