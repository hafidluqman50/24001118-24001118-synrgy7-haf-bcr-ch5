// Update with your config settings.
import { Knex } from 'knex'
import 'ts-node/register'
import dotenv from 'dotenv'

dotenv.config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 
 const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    database: process.env.PGDATABASE,
    user:     process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port:     Number(process.env.PGPORT)
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
 }
 
 export default config
