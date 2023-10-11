"use client";
import { FC, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import Image from "next/image";
import ReviewCreateUpdate from "../ReviewCreateUpdate/ReviewCreateUpdate";
import httpClientServices from "@/services/httpClient";

import imgAddReview from "@/assets/icons/add_review.svg";
import { showSuccess, showNotifyFailure } from "@/services/notification";
import style from "./AddReview.module.css";

interface IProps {
  product: IProduct;
}

const AddReview: FC<IProps> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddRevies = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlerCreatedReview = async (values: IValuesFormCreateReview) => {
    const newReview = {
      data: {
        firstName: values.userName,
        secondName: values.userName,
        content: values.content,
        advantages: values.advantages,
        disAdvantages: values.disAdvantages,
        rating: values.rating,
        product: product.id,
      },
    };

    const result = await httpClientServices.createProductReviews(newReview);

    if (!result) {
      showNotifyFailure("Не вдалося створити відгук");
      return;
    }
    showSuccess(
      "Відгук створено.",
      "Дякуємо за відгук. Ваш відгук відправлено на модерацію адміністратору сайту."
    );

    setShowModal(false);
  };

  return (
    <>
      <div>
        <button className={style.button} onClick={handleAddRevies}>
          Залишити відгук
          <Image
            className={style.image}
            src={imgAddReview}
            alt="star"
            height={24}
            width={24}
          />
        </button>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ReviewCreateUpdate
            product={product}
            handlerOk={handlerCreatedReview}
            handleCancel={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default AddReview;
