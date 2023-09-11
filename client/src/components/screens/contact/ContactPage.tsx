import React, { useState } from "react";
import Image from "next/image";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import styles from "./contact.module.css";
import PhoneNumber from "../phoneNumber/PhoneNumber";
import { useAppDispatch } from "@/store";
import { addApplications } from "../account/application/application.slice";
import { sentApplication } from "../telegram/telegramContact/contact.slice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

function ContactPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isApplicationSent, setIsApplicationSent] = useState(false);

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
  
    const numericValue = inputValue.replace(/\D/g, '');
  
    let formattedValue = '';
    if (numericValue.length >= 1) {
      formattedValue += numericValue.substring(0, 1);
    }
    if (numericValue.length >= 2) {
      formattedValue += ' ' + numericValue.substring(1, 4);
    }
    if (numericValue.length >= 5) {
      formattedValue += ' ' + numericValue.substring(4, 7);
    }
    if (numericValue.length >= 8) {
      formattedValue += ' ' + numericValue.substring(7, 9);
    }
    if (numericValue.length >= 10) {
      formattedValue += ' ' + numericValue.substring(9, 11);
    }
  
    setPhone(formattedValue);
  };
  const handleMessage: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    const newApplication = {
      name,
      email,
      phone,
      message,
      status: "Новая",
    };
    dispatch(addApplications(newApplication));
    dispatch(sentApplication({ application: newApplication }));
    setIsApplicationSent(true);
  };

  return (
    <div className="contentBlock">
      <h1>Контакты</h1>
      <div className={styles.twoColumn}>
        <div className={styles.side}>
          <div className={styles.contactBlock}>
            <Image
              src="/logo-black.svg"
              width={100}
              height={50}
              alt="Продажа авто с пробегом"
              draggable={false}
              priority={true}
            />
            <p>
              Если у Вас есть вопросы, свяжитесь с нами по форме обратной связи,
              или по телефону
            </p>
            <div className={styles.phone}>
              <LocalPhoneIcon sx={{ fontSize: 35 }} />
              <div className={styles.phoneLink}>
                <PhoneNumber />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.side}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Ваше Имя"
              required
              onChange={handleName}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Ваш Email"
              required
              onChange={handleEmail}
            />
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Ваш телефон"
              required
              onChange={handlePhone}
            />
            <textarea
              id="message"
              name="message"
              value={message}
              placeholder="Ваше сообщениие"
              required
              onChange={handleMessage}
            />
            <div className="btnPosition">
              <button type="submit">Отправить</button>
            </div>
            {isApplicationSent && (
              <div className="app">Ваше сообщение отправлено!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
