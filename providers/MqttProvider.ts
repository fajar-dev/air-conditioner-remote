import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import mqtt from 'mqtt'

import Env from '@ioc:Adonis/Core/Env'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class MqttProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Mqtt', () => {
      const client = mqtt.connect({
        host: Env.get('MQTT_HOST'),
        protocol: Env.get('MQTT_PROTOCOL'),
        username: Env.get('MQTT_USERNAME'),
        password: Env.get('MQTT_PASSWORD'),
        port: Env.get('MQTT_port'),
      })

      client.on('connect', () => {
        console.log('MQTT client connected')
      })

      client.on('error', (error) => {
        console.error('MQTT client error:', error)
      })

      return client
    })
  }

  public async boot() {
    const MqttClient = this.app.container.use('Mqtt')
    MqttClient.subscribe('lamp', (err) => {
      if (!err) {
        console.log('Subscribed to topic')
      } else {
        console.error('Failed to subscribe to topic:', err)
      }
    })
    MqttClient.subscribe('lamp', (err) => {
      if (!err) {
        console.log('Subscribed to topic')
      } else {
        console.error('Failed to subscribe to topic:', err)
      }
    })

    // Print received messages to the terminal
    MqttClient.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    const MqttClient = this.app.container.use('Mqtt')
    MqttClient.end() // Gracefully close the MQTT connection
  }
}
