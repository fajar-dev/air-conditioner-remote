import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Device from 'App/Models/Device'
import IrCode from 'App/Models/IrCode'

export default class PanasonicIrCodeSeeder extends BaseSeeder {
  public async run() {
    // Seeder untuk perangkat Panasonic
    const panasonicDevice = await Device.create({
      merk: 'Panasonic',
      address: '0x4004',
    })

    // Seeder untuk kode IR Panasonic
    const panasonicIrCodes = [
      {
        deviceId: panasonicDevice.id,
        command: '0x010000',
        variable: 'POWER_ON',
        description: 'Power On',
      },
      {
        deviceId: panasonicDevice.id,
        command: '0x018000',
        variable: 'POWER_OFF',
        description: 'Power Off',
      },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0x3000',
      //   variable: 'MODE_COOLING',
      //   description: 'Cooling Mode',
      // },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0x4000',
      //   variable: 'MODE_HEATING',
      //   description: 'Heating Mode',
      // },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0x5000',
      //   variable: 'MODE_AUTO',
      //   description: 'Auto Mode',
      // },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0x6000',
      //   variable: 'MODE_DEHUMIDIFYING',
      //   description: 'Dehumidifying Mode',
      // },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0x7000',
      //   variable: 'MODE_FAN',
      //   description: 'Fan Mode',
      // },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0x8000',
      //   variable: 'FAN_SPEED_LOW',
      //   description: 'Fan Speed Low',
      // },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0x9000',
      //   variable: 'FAN_SPEED_MEDIUM',
      //   description: 'Fan Speed Medium',
      // },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0xA000',
      //   variable: 'FAN_SPEED_HIGH',
      //   description: 'Fan Speed High',
      // },
      {
        deviceId: panasonicDevice.id,
        command: '0x010500',
        variable: 'TEMP_UP',
        description: 'Temperature Up',
      },
      {
        deviceId: panasonicDevice.id,
        command: '0x010400',
        variable: 'TEMP_DOWN',
        description: 'Temperature Down',
      },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0xD000',
      //   variable: 'TIMER_ON',
      //   description: 'Timer On',
      // },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0xE000',
      //   variable: 'TIMER_OFF',
      //   description: 'Timer Off',
      // },
      {
        deviceId: panasonicDevice.id,
        command: '0x012F00',
        variable: 'SWING_ON',
        description: 'Swing On',
      },
      // {
      //   deviceId: panasonicDevice.id,
      //   command: '0xF100',
      //   variable: 'SWING_OFF',
      //   description: 'Swing Off',
      // },
    ]

    await IrCode.createMany(panasonicIrCodes)
  }
}
