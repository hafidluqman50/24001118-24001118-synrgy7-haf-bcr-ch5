import { CarsService } from "./CarsService";
import { carLogRepository, carsRepository } from "@Repositories/Cars";

const carsService = new CarsService(
  carsRepository,
  carLogRepository
)

export {
  carsService
}