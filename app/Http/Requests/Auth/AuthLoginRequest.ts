import Joi from "joi";
import { BadRequestException } from "@Exceptions/BadRequestException";
import { UserLoginDTO } from "@DTOs/User/UserLoginDTO";

export class AuthLoginRequest {
  
  protected request: any
  
  constructor(request: any) {
    this.request = request
  }
  
  public validator(): void {
    const validationScheme = Joi.object<any>({
      email:Joi.string().required(),
      password:Joi.string().required(),
      role:Joi.string().required()
    })
    
    const { error } = validationScheme.validate(this.request)
    
    if(error) {
      throw new BadRequestException('Error Validation', {
        validations: error.details.map((x) => x.message)
      })
    }
  }
  
  public toDTO(): UserLoginDTO {
    this.validator()
    
    return new UserLoginDTO(this.request)
  }
}