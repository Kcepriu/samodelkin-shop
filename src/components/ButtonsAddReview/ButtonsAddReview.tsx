"use client";
import { FC, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import Image from "next/image";
import ReviewCreateUpdate from "../ReviewCreateUpdate/ReviewCreateUpdate";
import httpServices from "@/services/http";
import imgAddReview from "@/assets/icons/add_review.svg";
import style from "./ButtonsAddReview.module.css";

interface IProps {
  product: IProduct;
}
const ButtonsAddReview: FC<IProps> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddRevies = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlerCreatedReview = async () => {
    const newReview = {
      data: {
        firstName: "Serhii",
        secondName: "Kostiuchenko",
        content:
          "Monopoly is a classic board game that has been enjoyed by players of all ages for generations. It was first introduced in the early 20th century and has since become one of the most iconic and recognizable board games in the world. ",
        advantages: "Швидка доставка, якісний товар",
        disAdvantages: "Не виявлено",
        rating: 4,
        product: product.id,
      },
    };
    const result = await httpServices.createProductReviews(newReview);
    console.log("🚀 ~ result:", result);

    alert(
      result ? "Відгук відправлено на модерацію" : "Не вдалося створити відгук"
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

export default ButtonsAddReview;
