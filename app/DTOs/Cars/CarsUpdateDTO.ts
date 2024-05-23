import { IUpdateCar } from "@Interfaces/IUpdateCar";

export class CarsUpdateDTO {
  
    public name: string;
    public price: number;
    public picture: any;
    public start_rent: string;
    public finish_rent: string;
    public available: number
    public updated_at: Date;
    public user_id: number
    public car_id: number;
    public log_time: Date;
    public type_action: string;
    
    constructor(data: IUpdateCar) {
        this.name = data.name;
        this.price = data.price;
        this.picture = data.picture;
        this.start_rent = data.start_rent;
        this.finish_rent = data.finish_rent;
        this.available = data.available
        this.updated_at = data.updated_at;
        this.user_id = data.user_id
        this.car_id = 0
        this.log_time = data.updated_at;
        this.type_action = 'UPDATE'
    }
    
    // public get _name(): string {
    //     return this.name;
    // }
    // public set _name(name: string) {
    //     this.name = name;
    // }
    // public get _picture(): any {
    //     return this.picture;
    // }
    // public set _picture(picture: any) {
    //     this.picture = picture;
    // }
    // public get _price(): number {
    //     return this.price;
    // }
    // public set _price(price: number) {
    //     this.price = price;
    // }
    // public get _start_rent(): string {
    //     return this.start_rent;
    // }
    // public set _start_rent(start_rent: string) {
    //     this.start_rent = start_rent;
    // }
    // public get _finish_rent(): string {
    //     return this.finish_rent;
    // }
    // public set _finish_rent(finish_rent: string) {
    //     this.finish_rent = finish_rent;
    // }
    // public get _updated_at(): Date {
    //     return this.updated_at;
    // }
    // public set _updated_at(updated_at: Date) {
    //     this.updated_at = updated_at;
    // }
    
}