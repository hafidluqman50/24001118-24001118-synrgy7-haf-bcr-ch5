import { Cars } from '../interfaces/Cars'
import { CreateCarDTO } from '../interfaces/CreateCarDTO'
import { CarsRepository } from '../repositories/CarsRepository'
import {
  cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse
} from '../config/cloudinary'
import { UpdateCarDTO } from '../interfaces/UpdateCarDTO'

export class CarsService {
  
  public carsRepository: CarsRepository
  
  constructor() {
    this.carsRepository = new CarsRepository()
  }
  
  public async getAll(): Promise<Cars[]> {
    return await this.carsRepository.getAll()
  }
  
  public async getById(id: number): Promise<Cars | undefined> {
    return await this.carsRepository.getById(id)
  }
  
  public async insert(
    data: CreateCarDTO, 
    file: string
  ): Promise<void> {
    
    cloudinary.uploader.upload(file, {
        folder: 'fsw',
        use_filename: true
    }, async (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined): Promise<void> => {
      
      try {
        
        data.picture = result?.url
        
        await this.carsRepository.insert(data)
        
      } catch(error) {
        throw new Error((error as Error).message)
      }
    })
    
  }
  
  public async update(
    id: number, 
    data: UpdateCarDTO, 
    file: string
  ): Promise<void> {
    
    cloudinary.uploader.upload(file, {
        folder: 'fsw',
        use_filename: true
    }, async (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined): Promise<void> => {
      
      try {
        
        data.picture = result?.url

        await this.carsRepository.update(id, data)
        
      } catch(error) {
        throw new Error((error as Error).message)
      }
    })
  }
  
  public async delete(id: number): Promise<Cars> {
    return await this.carsRepository.delete(id)
  }
  
}