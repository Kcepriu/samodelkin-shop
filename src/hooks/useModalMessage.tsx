"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Modal } from "@/components/Modal/Modal";
import MessageModal from "@/components/MessageModal/MessageModal";

interface ICartComponentHook {
  MessageComponent: JSX.Element; // or JSX.Element, depending on the type of Cart and Modal components
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setTextMessage: (headerMessage: string, textMessage?: string) => void;
}

const useModalMessage = (): ICartComponentHook => {
  const [showModal, setShowModal] = useState(false);
  const [contentMessage, setContentMessage] = useState({
    headerMessage: "",
    textMessage: "",
  });

  const setTextMessage = (headerMessage: string, textMessage: string = "") => {
    setContentMessage({ headerMessage, textMessage });
  };

  const handlerCloseCard = () => {
    setShowModal(false);
    setTextMessage("");
  };

    useEffect(() => {
      document.body.style.overflow = showModal ? "hidden" : "auto";
    }, [showModal]);

  const MessageComponent = (
    <>
      {showModal && (
        <Modal onClose={handlerCloseCard} isDark>
          <MessageModal
            onClose={handlerCloseCard}
            contentMessage={contentMessage}
          />
        </Modal>
      )}
    </>
  );

  return { MessageComponent, setShowModal, setTextMessage };
};

export default useModalMessage;
