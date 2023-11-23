import { FC } from "react";
import httpServices from "@/services/http";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import GeneralInfoPage from "@/components/GeneralInfoPage/GeneralInfoPage";
interface IProps {
  isPage?: boolean;
}

const AboutUsSection: FC<IProps> = async ({
  isPage = false,
}): Promise<JSX.Element> => {
  const responseAboutUs = await httpServices.getAboutUs();

  if (!responseAboutUs) return <></>;

  const aboutUs = responseAboutUs.data.attributes.content;

  return (
    <GeneralInfoPage
      titlePage="Про нас"
      content={aboutUs}
      type={TypeDescription.GeneralPage}
      isPage={isPage}
    />
  );
};

export default AboutUsSection;
