import { Cars } from "../../interfaces/Cars";
import { CarsService } from "../../services/Cars/CarsService";
import { Request, Response } from 'express'
import { ICreateCar } from "../../interfaces/ICreateCar";
import { IUpdateCar } from "../../interfaces/IUpdateCar";
import Joi from 'joi'

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
      res.status(500).json({
        status:false,
        message:'Error Server!'
      })
    }
  }
  
  public async insert(req: Request, res: Response): Promise<void> {
    try {
      
      const fileBase64: string | undefined = req.file?.buffer.toString("base64");
      const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;
      
      const validationScheme = Joi.object<ICreateCar>({
        name:Joi.string().required(),
        price:Joi.number().required(),
        picture:Joi.required(),
        start_rent:Joi.string().required(),
        finish_rent:Joi.string().required(),
        created_at:Joi.allow(),
        updated_at:Joi.allow()
      })
      
      const reqData: ICreateCar = {
        name: req.body.name,
        price:req.body.price,
        picture:req.file,
        start_rent:req.body.start_rent,
        finish_rent:req.body.finish_rent,
        created_at:new Date(),
        updated_at:new Date()
      }
      
      const { error: errorValidation } = validationScheme.validate(reqData)
      
      if(errorValidation) {
        res.status(400).send({
          status:false,
          message:'Error Validation!',
          data:{
            validations:errorValidation.details.map((x) => x.message)
          }
        })
      }
      
      await this.carsService.insert(reqData, file)
      
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
        
        const validationScheme = Joi.object<IUpdateCar>({
          name:Joi.string().required(),
          price:Joi.number().required(),
          picture:Joi.required(),
          start_rent:Joi.string().required(),
          finish_rent:Joi.string().required(),
          created_at:Joi.allow(),
          updated_at:Joi.allow()
        })
        
        const reqData: IUpdateCar = {
          name: req.body.name,
          price:req.body.price,
          picture:req.file,
          start_rent:req.body.start_rent,
          finish_rent:req.body.finish_rent,
          created_at:new Date(),
          updated_at:new Date()
        }
        
        const { error: errorValidation } = validationScheme.validate(reqData)
        
        if(errorValidation) {
          res.status(400).send({
            status:false,
            message:'Error Validation!',
            data:{
              validations:errorValidation.details.map((x) => x.message)
            }
          })
        }
        
        await this.carsService.update(Number(req.params.id), reqData, file)
        
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