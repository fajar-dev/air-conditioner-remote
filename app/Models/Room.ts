import { DateTime } from 'luxon'
import uuid from 'uuid-wand'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Building from './Building'

export default class Room extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Room) {
    model.id = uuid.v4()
  }

  @column()
  public roleId: string | undefined | null

  @belongsTo(() => Building)
  public role: BelongsTo<typeof Building>

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string | undefined | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
