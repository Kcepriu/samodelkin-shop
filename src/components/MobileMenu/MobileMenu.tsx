"use client";

import React, { FC, useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";

import { PiXSquare } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";

import styles from "./MobileMenu.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export const MobileMenu: FC<Props> = ({ children, onClose, isOpen }) => {
  const isDark = false;

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(async () => {
    await setIsOpenModal(false);
    setTimeout(onClose, 500);
  }, [onClose]);

  const handleKeyPress = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleOverlayClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (evt.target === evt.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
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
      <div
        className={styles.overlay}
        onClick={handleOverlayClick}
        data-is-open={isOpenModal}
      >
        <div className={styles.container} onClick={handleOverlayClick}>
          <div className={styles.modalContainer} data-is-open={isOpenModal}>
            <button
              className={styles.modalCloseBtn}
              onClick={handleClose}
              data-is-dark={isDark}
            >
              {isDark ? (
                <IoCloseSharp size="24px" />
              ) : (
                <PiXSquare size="24px" />
              )}
            </button>
            {children}
          </div>
        </div>
      </div>,
      document.getElementById("modal-root")!
    );
  } else {
    // Handle the case where document is not available (e.g., during SSR)
    return null;
  }
};
