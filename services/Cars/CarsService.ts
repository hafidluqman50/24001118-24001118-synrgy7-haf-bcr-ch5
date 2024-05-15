import { Cars } from '../../interfaces/Cars'
import { CarsRepository } from '../../repositories/Cars/CarsRepository'
import {
  cloudinary,
  UploadApiResponse
} from '../../config/cloudinary'
import { ServerErrorException } from '../../exceptions/ServerErrorException'
import { Exception } from '../../exceptions/Exception'
import { NotFoundException } from '../../exceptions/NotFoundException'
import { CarsStoreDTO } from '../../DTOs/Cars/CarsStoreDTO'
import { CarsUpdateDTO } from '../../DTOs/Cars/CarsUpdateDTO'

export class CarsService {
  
  public carsRepository: CarsRepository
  
  constructor(carsRepository: CarsRepository) {
    this.carsRepository = carsRepository
  }
  
  public async getAll(): Promise<Cars[]> {
    return await this.carsRepository.getAll()
  }
  
  public async getById(id: number): Promise<Cars | undefined> {
    const carById: Cars | undefined = await this.carsRepository.getById(id)
    
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
  
  public async delete(id: number): Promise<Cars> {
    return await this.carsRepository.delete(id)
  }
  
}