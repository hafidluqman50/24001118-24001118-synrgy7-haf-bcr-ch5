import { UserService } from "./UserService";
import { userRepository } from "@Repositories/User";

const userService = new UserService(userRepository)

export {
  userService
}