import Joi from "joi";
import { ICreateCar } from "@Interfaces/ICreateCar";
import { BadRequestException } from "@Exceptions/BadRequestException";
import { CarsStoreDTO } from "@DTOs/Cars/CarsStoreDTO";

export class CarsStoreRequest {
  
  protected request: ICreateCar
  
  constructor(request: ICreateCar) {
    this.request = request
  }
  
  public validator(): void {
    const validationScheme = Joi.object<ICreateCar>({
      name:Joi.string().required(),
      price:Joi.number().required(),
      picture:Joi.required(),
      start_rent:Joi.string().required(),
      finish_rent:Joi.string().required(),
      available:Joi.number().required(),
      created_at:Joi.allow(),
      user_id:Joi.number().required()
    })
    
    const { error } = validationScheme.validate(this.request)
    
    if(error) {
      throw new BadRequestException('Error Validation', {
        validations: error.details.map((x) => x.message)
      })
    }
  }
  
  public toDTO(): CarsStoreDTO {
    this.validator()
    
    return new CarsStoreDTO(this.request)
  }
}