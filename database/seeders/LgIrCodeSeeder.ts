import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Device from 'App/Models/Device'
import IrCode from 'App/Models/IrCode'
import { v4 as uuidv4 } from 'uuid'

export default class LgIrCodeSeeder extends BaseSeeder {
  public async run() {
    // Seeder untuk perangkat LG
    const lgDevice = await Device.create({
      id: uuidv4(),
      merk: 'LG',
      address: '0x88',
    })

    // Seeder untuk kode IR LG
    const lgIrCodes = [
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x0800',
        variable: 'LG_SWITCH_ON_MASK',
        description: 'Power On',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x0800',
        variable: 'LG_MODE_COOLING',
        description: 'Cooling Mode (Temperature and fan speed in lower nibbles)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x0990',
        variable: 'LG_MODE_DEHUMIDIFYING',
        description: 'Dehumidifying Mode (Sets temperature to 24 and fan speed to 0)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x0A30',
        variable: 'LG_MODE_FAN',
        description: 'Fan Mode (Sets temperature to 18)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x0B00',
        variable: 'LG_MODE_AUTO',
        description: 'Auto Mode (Sets temperature to 22 and fan speed to 4)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x0C00',
        variable: 'LG_MODE_HEATING',
        description: 'Heating Mode (Temperature and fan speed in lower nibbles)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x1004',
        variable: 'LG_ENERGY_SAVING_ON',
        description: 'Energy Saving On',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x1005',
        variable: 'LG_ENERGY_SAVING_OFF',
        description: 'Energy Saving Off',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x1008',
        variable: 'LG_JET_ON',
        description: 'Jet Mode On',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x1314',
        variable: 'LG_WALL_SWING_ON',
        description: 'Wall Swing On',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x1315',
        variable: 'LG_WALL_SWING_OFF',
        description: 'Wall Swing Off',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x1316',
        variable: 'LG_SWING_ON',
        description: 'Swing On (Not verified, for AKB73757604)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x1317',
        variable: 'LG_SWING_OFF',
        description: 'Swing Off (Not verified, for AKB73757604)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x8000',
        variable: 'LG_TIMER_ON',
        description: 'Timer On (Relative minutes in lower nibbles)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0x9000',
        variable: 'LG_TIMER_OFF',
        description: 'Timer Off (Relative minutes in lower nibbles)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0xA000',
        variable: 'LG_SLEEP',
        description: 'Sleep Mode (Relative minutes in lower nibbles)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0xB000',
        variable: 'LG_CLEAR_ALL',
        description: 'Clear All (Timers and sleep)',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0xC005',
        variable: 'LG_POWER_DOWN',
        description: 'Power Down',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0xC00A',
        variable: 'LG_LIGHT',
        description: 'Light Control',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0xC00B',
        variable: 'LG_AUTO_CLEAN_ON',
        description: 'Auto Clean On',
      },
      {
        id: uuidv4(),
        deviceId: lgDevice.id,
        command: '0xC00C',
        variable: 'LG_AUTO_CLEAN_OFF',
        description: 'Auto Clean Off',
      },
    ]

    await IrCode.createMany(lgIrCodes)
  }
}
