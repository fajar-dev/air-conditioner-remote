import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Device from 'App/Models/Device'
import IrCode from 'App/Models/IrCode'
import { v4 as uuidv4 } from 'uuid'

export default class SamsungIrCodeSeeder extends BaseSeeder {
  public async run() {
    // Seeder untuk perangkat Samsung
    const samsungDevice = await Device.create({
      id: uuidv4(),
      merk: 'Samsung',
      address: '0xE0E0',
    })

    // Seeder untuk kode IR Samsung
    const samsungIrCodes = [
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x00FF',
        variable: 'Samsung_POWER_ON',
        description: 'Power On',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x807F',
        variable: 'Samsung_POWER_OFF',
        description: 'Power Off',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x40BF',
        variable: 'Samsung_MODE_COOLING',
        description: 'Cooling Mode',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0xC03F',
        variable: 'Samsung_MODE_HEATING',
        description: 'Heating Mode',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x20DF',
        variable: 'Samsung_MODE_AUTO',
        description: 'Auto Mode',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0xA05F',
        variable: 'Samsung_MODE_DEHUMIDIFYING',
        description: 'Dehumidifying Mode',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x609F',
        variable: 'Samsung_MODE_FAN',
        description: 'Fan Mode',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x10EF',
        variable: 'Samsung_FAN_SPEED_LOW',
        description: 'Fan Speed Low',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x906F',
        variable: 'Samsung_FAN_SPEED_MEDIUM',
        description: 'Fan Speed Medium',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x50AF',
        variable: 'Samsung_FAN_SPEED_HIGH',
        description: 'Fan Speed High',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x30CF',
        variable: 'Samsung_TEMP_UP',
        description: 'Temperature Up',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0xB04F',
        variable: 'Samsung_TEMP_DOWN',
        description: 'Temperature Down',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x708F',
        variable: 'Samsung_TIMER_ON',
        description: 'Timer On',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0xF00F',
        variable: 'Samsung_TIMER_OFF',
        description: 'Timer Off',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0x48B7',
        variable: 'Samsung_SWING_ON',
        description: 'Swing On',
      },
      {
        id: uuidv4(),
        deviceId: samsungDevice.id,
        command: '0xC837',
        variable: 'Samsung_SWING_OFF',
        description: 'Swing Off',
      },
    ]

    await IrCode.createMany(samsungIrCodes)
  }
}
