import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('email', 255).index().notNullable().unique()
      table.string('password', 180).index().notNullable()
      table.string('remember_me_token').nullable()
      table.string('verified_token').index().nullable()
      table.timestamp('verified_at', { useTz: true }).nullable()
      table
        .uuid('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .index()
        .nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
