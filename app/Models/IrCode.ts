import { DateTime } from 'luxon'
import uuid from 'uuid-wand'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Device from './Device'

export default class IrCode extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: IrCode) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public deviceId: string

  @belongsTo(() => Device)
  public device: BelongsTo<typeof Device>

  @column()
  public command: string

  @column()
  public description: string | undefined | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
