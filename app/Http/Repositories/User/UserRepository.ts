import { UserStoreDTO } from "@DTOs/User/UserStoreDTO";
import { UserUpdateDTO } from "@DTOs/User/UserUpdateDTO";
import { User } from "@Models/User";

export class UserRepository {
  public async getAll(): Promise<User[]> {
    return await User.query().select('*').whereNull('deleted_at').whereNotIn('role',['superadmin','member'])
  }
  
  public async getById(id: number): Promise<User | undefined> {
    return await User.query().select('*').where('id', id).whereNotIn('role',['superadmin','member']).first()
  }
  
  public async getUser(email: string, role: string): Promise<User | undefined> {
    return await User.query().select('*').where('email', email).where('role', role).first()
  }
  
  public async insert(dto: UserStoreDTO): Promise<User> {
    return await User.query().insert(dto)
  }
  
  public async update(id:number, dto: UserUpdateDTO): Promise<number> {
    return await User.query().where('id', id).update(dto)
  }
  
  public async delete(id:number): Promise<number> {
    return await User.query().where('id', id).update({
      deleted_at:new Date()
    })
  }
}