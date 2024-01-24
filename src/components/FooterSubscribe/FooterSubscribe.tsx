"use client";

import { FC, FormEvent, ChangeEvent, useState } from "react";
import { addSubscribe } from "@/services/serverActionHttp";
import useModalMessage from "@/hooks/useModalMessage";
import style from "./FooterSubscribe.module.css";

const FooterSubscribe: FC = () => {
  const [email, setEmail] = useState<string>("");
  const {
    MessageComponent,
    setShowModal: setShowModalMessage,
    setTextMessage,
  } = useModalMessage();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const result = await addSubscribe(email);

    if (!result) {
      setTextMessage("Помилка підписки.");
      setShowModalMessage(true);
      return;
    }

    setTextMessage("Підписку активовано.");
    setShowModalMessage(true);

    form.reset();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <form name="subscrabe" className={style.form} onSubmit={handleSubmit}>
      <label htmlFor="email" className={style.label}>
        Хочете дізнаватися першим про акції і знижки? Підпишіться на нашу
        розсилку
      </label>
      <input
        className={style.input}
        type="email"
        name="email"
        id="email"
        placeholder="email@email.com"
        required
        onChange={handleChange}
      />
      <button className={style.button} type="submit">
        Відправити
      </button>
      {MessageComponent}
    </form>
  );
};

export default FooterSubscribe;
