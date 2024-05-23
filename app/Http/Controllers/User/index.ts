import { UserController } from "./UserController";
import { userService } from "@Services/User";

const userController = new UserController(userService)

export {
  userController
}