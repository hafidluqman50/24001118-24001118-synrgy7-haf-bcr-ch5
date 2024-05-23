import { CarsService } from "@Services/Cars/CarsService";
import { Request, Response } from 'express'
import { ICreateCar } from "@Interfaces/ICreateCar";
import { IUpdateCar } from "@Interfaces/IUpdateCar";
import { Exception } from "@Exceptions/Exception";
import { CarsStoreRequest } from "@Requests/Cars/CarsStoreRequest";
import { CarsStoreDTO } from "@DTOs/Cars/CarsStoreDTO";
import { CarsUpdateDTO } from "@DTOs/Cars/CarsUpdateDTO";
import { CarsUpdateRequest } from "@Requests/Cars/CarsUpdateRequest";
import { Car } from '@Models/Car'
import { CarsDeleteDTO } from "@DTOs/Cars/CarsDeleteDTO";
import { CarsDeleteRequest } from "@Requests/Cars/CarsDeleteRequest";
import { CarLog } from "@Models/CarLog";

export class CarsController {
  public carsService: CarsService
  
  constructor(carsService: CarsService) {
    this.carsService = carsService
  }
  
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const getCars: Car[] = await this.carsService.getAll()
      
      res.status(200).json({
        status:true,
        message:'Success Get Cars!',
        data:{
          cars:getCars
        }
      })
    } catch(error) {
      res.status(500).json({
        status:false,
        message:(error as Error).message
      })
    }
  }
  
  public async getById(req: Request, res: Response): Promise<void> {
    try{
      const getCarByid: Car | undefined = await this.carsService.getById(Number(req.params.id))
      
      res.status(200).json({
        status:true,
        message:'Success Get Car By Id!',
        data: {
          car: getCarByid
        }
      })
    } catch(error) {
      if(error instanceof Exception) {
        
        const errorException: Exception = error
        
        res.status(errorException.statusCode).json({
          status:false,
          message:errorException.message,
          data:errorException.data
        })
        
      } else {
        
        res.status(500).json({
          status:false,
          message:(error as Error).message
        })
        
      }
    }
  }
  
  public async insert(req: any, res: Response): Promise<void> {
    try {
      
      const fileBase64: string | undefined = req.file?.buffer.toString("base64");
      const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;
      
      const reqData: ICreateCar = {
        name: req.body.name,
        price:req.body.price,
        picture:req.file,
        start_rent:req.body.start_rent,
        finish_rent:req.body.finish_rent,
        available: req.body.available,
        created_at:new Date(),
        user_id: req.user.id
      }
      
      const dto: CarsStoreDTO = new CarsStoreRequest(reqData).toDTO()
      
      await this.carsService.insert(dto, file)
      
      res.status(201).json({
        status:true,
        message:'Success Create Car!'
      })
      
    } catch(error) {
      if(error instanceof Exception) {  
        res.status(error.statusCode).json({
          status:false,
          message:error.message,
          data:error.data
        })
      } else {
        res.status(500).json({
          status:false,
          message:(error as Error).message
        })
      }
    }
  }
  
  public async update(req: any, res: Response): Promise<void> {
    try {
        const fileBase64: string | undefined = req.file?.buffer.toString("base64");
        const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;
        
        const reqData: IUpdateCar = {
          name: req.body.name,
          price:req.body.price,
          picture:req.file,
          start_rent:req.body.start_rent,
          finish_rent:req.body.finish_rent,
          available: req.body.available,
          updated_at:new Date(),
          user_id: req.user.id
        }
        
        const dto: CarsUpdateDTO = new CarsUpdateRequest(reqData).toDTO()
        
        await this.carsService.update(Number(req.params.id), dto, file)
        
        res.status(200).json({
          status:true,
          message:'Success Edit Car!'
        })
        
    } catch(error) {
      if(error instanceof Exception) {  
        res.status(error.statusCode).json({
          status:false,
          message:error.message,
          data:error.data
        })
      } else {
        res.status(500).json({
          status:false,
          message:(error as Error).message
        })
      }
    }
  }
  
  public async delete(req: any, res: Response): Promise<void> {
    try {
      const reqData: any = {
        user_id: req.user.id,
        car_id: Number(req.params.id),
        log_time: new Date()
      }
      
      const dto: CarsDeleteDTO = new CarsDeleteRequest(reqData).toDTO()
      
      await this.carsService.delete(Number(req.params.id), dto)
      
      res.status(200).send({
        status:true,
        message:'Success Delete Car!'
      })
    } catch(error) {
      if(error instanceof Exception) {  
        res.status(error.statusCode).json({
          status:false,
          message:error.message,
          data:error.data
        })
      } else {
        res.status(500).json({
          status:false,
          message:(error as Error).message
        })
      }
    }
  }
  
  public async getListAvailable(req: Request, res: Response): Promise<void> {
    try {
      const carAvailable: Car[] = await this.carsService.getListAvailable()
      
      res.status(200).send({
        status:true,
        message:'Success Get Car Available!',
        cars:carAvailable
      })
    } catch(error) {
      if(error instanceof Exception) {  
        res.status(error.statusCode).json({
          status:false,
          message:error.message,
          data:error.data
        })
      } else {
        res.status(500).json({
          status:false,
          message:(error as Error).message
        })
      }
    }
  }
  
  public async getLogActivity(req: Request, res: Response): Promise<void> {
    try {
      const carLogs: CarLog[] = await this.carsService.getCarLogs()
      
      res.status(200).send({
        status:true,
        message:'Success Get Car Logs!',
        car_logs:carLogs
      })
    } catch(error) {
      if(error instanceof Exception) {  
        res.status(error.statusCode).json({
          status:false,
          message:error.message,
          data:error.data
        })
      } else {
        res.status(500).json({
          status:false,
          message:(error as Error).message
        })
      }
    }
  }
}