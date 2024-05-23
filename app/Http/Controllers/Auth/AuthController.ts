import { UserLoginDTO } from "@DTOs/User/UserLoginDTO";
import { UserStoreDTO } from "@DTOs/User/UserStoreDTO";
import { Exception } from "@Exceptions/Exception";
import { AuthLoginRequest } from "@Requests/Auth/AuthLoginRequest";
import { AuthRegisterRequest } from "@Requests/Auth/AuthRegisterRequest";
import { UserService } from "@Services/User/UserService";
import { Request, Response } from "express";

export class AuthController {
  
  public userService: UserService
  
  constructor(userService: UserService) {
    this.userService = userService
  }
  
  public async loginSuperAdmin(req: Request, res: Response) {
    try {
      const reqData: any = {
        email: req.body.email,
        password: req.body.password,
        role: 'superadmin'
      }
      
      console.log(reqData)
      
      const dto = new AuthLoginRequest(reqData).toDTO()
      
      const authLogin = await this.userService.login(dto)
      
      res.status(200).send({
        status:true,
        message:'Success Login Super Admin!',
        data: authLogin
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
  
  public async loginAdmin(req: Request, res: Response) {
    
    try {
        const reqData: any = {
          email: req.body.email,
          password: req.body.password,
          role: 'admin'
        }
        
        console.log(reqData)
        
        const dto = new AuthLoginRequest(reqData).toDTO()
        
        const authLogin = await this.userService.login(dto)
        
        res.status(200).send({
          status:true,
          message:'Success Login Admin!',
          data: authLogin
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
  
  public async loginMember(req: Request, res: Response) {
    try {
        const reqData: any = {
          email: req.body.email,
          password: req.body.password,
          role: 'member'
        }
        
        console.log(reqData)
        
        const dto: UserLoginDTO = new AuthLoginRequest(reqData).toDTO()
        
        const authLogin: {
          email: string,
          name: string,
          role: string,
          token: string,
          expiresIn: number
        } = await this.userService.login(dto)
        
        res.status(200).send({
          status:true,
          message:'Success Login Member!',
          data: authLogin
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
  
  public async registerMember(req: Request, res: Response): Promise<void> {
    try {
      
      const reqData: any = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'member',
        created_at: new Date()
      }
      
      const dto: UserStoreDTO = new AuthRegisterRequest(reqData).toDTO()
      
      const authRegister: {
        email: string,
        name: string,
        role: string,
        token: string,
        expiresIn: number
      } = await this.userService.register(dto)
      
      res.status(201).send({
        status:true,
        message:'Success Register Member!',
        data: authRegister
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
  
  public async currentUser(req: any, res: Response) {
    res.status(200).send({
      status:true,
      message:'Success Get Current User!',
      data: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    })
  }
}