import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { upload } from './config/multer'
import { CarsController } from "./controllers/CarsController";

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req: Request, res: Response): void => {
    res.status(200).json({
      "message": "Restful API BCR Chapter 5 FSW 2 Hafiidh Luqmanul Hakim"
    })
});

app.get('/api/cars', (req: Request, res: Response): void => {
  (new CarsController).getAll(req, res)
})

app.get('/api/cars/:id', (req: Request, res: Response): void => {
  (new CarsController).getById(req, res)
})

app.post('/api/cars', upload.single('picture'), (req: Request, res: Response): void => {
  (new CarsController).insert(req, res)
})

app.put('/api/cars/:id', upload.single('picture'), (req: Request, res: Response): void => {
  (new CarsController).update(req, res)
})

app.delete('/api/cars/:id', (req: Request, res: Response): void => {
  (new CarsController).delete(req, res)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});