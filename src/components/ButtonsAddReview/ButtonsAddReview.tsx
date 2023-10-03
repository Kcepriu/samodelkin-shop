"use client";
import { FC, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import ReviewCreateUpdate from "../ReviewCreateUpdate/ReviewCreateUpdate";

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

  const handlerCreatedReview = () => {
    console.log("handlerCreatedReview");
    setShowModal(false);
  };

  return (
    <>
      <div>
        <button onClick={handleAddRevies}>Залишити відгук</button>
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
