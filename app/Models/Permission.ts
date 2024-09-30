import { DateTime } from 'luxon'
import uuid from 'uuid-wand'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Building from './Building'
import User from './User'

export default class Permission extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Permission) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public buildingId: string

  @belongsTo(() => Building)
  public building: BelongsTo<typeof Building>

  @column()
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
