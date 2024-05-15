import { CarsController } from "./CarsController";
import { carsService } from "../../services/Cars";

const carsController = new CarsController(
  carsService
)

export {
  carsController
}