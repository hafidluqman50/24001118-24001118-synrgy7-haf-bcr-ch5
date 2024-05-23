import { NextFunction, Response } from "express";

export class AdministratorRoleMiddleware {
  public handle(role: string[]) {
    return (req: any, res: Response, next: NextFunction) => {
      const user: any = req.user
      
      if(!role.includes(user.role)) {
        
        return res.status(403).send({
              status:false,
              message:'Error!',
              data:{
                errors:'Not Allowed!'
              }
            })
      } 
      
      next()
    }
  }
}