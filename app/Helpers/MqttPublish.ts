// app/Helpers/Response.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IrCode from 'App/Models/IrCode'
import Item from 'App/Models/Item'
import mqtt from 'mqtt'
import mqttConfig from 'Config/mqtt'
import ApiResponse from './ApiResponse'

export default class MqttPublish {

  /**
   * Publishes an MQTT message with a JSON payload
   *
   * @param item - The MQTT topic or item to publish to
   * @param command - The command or variable to find the appropriate IR code
   */
  public static async publish(response: HttpContextContract['response'], item: string, command: any) {

    try {
      const data = await Item.findByOrFail('code', item)      
      const irCode = await IrCode.query()
        .preload('device')
        .where('deviceId', data.deviceId)
        .where('variable', command)
        .firstOrFail()

      const message = {
        address: irCode.device.address,
        command: irCode.command,
      }
      const messageJson = JSON.stringify(message)
      const client = mqtt.connect(mqttConfig)

      client.publish(item, messageJson)
      return ApiResponse.ok(response, message, 'Message published successfully')

    } catch (error) {
      return ApiResponse.internalServerError(response,  error.message, error.stack)
    }
  }
}
