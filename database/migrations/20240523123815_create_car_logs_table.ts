import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('car_logs', (table: Knex.CreateTableBuilder) => {
    table.increments('id')
    table.integer('car_id').notNullable().unsigned()
    table.foreign('car_id').references('cars.id').onDelete('restrict').onUpdate('cascade')
    table.integer('user_id').notNullable().unsigned()
    table.foreign('user_id').references('users.id').onDelete('restrict').onUpdate('cascade')
    table.timestamp('log_time').notNullable()
    table.enum('type_action',['INSERT', 'UPDATE', 'DELETE'])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('car_logs')
}

