import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MqttPublish from 'App/Helpers/MqttPublish'
import Building from 'App/Models/Building'
import Item from 'App/Models/Item'
import Room from 'App/Models/Room'

export default class RemotesController {
  public async index({ view }: HttpContextContract) {
    const data = await Building.all()
    return await view.render('pages/remote/index', {data})
  }

  public async building({ view, params }: HttpContextContract) {
    const data = await Room.query().preload('building').orderBy('name', 'asc').where('building_id', params.idBuilding)
    const building = await Building.findOrFail(params.idBuilding)
    return await view.render('pages/remote/building', {data, building})
  }

  public async room({ view, params }: HttpContextContract) {
    const data = await Item.query()
                      .preload('room')
                      .preload('device')
                      .orderBy('code', 'asc')
                      .where('room_id', params.idRoom)
    const building = await Building.findOrFail(params.idBuilding)
    const room = await Room.findOrFail(params.idRoom)
    return await view.render('pages/remote/room', {data, building, room})
  }

  public async item({ params }: HttpContextContract) {
    const data = await Item.query()
                      .preload('room')
                      .preload('device')
                      .orderBy('code', 'asc')
                      .where('room_id', params.idRoom)
                      .where('id', params.idItem)
                      .firstOrFail()
    return data
  }

  public async itemSwing({ response, params }: HttpContextContract) {
    const data = await Item.query()
                      .orderBy('code', 'asc')
                      .where('room_id', params.idRoom)
                      .where('id', params.idItem)
                      .firstOrFail()
    return await MqttPublish.publish(response, data.code, 'SWING_ON')
  }
}
