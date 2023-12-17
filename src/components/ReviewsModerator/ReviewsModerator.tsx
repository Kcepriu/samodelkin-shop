"use client";
import { FC, useEffect, useState } from "react";
import { isRole } from "@/helpers/roles";
import useAboutMe from "@/stores/aboutMe.store";
import useStore from "@/helpers/useStore";
import Reviews from "@/components/Reviews/Reviews";
import FilterReview from "./FilterReview/FilterReview";
import { ALL_ROLES } from "@/constants/app-keys.const";

interface IProps {
  reviews: IReview[];
}

const ReviewsModerator: FC<IProps> = ({ reviews }) => {
  const infoAboutMe = useStore(useAboutMe, (state) => state.infoAboutMe);
  const [isModerator, setIsModerator] = useState(false);
  const [isCreateReplyReview, setIsCreateReplyReview] = useState(false);

  useEffect(() => {
    setIsModerator(
      isRole(ALL_ROLES.REVIEWS_MODERATOR, infoAboutMe?.additional_roles)
    );

    setIsCreateReplyReview(
      isRole(ALL_ROLES.REVIEWS_CREATE_REPLY, infoAboutMe?.additional_roles)
    );
  }, [infoAboutMe]);

  if (!isRole(ALL_ROLES.REVIEWS_MODERATOR, infoAboutMe?.additional_roles))
    return null;

  return (
    <>
      <FilterReview />
      <Reviews
        reviews={reviews}
        isModerator={isModerator}
        isCreateReplyReview={isCreateReplyReview}
      />
    </>
  );
};

export default ReviewsModerator;
