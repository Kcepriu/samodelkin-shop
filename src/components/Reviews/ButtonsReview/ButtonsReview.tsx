"use client";
import { FC } from "react";
import ButtonWithIcon from "@/components/ButtonWithIcon/ButtonWithIcon";
import { PiCaretCircleRight, PiCaretCircleDown } from "react-icons/pi";

import useCreateReplyToReviews from "@/hooks/useCreateReplyToReviews";
import useModalMessage from "@/hooks/useModalMessage";

import { showNotifyFailure } from "@/services/notification";
import { changeStatusReview } from "@/services/serverActionHttp";
import style from "./ButtonsReview.module.css";

interface IProps {
  review: IReview;
}

const ButtonsReview: FC<IProps> = ({ review }) => {
  const { id: reviewsId, attributes } = review;

  const { ReplyToReviewsComponent, setShowModal } = useCreateReplyToReviews({
    review: review,
  });
  const {
    MessageComponent,
    setShowModal: setShowModalMessage,
    setTextMessage,
  } = useModalMessage();

  const handleCreateReply = () => {
    setShowModal(true);
  };

  const handleEnableDisableReview = async () => {
    const newReply = {
      data: {
        isPublication: !review.attributes.isPublication,
      },
    };

    const result = await changeStatusReview(String(reviewsId), newReply);

    if (!result) {
      showNotifyFailure("Не вдалося Змінити статус");
      return;
    }
    review.attributes.isPublication = !review.attributes.isPublication;
    setTextMessage("Статус змінено.");
    setShowModalMessage(true);
  };

  return (
    <div className={style.wrapModerator}>
      <ButtonWithIcon
        Icon={PiCaretCircleRight}
        handleOnClick={handleCreateReply}
        text="Відповісти"
      />
      <ButtonWithIcon
        Icon={PiCaretCircleDown}
        handleOnClick={handleEnableDisableReview}
        text={attributes.isPublication ? "Деактивувати" : "Схвалити"}
      />
      {ReplyToReviewsComponent}
      {MessageComponent}
    </div>
  );
};

export default ButtonsReview;
