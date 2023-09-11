import { RootState, useAppDispatch } from "@/store";
import React, { useState } from "react";
import { addApplications } from "../account/application/application.slice";
import { sentApplication } from "@/components/screens/telegram/telegramHome/telegram.slice";
import { useSelector } from "react-redux";
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'

function ApplicationForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    const newApplication = {
      name,
      email,
      phone,
      status: "Новая",
    };
    dispatch(addApplications(newApplication));
    dispatch(sentApplication({ application: newApplication }));
    setIsApplicationSent(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Отправить</button>
        {isApplicationSent && (
          <div className="app">Заявка успешно отправлена!</div>
        )}
      </form>
    </>
  );
}

export default ApplicationForm;
