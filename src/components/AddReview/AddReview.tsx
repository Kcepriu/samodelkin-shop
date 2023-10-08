"use client";
import { FC, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import Image from "next/image";
import ReviewCreateUpdate from "../ReviewCreateUpdate/ReviewCreateUpdate";
import { createProductReviews } from "@/services/httpClient";

import imgAddReview from "@/assets/icons/add_review.svg";
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

    const result = await createProductReviews(newReview);

    if (!result) {
      alert("Не вдалося створити відгук");
      return;
    }
    alert(`Відгук відправлено на модерацію id - ${result.data.id}`);
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
