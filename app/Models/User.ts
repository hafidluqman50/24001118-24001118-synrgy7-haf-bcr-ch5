import { Model, ModelObject } from 'objection'

class User extends Model {
  
  static tableName = 'users'
  
  id!: number;
  name!:string;
  email!:string;
  password!:string;
  token?:string;
  role!:string;
  created_at?:Date | string | null;
  updated_at?:Date | string | null;
  deleted_at?:Date | string | null;
  
}

type UserType = ModelObject<User>;

export {
  User,
  UserType
}