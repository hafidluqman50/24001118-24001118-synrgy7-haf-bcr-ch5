import { CarLogsRepository } from "./CarLogsRepository";
import { CarsRepository } from "./CarsRepository";

const carsRepository = new CarsRepository()
const carLogRepository = new CarLogsRepository()

export {
  carsRepository,
  carLogRepository
}