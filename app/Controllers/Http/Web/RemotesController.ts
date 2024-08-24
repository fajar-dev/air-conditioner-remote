import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ApiResponse from 'App/Helpers/ApiResponse'
import MqttPublish from 'App/Helpers/MqttPublish'
import Building from 'App/Models/Building'
import Item from 'App/Models/Item'
import Room from 'App/Models/Room'
import { DateTime } from 'luxon'

export default class RemotesController {
  public async index({ view }: HttpContextContract) {
    const data = await Building.all()
    return await view.render('pages/remote/index', { data })
  }

  public async building({ view, params }: HttpContextContract) {
    const data = await Room.query()
      .preload('building')
      .orderBy('name', 'asc')
      .where('building_id', params.idBuilding)
    const building = await Building.findOrFail(params.idBuilding)
    return await view.render('pages/remote/building', { data, building })
  }

  public async room({ view, params }: HttpContextContract) {
    const data = await Item.query()
      .preload('room')
      .preload('device')
      .orderBy('code', 'asc')
      .where('room_id', params.idRoom)
    const building = await Building.findOrFail(params.idBuilding)
    const room = await Room.findOrFail(params.idRoom)
    return await view.render('pages/remote/room', { data, building, room })
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
    return await MqttPublish.publish(response, params.idItem, 'SWING_ON')
  }

  public async itemUp({ response, params }: HttpContextContract) {
    const data = await Item.findOrFail(params.idItem)
    if (data.temperature <= 29) {
      data.temperature += 1
      await data.save()
    }
    return await MqttPublish.publish(response, params.idItem, 'TEMP_UP')
  }

  public async itemDown({ response, params }: HttpContextContract) {
    const data = await Item.findOrFail(params.idItem)
    if (data.temperature >= 17) {
      data.temperature -= 1
      await data.save()
    }
    return await MqttPublish.publish(response, params.idItem, 'TEMP_DOWN')
  }

  public async itemTimeReset({ response, params }: HttpContextContract) {
    const data = await Item.findOrFail(params.idItem)
    data.schedule = null
    await data.save()
    return ApiResponse.ok(response, null, 'Time Schedule Has been reset successfully')
  }

  public async itemTimeSet({ response, params, request }: HttpContextContract) {
    const data = await Item.findOrFail(params.idItem)
    const payload = await request.validate({
      schema: schema.create({
        time: schema.string(),
      }),
      messages: {
        'time.required': 'The time is required.',
      },
    })
    data.schedule = payload.time
    await data.save()
    return ApiResponse.ok(response, null, 'Time Schedule Has been set successfully')
  }
}
