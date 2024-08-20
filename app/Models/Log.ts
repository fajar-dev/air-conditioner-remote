import { DateTime } from 'luxon'
import uuid from 'uuid-wand'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Item from './Item'

export default class Log extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Log) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public itemId: string

  @belongsTo(() => Item)
  public item: BelongsTo<typeof Item>

  @column()
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
