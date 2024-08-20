import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import mqtt from 'mqtt'
import mqttConfig from 'Config/mqtt'

export default class MqttsController {
  public async publish({ request }: HttpContextContract) {
    const topic = request.input('topic')
    const message = request.input('message')
    const client = mqtt.connect(mqttConfig)
    client.publish('lamp', 'Hello mqtt')
    client.publish('lamp', 'Hello aaamqtt')
    // client.end()
    return 'Message published'
  }
}
