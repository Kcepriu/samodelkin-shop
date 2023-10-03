"use client";

import { FC, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { SlLocationPin } from "react-icons/sl";
import BtnChooseLocation from "@/components/buttons/BtnChooseLocation/BtnChooseLocation";
import { Modal } from "@/components/Modal/Modal";
import SearchCity from "@/components/SearchCity/SearchCity";

const deliveryOptions = ["Нова пошта", "Укрпошта", "Самовивіз"];
interface Location {
  latitude: number | null;
  longitude: number | null;
}

const Checkout: FC = () => {
  const [currentCity, setCurrentCity] = useState("");
  const [selectedOption, setSelectedOption] = useState(" ");
  const [isShowDelivery, setIsShowDelivery] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Отримати геолокацію користувача
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({ latitude, longitude });
      });
    } else {
      console.error("Геолокація не підтримується браузером");
    }
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const toggleShowDelivery = () => {
    setIsShowDelivery((prevState) => !prevState);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <Modal onClose={closeModal}>
          <SearchCity />
        </Modal>
      )}

      <form className="px-2 md:px-3 lg:px-4">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <h1 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-semibold leading-7 text-gray-900">
              Оформлення замовлення
            </h1>
            <p className="mt-1 text-sm sm:text-xl lg:text-2xl font-semibold leading-7 text-gray-900">
              Ваші контактні дані
            </p>

            <div className="mt-10 p-2 md:p-3 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 bg-gray-100">
              <div className="">
                <label htmlFor="first-name" className={styles.label}>
                  Ім&apos;я <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  required
                  autoComplete="given-name"
                  className={styles.input}
                />
              </div>

              <div className="">
                <label htmlFor="middle-name" className={styles.label}>
                  По-батькові
                </label>

                <input
                  type="text"
                  name="middle-name"
                  id="middle-name"
                  autoComplete="family-name"
                  className={styles.input}
                />
              </div>

              <div className="">
                <label htmlFor="last-name" className={styles.label}>
                  Прізвище
                </label>

                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className={styles.input}
                />
              </div>

              <div className="">
                <label htmlFor="email" className={styles.label}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                  placeholder="example@example.com"
                  className={styles.input}
                />
              </div>

              <div className="">
                <label htmlFor="tel" className={styles.label}>
                  Телефон <span className="text-red-600">*</span>
                </label>
                <input
                  id="tel"
                  name="phone"
                  type="tel"
                  autoComplete="phone"
                  pattern="^\+38\(0[2-9]{1}[0-9]{1}\)\d{7}$"
                  placeholder="+38(___)_______"
                  maxLength={15}
                  required
                  className={styles.input}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="flex gap-1 items-center">
            <SlLocationPin />
            <p>
              Моє місто: <BtnChooseLocation text="Київ" action={openModal} />
            </p>
          </div>

          <BtnChooseLocation text="вибрати інше місто" action={openModal} />
        </div>

        <div className={styles.deliveryWrapper}>
          <div className="flex gap-3 items-center  w-full">
            <p>Спосіб доставки: </p>
            <button
              type="button"
              className="flex justify-center w-56 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={toggleShowDelivery}
            >
              {selectedOption}
              <svg
                className="ml-auto h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {isShowDelivery && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <ul className="py-1" role="none">
                {deliveryOptions.map((option) => (
                  <li key={option}>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => handleOptionChange(option)}
                      role="menuitem"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {selectedOption === "Нова пошта" && (
          <div className={styles.deliveryWrapper}>
            <div className="flex gap-3 items-center w-full">
              <p>Виберіть відділення: </p>
              <button
                type="button"
                className="flex justify-center w-56 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={toggleShowDelivery}
              >
                {selectedOption}
                <svg
                  className="ml-auto h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isShowDelivery && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <ul className="py-1" role="none">
                  {deliveryOptions.map((option) => (
                    <li key={option}>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => handleOptionChange(option)}
                        role="menuitem"
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-right">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
          >
            Оформити замовлення
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
