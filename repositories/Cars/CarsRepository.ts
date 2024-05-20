import { CarsStoreDTO } from '../../DTOs/Cars/CarsStoreDTO'
import { CarsUpdateDTO } from '../../DTOs/Cars/CarsUpdateDTO'
import { Car } from '../../models/Car'

export class CarsRepository {
  
    public async getAll(): Promise<Car[]> {
      return await Car.query().select('*')
    }
    
    public async getById(id: number): Promise<Car | undefined> {
      return await Car.query().select('*').where('id', id).first()
    }
    
    public async insert(data: CarsStoreDTO): Promise<Car> {
      return await Car.query().insert(data)
    }
    
    public async update(id: number, data: CarsUpdateDTO): Promise<number> {
      return await Car.query().where('id', id).update(data)
    }
    
    public async delete(id: number): Promise<number> {
      return await Car.query().where('id', id).delete()
    }
}