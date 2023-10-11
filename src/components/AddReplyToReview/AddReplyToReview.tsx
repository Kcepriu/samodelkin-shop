"use client";
import { FC, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import ReplyCreateUpdate from "../ReplyCreateUpdate/ReplyCreateUpdate";
import { showSuccess, showNotifyFailure } from "@/services/notification";
import httpClientServices from "@/services/httpClient";
import style from "./AddReplyToReview.module.css";

interface IProps {
  reviewsId: number;
}
const AddReplyToReview: FC<IProps> = ({ reviewsId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateReply = async (value: IValuesFormCreateReply) => {
    const newReply = {
      data: value,
    };

    const result = await httpClientServices.createReplyForReviews(
      String(reviewsId),
      newReply
    );

    if (!result) {
      showNotifyFailure("Не вдалося створити відповідь");
      return;
    }
    showSuccess(
      "Відповідь створено.",
      "Дякуємо за відповідь. Ваша відповідь відправлена на модерацію адміністратору сайту."
    );

    setShowModal(false);
  };

  return (
    <>
      <button type="button" onClick={handleOpenModal} className={style.button}>
        Відповісти
      </button>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ReplyCreateUpdate
            handlerOk={handleCreateReply}
            handleCancel={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default AddReplyToReview;
