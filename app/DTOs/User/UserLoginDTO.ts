export class UserLoginDTO {
  public email: string
  public password: string
  public role: string
  
  constructor(data: any) {
    this.email = data.email
    this.password = data.password
    this.role = data.role
  }
}