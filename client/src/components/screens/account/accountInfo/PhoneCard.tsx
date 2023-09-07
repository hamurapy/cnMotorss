import React, { useState } from "react";
import { useAppDispatch } from "@/store";
import { updatePhone } from "../../phoneNumber/phone.slice";
import { PhoneType } from "../../phoneNumber/types/phone.type";
import styles from "./accountInfo.module.css";

const PhoneCard = ({ phone }: { phone: PhoneType }) => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState(phone.phoneNumber);

  const handlePhone = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updatePhone({ id: phone.id, phoneNumber: phoneNumber }));
  };

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <>
      <form className={styles.smallForm} onSubmit={handlePhone}>
        <div className={styles.plus}>
          <span>+</span>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="Введите номер"
          />
        </div>
        <div className="btnPosition">
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </>
  );
};

export default PhoneCard;
