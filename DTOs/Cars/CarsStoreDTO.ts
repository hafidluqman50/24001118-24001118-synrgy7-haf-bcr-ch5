import { ICreateCar } from "../../interfaces/ICreateCar";

export class CarsStoreDTO {

    public name: string;
    public price: number;
    public picture: any;
    public start_rent: string;
    public finish_rent: string;
    public created_at: Date;
    
    constructor(data: ICreateCar) {
        this.name = data.name;
        this.price = data.price;
        this.picture = data.picture;
        this.start_rent = data.start_rent;
        this.finish_rent = data.finish_rent;
        this.created_at = data.created_at;
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
    public get _created_at(): Date {
        return this.created_at;
    }
    public set _created_at(created_at: Date) {
        this.created_at = created_at;
    }
    
}