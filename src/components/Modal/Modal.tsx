"use client";

import React, { FC, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal: FC<Props> = ({ children, onClose }) => {
  const handleKeyPress = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  // Check if document is available (i.e., running on the client side) before using createPortal
  if (typeof document !== "undefined") {
    return createPortal(
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modalContainer}>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <AiOutlineClose size="24px" />
          </button>
          {children}
        </div>
      </div>,
      document.getElementById("modal-root")!
    );
  } else {
    // Handle the case where document is not available (e.g., during SSR)
    return null;
  }
};
