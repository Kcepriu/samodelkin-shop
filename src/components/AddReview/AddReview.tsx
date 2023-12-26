"use client";
import { FC } from "react";

import { PiChatDotsLight } from "react-icons/pi";
import useCreateReviews from "@/hooks/useCreateReviews";
import style from "./AddReview.module.css";

interface IProps {
  product: IProduct;
}

const AddReview: FC<IProps> = ({ product }) => {
  const { CreateReviewsComponent, setShowModal } = useCreateReviews({
    product,
  });

  const handleCreateReview = () => {
    setShowModal(true);
  };

  return (
    <>
      <div>
        <button className={style.button} onClick={handleCreateReview}>
          Залишити відгук
          <PiChatDotsLight size={24} />
        </button>
      </div>
      {CreateReviewsComponent}
    </>
  );
};

export default AddReview;
