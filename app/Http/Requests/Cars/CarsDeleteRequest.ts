import Joi from "joi";
import { BadRequestException } from "@Exceptions/BadRequestException";
import { CarsDeleteDTO } from "@DTOs/Cars/CarsDeleteDTO";

export class CarsDeleteRequest {
  
  protected request: any
  
  constructor(request: any) {
    this.request = request
  }
  
  public validator(): void {
    const validationScheme = Joi.object<any>({
      user_id:Joi.number().required(),
      car_id: Joi.number().required(),
      log_time: Joi.string().required()
    })
    
    const { error } = validationScheme.validate(this.request)
    
    if(error) {
      throw new BadRequestException('Error Validation', {
        validations: error.details.map((x) => x.message)
      })
    }
  }
  
  public toDTO(): CarsDeleteDTO {
    this.validator()
    
    return new CarsDeleteDTO(this.request)
  }
}