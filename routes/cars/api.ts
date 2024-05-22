import express, { Express, Request, Response, Router } from 'express'
import { upload } from '@config/multer'
import { carsController } from '@Controllers/Cars/index'

const carsRoute: Express = express()

carsRoute.route('/') 
         .get((req: Request, res: Response): Promise<void> => carsController.getAll(req, res))
         .post(upload.single('picture'), (req: Request, res: Response): Promise<void> => carsController.insert(req, res))

carsRoute.route('/:id')
         .get((req: Request, res: Response): Promise<void> => carsController.getById(req, res))
         .put(upload.single('picture'), (req: Request, res: Response): Promise<void> => carsController.update(req, res))
         .delete((req: Request, res: Response): Promise<void> => carsController.delete(req, res))

export default carsRoute