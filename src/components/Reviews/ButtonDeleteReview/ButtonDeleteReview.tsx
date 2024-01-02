"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { PiTrash } from "react-icons/pi";
import ButtonWithIcon from "@/components/ButtonWithIcon/ButtonWithIcon";
import useModalMessage from "@/hooks/useModalMessage";
import { deleteReview } from "@/services/serverActionHttp";
import { showNotifyFailure } from "@/services/notification";
interface IProps {
  idReview: number;
}

const ButtonDeleteReview: FC<IProps> = ({ idReview }) => {
  const router = useRouter();

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
    router.refresh();
  };

  return (
    <>
      <ButtonWithIcon
        handleOnClick={handleDeleteReview}
        text=""
        Icon={PiTrash}
        size={24}
      />
      {MessageComponent}
    </>
  );
};

export default ButtonDeleteReview;
