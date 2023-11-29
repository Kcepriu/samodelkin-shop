import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import iconLinkedin from "@/assets/icons/linkedin.png";
import iconBehance from "@/assets/icons/behance.png";
import style from "./FooterDevelope.module.css";

const FooterDevelopers: FC = () => {
  return (
    <div className={style.wrapMain}>
      <div className={style.wrapDevelopers}>
        <div className={style.wrapInformation}>
          <p>Розробка:</p>
          <Link
            className={style.link}
            href="https://www.linkedin.com/in/serhii-kostiuchenko"
          >
            <span className={style.author}>Serhii</span>

            <Image
              src={iconLinkedin}
              alt="icon Linkedin"
              height={28}
              width={28}
            />
          </Link>
        </div>

        <div className={style.wrapInformation}>
          <p>Дизайн:</p>

          <Link
            className={style.link}
            href="https://www.linkedin.com/in/nadiia-zhurba-b40867268/"
          >
            <span className={style.author}>Zhurba Nadiia</span>
            <Image
              src={iconLinkedin}
              alt="icon Linkedin"
              height={28}
              width={28}
            />
          </Link>
          <Link
            className={style.link}
            href="https://www.behance.net/nadiiazhurba"
          >
            <Image
              src={iconBehance}
              alt="icon Behance"
              height={28}
              width={28}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterDevelopers;
