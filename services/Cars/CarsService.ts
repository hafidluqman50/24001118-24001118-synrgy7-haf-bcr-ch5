import { Cars } from '../../interfaces/Cars'
import { ICreateCar } from '../../interfaces/ICreateCar'
import { CarsRepository } from '../../repositories/Cars/CarsRepository'
import {
  cloudinary,
  UploadApiResponse
} from '../../config/cloudinary'
import { IUpdateCar } from '../../interfaces/IUpdateCar'
import { ServerErrorException } from '../../exceptions/ServerErrorException'
import { Exception } from '../../exceptions/Exception'

export class CarsService {
  
  public carsRepository: CarsRepository
  
  constructor(carsRepository: CarsRepository) {
    this.carsRepository = carsRepository
  }
  
  public async getAll(): Promise<Cars[]> {
    return await this.carsRepository.getAll()
  }
  
  public async getById(id: number): Promise<Cars | undefined> {
    return await this.carsRepository.getById(id)
  }
  
  public async insert(
    data: ICreateCar, 
    file: string
  ): Promise<void> {
    try {
      const cloudinaryUpload: UploadApiResponse = await cloudinary.uploader.upload(file, {
          folder: 'fsw',
          use_filename: true
      })
          
      data.picture = cloudinaryUpload?.secure_url
      
      await this.carsRepository.insert(data)
      
    } catch(error) {
      if(error instanceof Exception) {
          throw new Exception(error.message, error.statusCode, {})
      } else {
          throw new Error((error as Error).message)
      }
    }
    
  }
  
  public async update(
    id: number, 
    data: IUpdateCar, 
    file: string
  ): Promise<void> {
    
    try {
      const cloudinaryUpload: UploadApiResponse = await cloudinary.uploader.upload(file, {
          folder: 'fsw',
          use_filename: true
      })

      data.picture = cloudinaryUpload?.secure_url
      
      await this.carsRepository.update(id, data)
      
    } catch(error) {
      if(error instanceof Exception) {
        throw new Exception(error.message, error.statusCode, {})
      } else {
        throw new Error((error as Error).message)
      }
    }
    
  }
  
  public async delete(id: number): Promise<Cars> {
    return await this.carsRepository.delete(id)
  }
  
}