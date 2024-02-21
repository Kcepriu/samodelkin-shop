import { FC } from "react";
import Link from "next/link";
import { PiLinkedinLogo } from "react-icons/pi";
import style from "./FooterDevelope.module.css";

const FooterDevelopers: FC = () => {
  return (
    <div className={style.wrapMain}>
      <div className={style.wrapDevelopers}>
        <h3>Working on the project: </h3>

        <div className={style.wrapInformation}>
          <Link
            className={style.link}
            target="_blank"
            href="https://www.linkedin.com/in/nadiia-zhurba-b40867268/"
          >
            Design - Zhurba Nadiia <PiLinkedinLogo size={24} />
          </Link>
        </div>

        <div className={style.wrapInformation}>
          <Link
            className={style.link}
            href="https://www.linkedin.com/in/serhii-kostiuchenko"
            target="_blank"
          >
            Development - Serhii Kostiuchenko <PiLinkedinLogo size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterDevelopers;
