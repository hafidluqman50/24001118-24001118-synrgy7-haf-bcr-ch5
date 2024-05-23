export class UserRegisterDTO {
  public name: string
  public email: string
  public password: string
  public role: string
  
  constructor(data: any) {
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.role = data.role
  }
}