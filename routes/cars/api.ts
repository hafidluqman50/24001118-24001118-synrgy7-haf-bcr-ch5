import express, { Express, Request, Response, Router } from 'express'
import { upload } from '@config/multer'
import { carsController } from '@Controllers/Cars/index'
import { authCheck, isAdministrator } from "@Middlewares/Kernel";

const carsRoute: Express = express()

carsRoute.route('/') 
  .get([authCheck.handle, isAdministrator.handle(['superadmin','admin'])], (req: Request, res: Response): Promise<void> => carsController.getAll(req, res))
  .post([authCheck.handle, isAdministrator.handle(['superadmin','admin']), upload.single('picture')], (req: Request, res: Response): Promise<void> => carsController.insert(req, res))

carsRoute.route('/list-available')
.get((req: Request, res: Response): Promise<void> => carsController.getListAvailable(req, res))

carsRoute.route('/log-activity')
.get((req: Request, res: Response): Promise<void> => carsController.getLogActivity(req, res))

carsRoute.route('/:id')
  .get([authCheck.handle, isAdministrator.handle(['superadmin','admin'])], (req: Request, res: Response): Promise<void> => carsController.getById(req, res))
  .put([authCheck.handle, isAdministrator.handle(['superadmin','admin']), upload.single('picture')], (req: Request, res: Response): Promise<void> => carsController.update(req, res))
  .delete([authCheck.handle, isAdministrator.handle(['superadmin','admin'])], (req: Request, res: Response): Promise<void> => carsController.delete(req, res))

export default carsRoute