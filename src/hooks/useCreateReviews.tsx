"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal/Modal";
import { createProductReviews } from "@/services/serverActionHttp";
import { showNotifyFailure } from "@/services/notification";
import ReviewCreateUpdate from "@/components/ReviewCreateUpdate/ReviewCreateUpdate";
import useModalMessage from "./useModalMessage";

interface ICreateReviewsComponentHook {
  CreateReviewsComponent: JSX.Element; // or JSX.Element, depending on the type of Cart and Modal components
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface IProps {
  product: IProduct;
}
const useCreateReviews = ({ product }: IProps): ICreateReviewsComponentHook => {
  const router = useRouter();

  const {
    MessageComponent,
    setShowModal: setShowModalMessage,
    setTextMessage,
  } = useModalMessage();

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlerCreatedReview = async (values: IValuesFormCreateReview) => {
    const newReview = {
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        content: values.content,
        advantages: values.advantages,
        disAdvantages: values.disAdvantages,
        rating: values.rating,
        product: product.id,
      },
    };

    const result = await createProductReviews(newReview);

    if (!result) {
      showNotifyFailure("Не вдалося створити відгук");
      return;
    }

    await setShowModal(false);

    setTextMessage("Відгук створено", "Відгук зʼявиться на сайті після модерації адміністратором");
    setShowModalMessage(true);
    router.refresh();
  };

  const CreateReviewsComponent = (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ReviewCreateUpdate
            product={product}
            handlerOk={handlerCreatedReview}
            handleCancel={handleCloseModal}
          />
        </Modal>
      )}
      {MessageComponent}
    </>
  );

  return { CreateReviewsComponent, setShowModal };
};

export default useCreateReviews;
