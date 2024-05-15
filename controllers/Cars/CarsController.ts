import { Cars } from "../../interfaces/Cars";
import { CarsService } from "../../services/Cars/CarsService";
import { Request, Response } from 'express'
import { ICreateCar } from "../../interfaces/ICreateCar";
import { IUpdateCar } from "../../interfaces/IUpdateCar";
import { Exception } from "../../exceptions/Exception";
import { CarsStoreRequest } from "../../requests/Cars/CarsStoreRequest";
import { CarsStoreDTO } from "../../DTOs/Cars/CarsStoreDTO";
import { CarsUpdateDTO } from "../../DTOs/Cars/CarsUpdateDTO";
import { CarsUpdateRequest } from "../../requests/Cars/CarsUpdateRequest";

export class CarsController {
  public carsService: CarsService
  
  constructor(carsService: CarsService) {
    this.carsService = carsService
  }
  
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const getCars: Cars[] = await this.carsService.getAll()
      
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
        message:'Error Server!'
      })
    }
  }
  
  public async getById(req: Request, res: Response): Promise<void> {
    try{
      const getCarByid: Cars | undefined = await this.carsService.getById(Number(req.params.id))
      
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
          message:'Error Server!'
        })
        
      }
    }
  }
  
  public async insert(req: Request, res: Response): Promise<void> {
    try {
      
      const fileBase64: string | undefined = req.file?.buffer.toString("base64");
      const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;
      
      const reqData: ICreateCar = {
        name: req.body.name,
        price:req.body.price,
        picture:req.file,
        start_rent:req.body.start_rent,
        finish_rent:req.body.finish_rent,
        created_at:new Date()
      }
      
      const dto: CarsStoreDTO = new CarsStoreRequest(reqData).toDTO()
      
      await this.carsService.insert(dto, file)
      
      res.status(201).json({
        status:true,
        message:'Success Create Car!'
      })
      
    } catch(error) {
      res.status(500).json({
        status:false,
        message:(error as Error).message
      })
    }
  }
  
  public async update(req: Request, res: Response): Promise<void> {
    try {
        const fileBase64: string | undefined = req.file?.buffer.toString("base64");
        const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;
        
        const reqData: IUpdateCar = {
          name: req.body.name,
          price:req.body.price,
          picture:req.file,
          start_rent:req.body.start_rent,
          finish_rent:req.body.finish_rent,
          updated_at:new Date()
        }
        
        const dto: CarsUpdateDTO = new CarsUpdateRequest(reqData).toDTO()
        
        await this.carsService.update(Number(req.params.id), dto, file)
        
        res.status(200).json({
          status:true,
          message:'Success Edit Car!'
        })
        
    } catch(error) {
      res.status(500).json({
        status:false,
        message:(error as Error).message
      })
    }
  }
  
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.carsService.delete(Number(req.params.id))
      
      res.status(200).send({
        status:true,
        message:'Success Delete Car!'
      })
    } catch(error) {
      res.status(500).send({
        status:false,
        message:(error as Error).message
      })
    }
  }
}