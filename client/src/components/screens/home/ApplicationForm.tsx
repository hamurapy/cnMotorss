import { useAppDispatch } from "@/store";
import React, { useState } from "react";
import { addApplications } from "../account/application/application.slice";
import { sentApplication } from "@/components/screens/telegram/telegramHome/telegram.slice";

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
    setPhone(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    const newApplication = {
      name,
      email,
      phone,
    };
    dispatch(addApplications(newApplication));
    dispatch(sentApplication({ application: newApplication }));
    setIsApplicationSent(true);
  };

  return (
    <div>
      {isApplicationSent ? (
        <div>Заявка отправлена</div> 
      ) : (
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
        type="tel"
        id="phone"
        name="phone"
        value={phone}
        placeholder="Ваш телефон"
        required
        onChange={handlePhone}
      />
      <button type="submit">Отправить заявку</button>
    </form>
    )}
    </div>
  );
}

export default ApplicationForm;
