import { FC } from "react";
import { IconType } from "react-icons";
import style from "./IconWithCount.module.css";

interface IProps {
  Icon: IconType;
  sizeIcon: number;
  className: string;
  count?: number;
}

const IconWithCount: FC<IProps> = ({
  Icon,
  sizeIcon,
  className,
  count = 0,
}) => {
  return (
    <div className={style.wrapElement}>
      <Icon size={sizeIcon} className={className} />
      {count > 0 && <p className={style.textCount}>{count}</p>}
    </div>
  );
};

export default IconWithCount;
