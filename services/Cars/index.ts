import { CarsService } from "./CarsService";
import { carsRepository } from "../../repositories/Cars";

const carsService = new CarsService(
  carsRepository
)

export {
  carsService
}