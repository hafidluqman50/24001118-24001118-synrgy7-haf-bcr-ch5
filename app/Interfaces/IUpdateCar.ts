export interface IUpdateCar {
  name:string;
  price:number;
  picture:any;
  start_rent:string;
  finish_rent:string;
  available: number;
  updated_at:Date;
  user_id: number
}