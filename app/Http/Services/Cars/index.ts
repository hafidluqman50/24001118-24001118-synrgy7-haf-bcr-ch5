import { CarsService } from "./CarsService";
import { carsRepository } from "@Repositories/Cars";

const carsService = new CarsService(
  carsRepository
)

export {
  carsService
}