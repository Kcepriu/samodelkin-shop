"use client";
import { FC } from "react";
import style from "./ChangeStatusReview.module.css";

import { showSuccess, showNotifyFailure } from "@/services/notification";
import { changeStatusReview } from "@/services/serverActionHttp";

interface IProps {
  review: IReview;
}
const ChangeStatusReview: FC<IProps> = ({ review }) => {
  const reviewsId = review.id;
  const prevStatus = review.attributes.isPublication;

  const handleOpenModal = async () => {
    const newReply = {
      data: {
        isPublication: !prevStatus,
      },
    };

    const result = await changeStatusReview(String(reviewsId), newReply);

    if (!result) {
      showNotifyFailure("Не вдалося Змінити статус");
      return;
    }
    showSuccess("Статус змінено.", "Дякуємо. Статус змінено успішно.");
  };

  return (
    <button type="button" onClick={handleOpenModal} className={style.button}>
      Change status
    </button>
  );
};

export default ChangeStatusReview;
