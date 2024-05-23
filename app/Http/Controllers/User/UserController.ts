import { UserStoreDTO } from "@DTOs/User/UserStoreDTO";
import { UserUpdateDTO } from "@DTOs/User/UserUpdateDTO";
import { Exception } from "@Exceptions/Exception";
import { User } from "@Models/User";
import { UserStoreRequest } from "@Requests/User/UserStoreRequest";
import { UserUpdateRequest } from "@Requests/User/UserUpdateRequest";
import { UserService } from "@Services/User/UserService";
import { Request, Response } from "express";

export class UserController {
  public userService: UserService
  
  constructor(userService: UserService) {
    this.userService = userService
  }
  
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users: User[] = await this.userService.getAll()
      
      res.status(200).json({
        status:true,
        message:'Success Get Users Admin!',
        data:{
          users:users
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
    try {
      const user: User | undefined = await this.userService.getById(Number(req.params.id))
      
      res.status(200).json({
        status:true,
        message:'Success Get User Admin!',
        data:{
          user:user
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
  
  public async insert(req: Request, res: Response): Promise<void> {
    try {
      const reqData: any = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'admin',
        created_at: new Date()
      }
      
      const dto: UserStoreDTO = new UserStoreRequest(reqData).toDTO()
      
      await this.userService.insert(dto)
      
      res.status(201).send({
        status:true,
        message:'Success Create User Admin!',
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
  
  public async update(req: Request, res: Response): Promise<void> {
    
    try {
      const reqData: any = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'admin',
        updated_at: new Date()
      }
      
      const dto: UserUpdateDTO = new UserUpdateRequest(reqData).toDTO()
      
      await this.userService.update(Number(req.params.id),dto)
      
      res.status(200).send({
        status:true,
        message:'Success Update User Admin!',
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
  
  public async delete(req: Request, res: Response): Promise<void> {
   try {
     await this.userService.delete(Number(req.params.id))
     
     res.status(200).send({
       status:true,
       message:'Success Delete User Admin!'
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
}