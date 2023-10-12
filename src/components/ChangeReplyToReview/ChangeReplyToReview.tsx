"use client";
import { FC } from "react";
import style from "./ChangeReplyToReview.module.css";
import { showSuccess, showNotifyFailure } from "@/services/notification";
import { changeReplyToReview } from "@/services/serverActionHttp";

interface IProps {
  reviewId: number;
  replyReview: IReplyReview;
}
const ChangeReplyToReview: FC<IProps> = ({ reviewId, replyReview }) => {
  const { isPublication, content, id } = replyReview;

  const handleOpenModal = async () => {
    const newReply = {
      data: {
        isPublication: !isPublication,
        content,
      },
    };

    const result = await changeReplyToReview(
      String(reviewId),
      String(id),
      newReply
    );

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

export default ChangeReplyToReview;
