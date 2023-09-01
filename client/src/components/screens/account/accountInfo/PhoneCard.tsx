import React, { useState } from "react";
import { useAppDispatch } from "@/store";
import { updatePhone } from "../../phoneNumber/phone.slice";
import { PhoneType } from "../../phoneNumber/types/phone.type";
import styles from "./accountInfo.module.css";

const PhoneCard = ({ phone }: { phone: PhoneType }) => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [modalPhone, setModalPhone] = useState(false);

  const handleOpenPhone = () => {
    setModalPhone((prev) => !prev);
  };

  const handlePhone = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updatePhone({ id: phone.id, phoneNumber: phoneNumber }));
  };

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(e.target.value);
  };

  function formatPhoneNumber(phone: string) {
    const cleaned = ("" + phone).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return (
        "+" +
        match[1] +
        " (" +
        match[2] +
        ") " +
        match[3] +
        "-" +
        match[4] +
        "-" +
        match[5]
      );
    }
    return null;
  }

  return (
    <>
      <div>{phone.phoneNumber}</div>
      <button type="button" onClick={handleOpenPhone}>
        Редактировать
      </button>
      {modalPhone && (
        <form className={styles.smallForm} onSubmit={handlePhone}>
          <span>* Введите номер без пробелов и скобок</span>
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
            <button type="submit" onClick={handleOpenPhone}>
              Изменить
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default PhoneCard;
