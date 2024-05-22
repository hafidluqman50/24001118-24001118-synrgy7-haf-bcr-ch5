import { CarsController } from "./CarsController";
import { carsService } from "@Services/Cars";

const carsController = new CarsController(
  carsService
)

export {
  carsController
}