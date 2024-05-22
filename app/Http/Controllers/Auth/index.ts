import { AuthController } from "./AuthController";
import { userService } from "@Services/User";

const authController = new AuthController(userService)

export {
  authController
}