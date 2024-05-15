import { IUpdateCar } from "../../interfaces/IUpdateCar";

export class CarsUpdateDTO {
  
    private name: string;
    private price: number;
    private picture: any;
    private start_rent: string;
    private finish_rent: string;
    private updated_at: Date;
    
    constructor(data: IUpdateCar) {
        this.name = data.name;
        this.price = data.price;
        this.picture = data.picture;
        this.start_rent = data.start_rent;
        this.finish_rent = data.finish_rent;
        this.updated_at = data.updated_at;
    }
    
    public get _name(): string {
        return this.name;
    }
    public set _name(name: string) {
        this.name = name;
    }
    public get _picture(): any {
        return this.picture;
    }
    public set _picture(picture: any) {
        this.picture = picture;
    }
    public get _price(): number {
        return this.price;
    }
    public set _price(price: number) {
        this.price = price;
    }
    public get _start_rent(): string {
        return this.start_rent;
    }
    public set _start_rent(start_rent: string) {
        this.start_rent = start_rent;
    }
    public get _finish_rent(): string {
        return this.finish_rent;
    }
    public set _finish_rent(finish_rent: string) {
        this.finish_rent = finish_rent;
    }
    public get _updated_at(): Date {
        return this.updated_at;
    }
    public set _updated_at(updated_at: Date) {
        this.updated_at = updated_at;
    }
    
}