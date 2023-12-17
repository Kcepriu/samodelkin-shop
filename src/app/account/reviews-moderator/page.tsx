import { FC } from "react";
import httpServices from "@/services/http";
import ReviewsModerator from "@/components/ReviewsModerator/ReviewsModerator";

interface IParams {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
const PageModerator: FC<IParams> = async ({
  searchParams,
}): Promise<JSX.Element> => {
  const { page = "1", all_review = "" } = searchParams;
  const currentPage = typeof page === "string" ? page : page[0];
  const onlyNotPublished = all_review !== "";

  const responseReviews = await httpServices.getNotPublishedReviews({
    page: currentPage,
    onlyNotPublished: onlyNotPublished,
  });
  return (
    <>
      {responseReviews && responseReviews.data.length > 0 && (
        <ReviewsModerator reviews={responseReviews.data} />
      )}
    </>
  );
};

export default PageModerator;
