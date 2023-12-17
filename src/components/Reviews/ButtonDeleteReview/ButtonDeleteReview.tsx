"use client";

import { FC } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import ButtonWithIcon from "@/components/ButtonWithIcon/ButtonWithIcon";
import { deleteReview } from "@/services/serverActionHttp";
import useModalMessage from "@/hooks/useModalMessage";
import { showNotifyFailure } from "@/services/notification";

interface IProps {
  idReview: number;
}

const ButtonDeleteReview: FC<IProps> = ({ idReview }) => {
  const {
    MessageComponent,
    setShowModal: setShowModalMessage,
    setTextMessage,
  } = useModalMessage();

  const handleDeleteReview = async () => {
    const result = await deleteReview(String(idReview));

    if (!result) {
      showNotifyFailure("Не вдалося видалити");
      return;
    }

    setTextMessage("Відгук видалено.");
    setShowModalMessage(true);
  };

  return (
    <>
      <ButtonWithIcon
        handleOnClick={handleDeleteReview}
        text=""
        Icon={RiDeleteBin2Line}
        size={18}
      />
      {MessageComponent}
    </>
  );
};

export default ButtonDeleteReview;
