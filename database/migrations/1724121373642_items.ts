import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('key').nullable()
      table
        .uuid('room_id')
        .references('id')
        .inTable('rooms')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index()
      table
        .uuid('device_id')
        .references('id')
        .inTable('devices')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .index()
      table.string('code').unique().notNullable()
      table.text('description').nullable()
      table.boolean('is_active').defaultTo(false)
      table.integer('temperature').defaultTo(16).checkBetween([16, 30]) // Menambahkan batasan minimum dan maksimum
      table.time('schedule').nullable()
      table.boolean('is_publish').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
