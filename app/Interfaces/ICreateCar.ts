export interface ICreateCar {
  name:string;
  price:number;
  picture:any;
  start_rent:string;
  finish_rent:string;
  available: number;
  created_at:Date;
  user_id: number
}