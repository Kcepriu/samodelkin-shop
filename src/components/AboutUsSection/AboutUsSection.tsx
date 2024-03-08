import { FC } from "react";
import httpServices from "@/services/http";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import Description from "../Description/Description";

interface IProps {
  isPage?: boolean;
}

const AboutUsSection: FC<IProps> = async ({
  isPage = false,
}): Promise<JSX.Element> => {
  const responseAboutUs = await httpServices.getAboutUs();

  if (!responseAboutUs) return <></>;

  const aboutUs = responseAboutUs.data.attributes.content;

  return <Description content={aboutUs} isFirstTitleInSection />;
};

export default AboutUsSection;
