import { CarsDeleteDTO } from '@DTOs/Cars/CarsDeleteDTO'
import { CarsStoreDTO } from '@DTOs/Cars/CarsStoreDTO'
import { CarsUpdateDTO } from '@DTOs/Cars/CarsUpdateDTO'
import { Car } from '@Models/Car'
import { CarLog } from '@Models/CarLog'

export class CarsRepository {
  
    public async getAll(): Promise<Car[]> {
      return await Car.query().select('*').whereNull('deleted_at')
    }
    
    public async getById(id: number): Promise<Car | undefined> {
      return await Car.query().select('*').where('id', id).first()
    }
    
    public async insert(dto: CarsStoreDTO): Promise<Car> {
      return await Car.query().insert({
        name: dto.name,
        price: dto.price,
        picture: dto.picture,
        start_rent: dto.start_rent,
        finish_rent: dto.finish_rent,
        available: dto.available,
        created_at: dto.created_at
      }).returning('id')
    }
    
    public async update(id: number, dto: CarsUpdateDTO): Promise<number> {
      return await Car.query().where('id', id).update({
        name: dto.name,
        price: dto.price,
        picture: dto.picture,
        start_rent: dto.start_rent,
        finish_rent: dto.finish_rent,
        available: dto.available,
        updated_at: dto.updated_at
      })
    }
    
    public async delete(id: number): Promise<number> {
      return await Car.query().where('id', id).update({
        deleted_at: new Date()
      })
    }
    
    public async insertLogs(dto: CarsStoreDTO | CarsUpdateDTO | CarsDeleteDTO): Promise<CarLog> {
      return await CarLog.query().insert({
        car_id: dto.car_id,
        user_id: dto.user_id,
        log_time: dto.log_time,
        type_action: dto.type_action
      })
    }
    
    public async getListAvailable(): Promise<Car[]> {
      return await Car.query().where('available',1)
    }
}