// /**
//  * `validationChangeStatusReview` middleware
//  */

// import { Strapi } from "@strapi/strapi";
// import { schemaChangeStatusReview } from "../schemesJoi/review";

// export default (config, { strapi }: { strapi: Strapi }) => {
//   // Add your own logic here.
//   return async (ctx, next) => {
//     const { body } = ctx.request;
//     const { error } = schemaChangeStatusReview.validate(body.data);

//     if (error) {
//       ctx.throw(400, error.message);
//     }

//     await next();
//   };
// };
