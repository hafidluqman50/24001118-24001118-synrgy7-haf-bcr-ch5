import { NextFunction, Response } from "express";

export class AdministratorRoleMiddleware {
  handle(req: any, res: Response, next: NextFunction) {
    const user: any = req.user
    
    if(user.role == 'superadmin' || user.role == 'admin') {
    } else {
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