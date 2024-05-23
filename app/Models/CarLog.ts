import { Model, ModelObject } from 'objection'
import { User } from './User';
import { Car } from './Car';

class CarLog extends Model {
  
  static tableName = 'car_logs'
  
  id!: number;
  user_id!:number;
  car_id!:number;
  log_time!:Date | string;
  type_action!: string;
  
  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'car_logs.user_id',
        to:'users.id'
      }
    },
    car: {
      relation: Model.BelongsToOneRelation,
      modelClass: Car,
      join: {
        from: 'car_logs.car_id',
        to: 'cars.id'
      }
    }
  }
}

type CarLogType = ModelObject<CarLog>;

export {
  CarLog,
  CarLogType
}