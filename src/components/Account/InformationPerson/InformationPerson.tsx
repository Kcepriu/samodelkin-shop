"use client";
import { FC, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { GoPerson } from "react-icons/go";
import useAboutMe from "@/stores/aboutMe.store";
import useStore from "@/helpers/useStore";

import style from "./InformationPerson.module.css";

const InformationPerson: FC = () => {
  const infoAboutMe = useStore(useAboutMe, (state) => state.infoAboutMe);
  const { data: session } = useSession();
  const user = session?.user;

  const [userName, setUserName] = useState("");

  const emailUser = !!user ? user.email : "";

  useEffect(() => {
    if (!user) {
      setUserName("Гість");
      return;
    }

    if (!!infoAboutMe && (infoAboutMe.lastName || infoAboutMe.firstName)) {
      setUserName(`${infoAboutMe.lastName} ${infoAboutMe.firstName}`);
      return;
    }

    setUserName(user.fullName!);
  }, [infoAboutMe, user]);

  return (
    <div className={style.wrapUserInfo}>
      <div className={style.wrapImageFromName}>
        <GoPerson size={24} />
        <div>
          <p>{userName}</p>
          <p>{emailUser}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationPerson;
