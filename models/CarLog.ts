import { Model, ModelObject } from 'objection'

class CarLog extends Model {
  
  static tableName = 'car_logs'
  
  id!: number;
  user_id!:number;
  car_id!:number;
  log_time!:Date | string;
  type_action!: string;
}

type CarLogType = ModelObject<CarLog>;

export {
  CarLog,
  CarLogType
}