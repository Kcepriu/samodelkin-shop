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
        <h3>Працювали над проєктом: </h3>

        <div className={style.wrapInformation}>
          <Link
            className={style.link}
            href="https://www.linkedin.com/in/nadiia-zhurba-b40867268/"
          >
            <Image
              src={iconLinkedin}
              alt="icon Linkedin"
              height={32}
              width={32}
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
          <p>Design - Zhurba Nadiia</p>
          {/* <span className={style.author}>Zhurba Nadiia</span> */}
        </div>

        <div className={style.wrapInformation}>
          <Link
            className={style.link}
            href="https://www.linkedin.com/in/serhii-kostiuchenko"
          >
            <Image
              src={iconLinkedin}
              alt="icon Linkedin"
              height={32}
              width={32}
            />
          </Link>
          <p>Development - </p>
          <Link
            href="https://t.me/SerhiiKostiuchenko"
            target="_blank"
            className={style.link}
          >
            Serhii Kostiuchenko
          </Link>
          {/* <span className={style.author}>Serhii Kostiuchenko</span> */}
        </div>
      </div>
    </div>
  );
};

export default FooterDevelopers;
