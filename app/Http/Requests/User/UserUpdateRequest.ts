import Joi from "joi";
import { BadRequestException } from "@Exceptions/BadRequestException";
import { UserUpdateDTO } from "@DTOs/User/UserUpdateDTO";

export class UserUpdateRequest {
  
  protected request: any
  
  constructor(request: any) {
    this.request = request
  }
  
  public validator(): void {
    const validationScheme = Joi.object<any>({
      name:Joi.string().required(),
      email:Joi.string().required(),
      password:Joi.string().required(),
      role:Joi.string().required(),
      updated_at:Joi.date().required()
    })
    
    const { error } = validationScheme.validate(this.request)
    
    if(error) {
      throw new BadRequestException('Error Validation', {
        validations: error.details.map((x) => x.message)
      })
    }
  }
  
  public toDTO(): UserUpdateDTO {
    this.validator()
    
    return new UserUpdateDTO(this.request)
  }
}