"use client";
import { FC } from "react";
import Image from "next/image";
import { LuAlignLeft } from "react-icons/lu";
import { PiPhoneCall } from "react-icons/pi";
import { useSearchParams, useRouter } from "next/navigation";
import { IResponseMainPage } from "@/types/articles.types";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import useMobileMenu from "@/hooks/useMobileMenu";
import FilterCategories from "@/components/FilterCategories/FilterCategories";
import iconTelegram from "@/assets/icons/telegram.svg";
import iconLinkedin from "@/assets/icons/linkedin.png";
import iconBehance from "@/assets/icons/behance.png";
import style from "./ButtonBurgerClient.module.css";

interface IProps {
  allCategories: ICategorie[];
  responseMainPage: IResponseMainPage | null;
}

const ButtonBurgerClient: FC<IProps> = ({
  allCategories,
  responseMainPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const currentCategory = !!category ? category : "";

  const telephoneNumber = responseMainPage?.data.attributes.phoneNumber || "";
  const telegramName = responseMainPage?.data.attributes.telegram || "";
  const workingHours = responseMainPage?.data.attributes.workingHours || "";

  const closeModal = () => {
    setShowMobileMenu(false);
  };

  const handleToLink = (url: string) => {
    setShowMobileMenu(false);
    router.push(url);
  };

  const handleToLinkNewWindow = (url: string) => {
    setShowMobileMenu(false);
    window.open(url, "_blank");
  };

  const contentComponent = (
    <div className={style.wrapPage}>
      <div className={style.wrapFilter}>
        <FilterCategories
          allCategories={allCategories}
          currentCategory={currentCategory}
          addAction={closeModal}
          title="Samodelkin"
        />
      </div>

      <div className={style.wrapFooterPage}>
        <div className={style.wrapInfo}>
          <button
            className={style.link}
            onClick={() => handleToLink(FRONTEND_ROUTES.ABOUT_US)}
          >
            Про компанію
          </button>
          <button
            className={style.link}
            onClick={() => handleToLink(FRONTEND_ROUTES.PRODUCTS)}
          >
            Каталог товарів
          </button>
          <button
            className={style.link}
            onClick={() => handleToLink(FRONTEND_ROUTES.DELIVERY)}
          >
            Умови доставки
          </button>
          <button
            className={style.link}
            onClick={() => handleToLink(FRONTEND_ROUTES.CHANGE)}
          >
            Обмін і повернення
          </button>
        </div>

        <div id="contacts" className={style.wrapContacts}>
          <h2 className={style.title}>Контакти</h2>
          <p>{workingHours}</p>

          <button
            className={style.link}
            onClick={() => handleToLinkNewWindow(`tel:${telephoneNumber}`)}
          >
            <PiPhoneCall size={24} />
            {telephoneNumber}
          </button>

          <button
            className={style.link}
            onClick={() => handleToLinkNewWindow(telegramName)}
          >
            <Image
              src={iconTelegram}
              alt="Picture of the author"
              width={24}
              height={24}
            />{" "}
            Telegram
          </button>
        </div>

        <div className={style.wrapDevelopers}>
          <h3>Працювали над проєктом: </h3>

          <div className={style.wrapPerson}>
            <button
              className={style.link}
              onClick={() =>
                handleToLinkNewWindow(
                  "https://www.linkedin.com/in/nadiia-zhurba-b40867268/"
                )
              }
            >
              <Image
                src={iconLinkedin}
                alt="icon Linkedin"
                height={32}
                width={32}
              />
            </button>
            <button
              className={style.link}
              onClick={() =>
                handleToLinkNewWindow("https://www.behance.net/nadiiazhurba")
              }
            >
              <Image
                src={iconBehance}
                alt="icon Behance"
                height={28}
                width={28}
              />
            </button>
            <p>Design - Zhurba Nadiia</p>
          </div>

          <div className={style.wrapPerson}>
            <button
              className={style.link}
              onClick={() =>
                handleToLinkNewWindow(
                  "https://www.linkedin.com/in/serhii-kostiuchenko"
                )
              }
            >
              <Image
                src={iconLinkedin}
                alt="icon Linkedin"
                height={32}
                width={32}
              />
            </button>
            <p className={style.titleDeveloper}>Developer - </p>{" "}
            <button
              onClick={() =>
                handleToLinkNewWindow("https://t.me/SerhiiKostiuchenko")
              }
              className={style.link}
            >
              <div className={style.developer}>
                <p>Serhii</p> <p>Kostiuchenko</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const { ModalMenuComponent, setShowMobileMenu } = useMobileMenu({
    contentComponent,
  });

  return (
    <>
      <button onClick={() => setShowMobileMenu(true)}>
        <LuAlignLeft size={40} />
      </button>
      {ModalMenuComponent}
    </>
  );
};

export default ButtonBurgerClient;
