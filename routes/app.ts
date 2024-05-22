import express, { Express, Request, Response } from "express";
import carsRoutes from '@routes/cars/api'
import '@config/database'
import authRoutes from "./auth/api";
import cookieParser from 'cookie-parser'
import { authCheck, isAdministrator } from "@Middlewares/Kernel";

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req: Request, res: Response): void => {
    res.status(200).json({
      "message": "Restful API BCR Chapter 5 FSW 2 Hafiidh Luqmanul Hakim"
    })
});

app.use('/api/cars', [authCheck.handle, isAdministrator.handle], carsRoutes)
app.use('/api/', authRoutes)

console.log(`
  |       API ENDPOINT    | METHOD |        DESCRIPTION      |
  |-----------------------|--------|-------------------------|
  |------------------------ CARS ----------------------------|
  | /api/cars             |   GET  | Get All Data Cars       |
  | /api/cars/:id         |   GET  | Get By Id Data Cars     |
  | /api/cars/            |  POST  | Post Data Cars          |
  | /api/cars/:id         |   PUT  | Update Data Cars By Id  |
  | /api/cars/:id         | DELETE | Delete Data Cars By Id  |
  |------------------------- AUTH ---------------------------|
  | /api/super-admin/login |  POST | Login Super Admin       |
  | /api/admin/login       |  POST | Login Admin             |
  | /api/member/register   |  POST | Register Member         |
  | /api/member/login      |  POST | Login Post Login        |
  |------------------------- USERS --------------------------|
  | /api/user-admin       |  GET   | Get All User Admin      |
  | /api/user-admin       | POST   | Create User Admin       |
  | /api/user-admin/:id   | GET    | Get User Admin By Id    |
  | /api/user-admin/:id   | PUT    | Update User Admin By Id |
  | /api/user-admin/:id   | DELETE | Delete User Admin By Id |
`)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});