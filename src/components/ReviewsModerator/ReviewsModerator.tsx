"use client";
import { FC } from "react";
import { isRole } from "@/services/roles";
import useAboutMe from "@/stores/aboutMe.store";
import useStore from "@/helpers/useStore";
import { ALL_ROLES } from "@/constants/app-keys.const";

const ReviewsModerator: FC = () => {
  const infoAboutMe = useStore(useAboutMe, (state) => state.infoAboutMe);

  if (!isRole(ALL_ROLES.REVIEWS_MODERATOR, infoAboutMe?.additional_roles))
    return null;

  return <>ReviewsModerator</>;
};

export default ReviewsModerator;
