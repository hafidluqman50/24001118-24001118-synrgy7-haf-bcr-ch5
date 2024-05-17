import { CarsStoreDTO } from '../../DTOs/Cars/CarsStoreDTO'
import { CarsUpdateDTO } from '../../DTOs/Cars/CarsUpdateDTO'
import { database } from '../../config/database'
import { Cars } from '../../interfaces/Cars'

export class CarsRepository {
  
    public async getAll(): Promise<Cars[]> {
      return await database<Cars>('cars').select('*')
    }
    
    public async getById(id: number): Promise<Cars | undefined> {
      return await database<Cars>('cars').select('*').where('id', id).first()
    }
    
    public async insert(data: CarsStoreDTO): Promise<void> {
      return await database('cars').insert(data)
    }
    
    public async update(id: number, data: CarsUpdateDTO): Promise<void> {
      return await database('cars').where('id', id).update(data)
    }
    
    public async delete(id: number): Promise<void> {
      return await database<Cars>('cars').where('id', id).delete()
    }
}