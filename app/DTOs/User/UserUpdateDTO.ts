export class UserUpdateDTO {
  public name: string
  public email: string
  public password: string
  public role: string
  public updated_at: Date
  
  constructor(data: any) {
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.role = data.role
    this.updated_at = data.updated_at
  }
}