"use server";
import httpServices from "./http";
// TODO deete this module
const createReview = async (
  review: ICreateReview
): Promise<IResponseOneReviews | null> => {
  const result = await httpServices.createProductReviews(review);
  return result;
};

export async function createTodo(prevState: any, formData: FormData) {
  console.log("🚀 ~ createTodo11:", formData);

  try {
    // revalidatePath("/");
    return { message: `Added todo ` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}
