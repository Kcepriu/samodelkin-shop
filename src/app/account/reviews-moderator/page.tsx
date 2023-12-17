import { FC } from "react";
import httpServices from "@/services/http";
import ReviewsModerator from "@/components/ReviewsModerator/ReviewsModerator";

const PageModerator: FC = async (): Promise<JSX.Element> => {
  const responseReviews = await httpServices.getLastReviews();
  return (
    <>
      {responseReviews && responseReviews.data.length > 0 && (
        <ReviewsModerator reviews={responseReviews.data} />
      )}
    </>
  );
};

export default PageModerator;
