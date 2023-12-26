"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import MessageModal from "@/components/MessageModal/MessageModal";

interface ICartComponentHook {
  MessageComponent: JSX.Element; // or JSX.Element, depending on the type of Cart and Modal components
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setTextMessage: Dispatch<SetStateAction<string>>;
}

const useModalMessage = (): ICartComponentHook => {
  const [showModal, setShowModal] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const handlerCloseCard = () => {
    setShowModal(false);
    setTextMessage("");
  };

  const MessageComponent = (
    <>
      {showModal && (
        <Modal onClose={handlerCloseCard} isDark>
          <MessageModal onClose={handlerCloseCard} textMessage={textMessage} />
        </Modal>
      )}
    </>
  );

  return { MessageComponent, setShowModal, setTextMessage };
};

export default useModalMessage;
