import { Request, Response, NextFunction } from 'express'
import jwt, { GetPublicKeyOrSecret, JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken'

export class AuthenticationMiddleware {
  handle(req: any, res: Response, next: NextFunction) {
    const tokenHeader: string[] | string | undefined = req.headers['authorization']
    
    if(tokenHeader === undefined) {
      return res.status(401).send({
        status:false,
        message:'Error',
        data: {
          errors:'Unauthorized'
        }
      })
    }
    
    if ((tokenHeader as string).split(' ')[0] !== 'Bearer') {
			return res.status(403).send({
			  status:false,
        message:'Error',
        data: {
          errors:'Incorret Format Token!'
        }
			});
		}
    
		let token = (tokenHeader as string).split(' ')[1];
    
		if (!token) {
			return res.status(403).send({
			  status:false,
        message:'Error',
        data: {
          errors:'No Token Provided!'
        }
			});
		}
    
		jwt.verify(
		  token, 
		  (process.env.JWT_SECRET as Secret | GetPublicKeyOrSecret), 
		  (err, decoded) => {
			if ((err as VerifyErrors)) {
				return res.status(401).send({
					status: false,
					message: "Error",
					data: {
					 errors: (err as VerifyErrors).message
					}
				});
			}
			req.user = (decoded as JwtPayload).user;
			next();
		});
  }
}