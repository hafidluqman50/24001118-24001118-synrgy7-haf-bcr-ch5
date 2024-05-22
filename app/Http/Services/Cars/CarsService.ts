import { Car } from '@Models/Car'
import { CarsRepository } from '@Repositories/Cars/CarsRepository'
import {
  cloudinary,
  UploadApiResponse
} from '@config/cloudinary'
import { ServerErrorException } from '@Exceptions/ServerErrorException'
import { Exception } from '@Exceptions/Exception'
import { NotFoundException } from '@Exceptions/NotFoundException'
import { CarsStoreDTO } from '@DTOs/Cars/CarsStoreDTO'
import { CarsUpdateDTO } from '@DTOs/Cars/CarsUpdateDTO'

export class CarsService {
  
  public carsRepository: CarsRepository
  
  constructor(carsRepository: CarsRepository) {
    this.carsRepository = carsRepository
  }
  
  public async getAll(): Promise<Car[]> {
    return await this.carsRepository.getAll()
  }
  
  public async getById(id: number): Promise<Car | undefined> {
    const carById: Car | undefined = await this.carsRepository.getById(id)
    
    if(carById === undefined) {
      throw new NotFoundException('Data Car Not Found!', {})
    } else {
      return carById 
    }
  }
  
  public async insert(
    data: CarsStoreDTO, 
    file: string
  ): Promise<void> {
    try {
      
      const cloudinaryUpload: UploadApiResponse = await cloudinary.uploader.upload(file, {
          folder: 'fsw',
          use_filename: true
      })
          
      data._picture = cloudinaryUpload?.secure_url
      
      await this.carsRepository.insert(data)
      
    } catch(error) {
      if(error instanceof Exception) {
          throw new Exception(error.message, error.statusCode, {})
      } else {
          throw new ServerErrorException((error as Error).message, {})
      }
    }
    
  }
  
  public async update(
    id: number, 
    data: CarsUpdateDTO, 
    file: string
  ): Promise<void> {
    
    try {
      await this.getById(id)
      
      const cloudinaryUpload: UploadApiResponse = await cloudinary.uploader.upload(file, {
          folder: 'fsw',
          use_filename: true
      })

      data._picture = cloudinaryUpload?.secure_url
      
      await this.carsRepository.update(id, data)
      
    } catch(error) {
      if(error instanceof Exception) {
        throw new Exception(error.message, error.statusCode, {})
      } else {
        throw new ServerErrorException((error as Error).message, {})
      }
    }
    
  }
  
  public async delete(id: number): Promise<void> {
    try {
      await this.getById(id)
      
      await this.carsRepository.delete(id)
    } catch(error) {
      if(error instanceof Exception) {
        throw new Exception(error.message, error.statusCode, {})
      } else {
        throw new ServerErrorException((error as Error).message, {})
      }
    }
  }
  
}