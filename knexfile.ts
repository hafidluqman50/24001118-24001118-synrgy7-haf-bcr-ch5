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
    password: process.env.PGPASSWORD
  },
  pool: {
    min: 2,
    max: 10,
    afterCreate: (conn: any, done: any) => {
      conn.query('SET timezone="Asia/Makassar";', (err: any) => {
        if(err) {
          console.log('============== Database Disconnected! ==============');
          done(err, conn)
        } else {
          console.log('============== Database Connected! ==============');
          done(err, conn)
        }
      })
    }
  },
  migrations: {
    tableName: 'knex_migrations'
  }
 }
 
 export default config
