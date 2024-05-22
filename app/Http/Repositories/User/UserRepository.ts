import { User } from "@Models/User";

export class UserRepository {
  async getAll(): Promise<User[]> {
    return await User.query().select('*')
  }
  
  async getById(id: number): Promise<User | undefined> {
    return await User.query().select('*').where('id', id).first()
  }
  
  async getUser(email: string, role: string): Promise<User | undefined> {
    return await User.query().select('*').where('email', email).where('role', role).first()
  }
}