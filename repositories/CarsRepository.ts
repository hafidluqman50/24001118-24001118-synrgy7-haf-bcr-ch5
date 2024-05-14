import { database } from '../config/database'
import { Cars } from '../interfaces/Cars'

export class CarsRepository {
  
    public async getAll(): Promise<Cars[]> {
      return await database<Cars>('cars').select('*')
    }
    
    public async getById(id: number): Promise<Cars | undefined> {
      return await database<Cars>('cars').select('*').where('id', id).first()
    }
    
    public async insert(data: any): Promise<any> {
      return await database('cars').insert(data)
    }
    
    public async update(id: number, data: any): Promise<any> {
      return await database('cars').where('id', id).update(data)
    }
    
    public async delete(id: number): Promise<Cars> {
      return await database<Cars>('cars').where('id', id).delete()
    }
}