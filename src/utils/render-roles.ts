import { User } from "../graphql";

export function renderRoles(user: User) {
  const roles = [];
  if (user.roles.admin) roles.push("Administrador");
  if (user.roles.driver) roles.push("Transportista");
  return roles.join(", ");
}
