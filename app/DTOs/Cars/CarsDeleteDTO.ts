
export class CarsDeleteDTO {
  
    public user_id: number;
    public car_id: number;
    public log_time: Date;
    public type_action: string;
    
    constructor(data: any) {
        this.user_id = data.user_id
        this.car_id = data.car_id
        this.log_time = data.log_time;
        this.type_action = 'DELETE'
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
    // public get _created_at(): Date {
    //     return this.created_at;
    // }
    // public set _created_at(created_at: Date) {
    //     this.created_at = created_at;
    // }
    
}