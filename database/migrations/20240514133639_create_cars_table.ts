import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table: Knex.CreateTableBuilder) => {
    table.increments('id')
    table.string('name', 255).notNullable()
    table.integer('price').notNullable()
    table.text('picture').notNullable()
    table.timestamp('start_rent').notNullable()
    table.timestamp('finish_rent').notNullable()
    table.timestamp('created_at').nullable()
    table.timestamp('updated_at').nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('cars')
}

