import Joi from "joi";
import { BadRequestException } from "../../exceptions/BadRequestException";
import { IUpdateCar } from "../../interfaces/IUpdateCar";
import { CarsUpdateDTO } from "../../DTOs/Cars/CarsUpdateDTO";

export class CarsUpdateRequest {
  
  protected request: IUpdateCar
  
  constructor(request: IUpdateCar) {
    this.request = request
  }
  
  public validator(): void {
    const validationScheme = Joi.object<IUpdateCar>({
      name:Joi.string().required(),
      price:Joi.number().required(),
      picture:Joi.required(),
      start_rent:Joi.string().required(),
      finish_rent:Joi.string().required(),
      updated_at:Joi.allow()
    })
    
    const { error } = validationScheme.validate(this.request)
    
    if(error) {
      throw new BadRequestException('Error Validation', {
        validations: error.details.map((x) => x.message)
      })
    }
  }
  
  public toDTO(): CarsUpdateDTO {
    this.validator()
    
    return new CarsUpdateDTO(this.request)
  }
}