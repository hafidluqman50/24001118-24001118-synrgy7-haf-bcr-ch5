import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('cars', (table: Knex.AlterTableBuilder) => {
    table.integer('available').after('finish_rent').defaultTo(1).notNullable()
    table.timestamp('deleted_at').after('updated_at').nullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('cars', (table: Knex.AlterTableBuilder) => {
    table.dropColumns('available', 'deleted_at')
  })
}

