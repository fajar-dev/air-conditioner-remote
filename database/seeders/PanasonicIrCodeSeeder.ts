import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Device from 'App/Models/Device'
import IrCode from 'App/Models/IrCode'
import { v4 as uuidv4 } from 'uuid'

export default class PanasonicIrCodeSeeder extends BaseSeeder {
  public async run() {
    // Seeder untuk perangkat Panasonic
    const panasonicDevice = await Device.create({
      id: uuidv4(),
      merk: 'Panasonic',
      address: '0x22C3',
    })

    // Seeder untuk kode IR Panasonic
    const panasonicIrCodes = [
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x1000',
        variable: 'Panasonic_POWER_ON',
        description: 'Power On',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x2000',
        variable: 'Panasonic_POWER_OFF',
        description: 'Power Off',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x3000',
        variable: 'Panasonic_MODE_COOLING',
        description: 'Cooling Mode',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x4000',
        variable: 'Panasonic_MODE_HEATING',
        description: 'Heating Mode',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x5000',
        variable: 'Panasonic_MODE_AUTO',
        description: 'Auto Mode',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x6000',
        variable: 'Panasonic_MODE_DEHUMIDIFYING',
        description: 'Dehumidifying Mode',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x7000',
        variable: 'Panasonic_MODE_FAN',
        description: 'Fan Mode',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x8000',
        variable: 'Panasonic_FAN_SPEED_LOW',
        description: 'Fan Speed Low',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0x9000',
        variable: 'Panasonic_FAN_SPEED_MEDIUM',
        description: 'Fan Speed Medium',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0xA000',
        variable: 'Panasonic_FAN_SPEED_HIGH',
        description: 'Fan Speed High',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0xB000',
        variable: 'Panasonic_TEMP_UP',
        description: 'Temperature Up',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0xC000',
        variable: 'Panasonic_TEMP_DOWN',
        description: 'Temperature Down',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0xD000',
        variable: 'Panasonic_TIMER_ON',
        description: 'Timer On',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0xE000',
        variable: 'Panasonic_TIMER_OFF',
        description: 'Timer Off',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0xF000',
        variable: 'Panasonic_SWING_ON',
        description: 'Swing On',
      },
      {
        id: uuidv4(),
        deviceId: panasonicDevice.id,
        command: '0xF100',
        variable: 'Panasonic_SWING_OFF',
        description: 'Swing Off',
      },
    ]

    await IrCode.createMany(panasonicIrCodes)
  }
}
