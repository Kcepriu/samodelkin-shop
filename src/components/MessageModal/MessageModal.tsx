import { FC } from "react";
import backgroundMessage from "@/assets/backgroundMessage.svg";
import style from "./MessageModal.module.css";

interface IProps {
  contentMessage: {
    headerMessage: string;
    textMessage: string;
  };

  onClose: () => void;
}
const MessageModal: FC<IProps> = ({ contentMessage, onClose }) => {
  const { headerMessage, textMessage } = contentMessage;

  return (
    <div className={style.wrapWindow}>
      <div
        className={style.wrapMessage}
        style={{
          backgroundImage: `url(${backgroundMessage.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className={style.content}>
          {!!headerMessage && <h2 className={style.header}>{headerMessage}</h2>}
          {!!textMessage && <p>{textMessage}</p>}
        </div>
      </div>

      <button type="button" onClick={onClose} className={style.button}>
        Продовжити покупки
      </button>
    </div>
  );
};

export default MessageModal;
