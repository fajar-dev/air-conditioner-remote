import { DateTime } from 'luxon'
import uuid from 'uuid-wand'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Building extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Building) {
    model.id = uuid.v4()
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string | null | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
