import { FC } from "react";

import { GoPerson } from "react-icons/go";

import style from "./InformationPerson.module.css";
import { UserWithField } from "@/types/next-auth";
import ButtonSignOut from "./ButtonSignOut/ButtonSignOut";

interface IProps {
  user: UserWithField | undefined;
}

const InformationPerson: FC<IProps> = ({ user }) => {
  const emailUser = !!user ? user.email : "";
  const userName = !!user ? user.fullName! : "Гість";

  return (
    <div className={style.wrapUserInfo}>
      <div className={style.wrapImageFromName}>
        {!!user && <ButtonSignOut />}
        {!user && <GoPerson size={24} />}

        <div>
          <p>{userName}</p>
          <p>{emailUser}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationPerson;
