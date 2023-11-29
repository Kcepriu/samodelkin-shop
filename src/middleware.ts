export { default } from "next-auth/middleware";

import {
  ACCOUNT_ADD_INFORMATION_ROUTES,
  FRONTEND_ROUTES,
} from "./constants/app-keys.const";

export const config = {
  matcher: ["/account/information", "/account/orders", "/account/reviews"],
};

// TODO Why next code don't work
// export const config = {
//   matcher: [
//    `${FRONTEND_ROUTES.ACCOUNT}${ACCOUNT_ADD_INFORMATION_ROUTES.INFORMATION}`,
//    `${FRONTEND_ROUTES.ACCOUNT}${ACCOUNT_ADD_INFORMATION_ROUTES.ORDERS}`,
//    `${FRONTEND_ROUTES.ACCOUNT}${ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS}`,
//  ]
// };
