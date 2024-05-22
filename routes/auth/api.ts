import express, { Express, Request, Response } from 'express'
import { authController } from '@Controllers/Auth/index'
import { none } from '@config/multer'
import { authCheck } from '@Middlewares/Kernel'

const authRoutes: Express = express()

authRoutes.route('/super-admin/login') 
         .post(none.none(), (req: Request, res: Response): Promise<void> => authController.loginSuperAdmin(req, res))

authRoutes.route('/current-user')
          .get(authCheck.handle, (req: Request, res: Response): Promise<void> => authController.currentUser(req, res))

export default authRoutes