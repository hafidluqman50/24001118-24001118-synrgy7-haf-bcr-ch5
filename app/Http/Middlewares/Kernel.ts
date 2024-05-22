import { AdministratorRoleMiddleware } from "./AdministratorRoleMiddleware";
import { AuthenticationMiddleware } from "./AuthenticationMiddleware";

const authCheck = new AuthenticationMiddleware()
const isAdministrator = new AdministratorRoleMiddleware()

export {
  authCheck,
  isAdministrator
}