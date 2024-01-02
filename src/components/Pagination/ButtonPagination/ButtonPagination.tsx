import { FC } from "react";
import { IconType } from "react-icons";
import style from "./ButtonPagination.module.css";

interface IProps {
  Icon: IconType;
  title: string;
  isReverse?: boolean;
}

const ButtonPagination: FC<IProps> = ({ Icon, title, isReverse = false }) => {
  return (
    <div className={style.button} data-is-reverse={isReverse}>
      <Icon size={16} />
      {title}
    </div>
  );
};

export default ButtonPagination;
