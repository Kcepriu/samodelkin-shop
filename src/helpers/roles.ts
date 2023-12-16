import { ROLES } from "@/constants/app-keys.const";
import { IAdditionalRoles } from "@/types/aboutUser.types";

export const isRole = (
  roles: ROLES[] | null,
  userRoles: IAdditionalRoles[] | null | undefined
): boolean => {
  if (!roles || roles.length === 0 || !userRoles || userRoles.length === 0)
    return false;

  const result = userRoles.find((userRole) => roles.includes(userRole.type));

  return !!result;
};
