import { FC } from "react";
import backgroundMessage from "@/assets/backgroundMessage.svg";
import style from "./MessageModal.module.css";

interface IProps {
  textMessage: string;
  onClose: () => void;
}
const MessageModal: FC<IProps> = ({ textMessage, onClose }) => {
  return (
    <div className={style.wrapWindow}>
      <div
        className={style.wrapMessage}
        style={{
          backgroundImage: `url(${backgroundMessage.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p>{textMessage}</p>
      </div>

      <button type="button" onClick={onClose} className={style.button}>
        Продовжити
      </button>
    </div>
  );
};

export default MessageModal;
