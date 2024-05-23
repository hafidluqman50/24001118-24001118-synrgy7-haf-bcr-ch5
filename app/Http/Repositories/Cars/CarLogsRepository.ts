import { CarLog } from '@Models/CarLog'
import { AnyQueryBuilder } from 'objection'

export class CarLogsRepository {
  public async getCarLogs(): Promise<CarLog[]> {
    return await CarLog.query().select('log_time', 'type_action').withGraphFetched('[car(selectCar), user(selectUser)]').modifiers({
      selectCar: (builder: AnyQueryBuilder) => {
        builder.select('id','name')
      },
      selectUser: (builder: AnyQueryBuilder) => {
        builder.select('id','name','email')
      }
    })
  }
}