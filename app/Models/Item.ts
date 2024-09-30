import { DateTime } from 'luxon'
import uuid from 'uuid-wand'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'
import Device from './Device'
import { random } from 'App/Helpers/Random'

export default class Item extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Item) {
    model.id = uuid.v4()
    model.key = random(6)
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public key: string

  @column()
  public roomId: string

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>

  @column()
  public deviceId: string

  @belongsTo(() => Device)
  public device: BelongsTo<typeof Device>

  @column()
  public code: string

  @column()
  public description: string | null | undefined

  @column()
  public isSwing: boolean

  @column()
  public isActive: boolean

  @column()
  public temperature: number

  @column()
  public schedule: string | null | undefined

  @column()
  public isPublish: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
