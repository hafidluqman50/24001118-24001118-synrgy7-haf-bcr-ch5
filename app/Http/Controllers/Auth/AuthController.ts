import { Exception } from "@Exceptions/Exception";
import { AuthLoginRequest } from "@Requests/Auth/AuthLoginRequest";
import { UserService } from "@Services/User/UserService";
import { Request, Response } from "express";

export class AuthController {
  
  public userService: UserService
  
  constructor(userService: UserService) {
    this.userService = userService
  }
  
  async loginSuperAdmin(req: Request, res: Response) {
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
        message:'Success Login!',
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
  
  async currentUser(req: any, res: Response) {
    res.status(200).send({
      status:true,
      message:'Success Get Current User!',
      data: req.user
    })
  }
}