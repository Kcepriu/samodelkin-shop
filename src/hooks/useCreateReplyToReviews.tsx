"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal/Modal";
import ReplyCreateUpdate from "@/components/ReplyCreateUpdate/ReplyCreateUpdate";
import { createReplyToReviews } from "@/services/serverActionHttp";
import { showNotifyFailure } from "@/services/notification";
import useModalMessage from "./useModalMessage";

interface ReplyToReviewsComponentHook {
  ReplyToReviewsComponent: JSX.Element; // or JSX.Element, depending on the type of Cart and Modal components
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface IProps {
  review: IReview;
}
const useCreateReplyToReviews = ({
  review,
}: IProps): ReplyToReviewsComponentHook => {
  const router = useRouter();

  const reviewsId = review.id;
  const {
    MessageComponent,
    setShowModal: setShowModalMessage,
    setTextMessage,
  } = useModalMessage();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateReply = async (value: IValuesFormCreateReply) => {
    const newReply = {
      data: value,
    };

    const result = await createReplyToReviews(String(reviewsId), newReply);

    if (!result) {
      showNotifyFailure("Не вдалося створити відповідь");
      return;
    }

    await setShowModal(false);

    setTextMessage("Відповідь створено.");
    setShowModalMessage(true);
    router.refresh();
  };

  const ReplyToReviewsComponent = (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ReplyCreateUpdate
            handlerOk={handleCreateReply}
            handleCancel={handleCloseModal}
          />
        </Modal>
      )}
      {MessageComponent}
    </>
  );

  return { ReplyToReviewsComponent, setShowModal };
};

export default useCreateReplyToReviews;
