import Knex, { Knex as KnexType } from 'knex'
import config from '../knexfile'

export const database: KnexType = Knex(config)