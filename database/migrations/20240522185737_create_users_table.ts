import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('role').notNullable()
    table.string('token').nullable()
    table.timestamp('created_at').nullable()
    table.timestamp('updated_at').nullable()
    table.timestamp('deleted_at').nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users')
}

