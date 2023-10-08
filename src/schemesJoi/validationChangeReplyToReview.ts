// /**
//  * `validationChangeStatusReview` middleware
//  */

// import { Strapi } from "@strapi/strapi";
// import { schemaChangeReplyToReview } from "../schemesJoi/review";

// export default (config, { strapi }: { strapi: Strapi }) => {
//   // Add your own logic here.
//   return async (ctx, next) => {
//     const { body } = ctx.request;
//     const { error } = schemaChangeReplyToReview.validate(body.data);

//     if (error) {
//       ctx.throw(400, error.message);
//     }

//     await next();
//   };
// };
