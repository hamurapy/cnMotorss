import React, { useState } from "react";
import { useAppDispatch } from "@/store";
import { updatePhone } from "../../phoneNumber/phone.slice";
import { PhoneType } from "../../phoneNumber/types/phone.type";
import styles from "./accountInfo.module.css";
import EditIcon from "@mui/icons-material/Edit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const PhoneCard = ({ phone }: { phone: PhoneType }) => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState(phone.phoneNumber);
  const [modal, setModal] = React.useState(false);

  const handlePhone = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updatePhone({ id: phone.id, phoneNumber: phoneNumber }));
    setModal((prev) => !prev);
  };

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleModal = (): void => {
    setModal((prev) => !prev);
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
      <div className={styles.telBlock}>
        <div className={styles.telIcon}>
          <LocalPhoneIcon sx={{ fontSize: 30 }} />
        </div>
        {formatPhoneNumber(phone.phoneNumber)}{" "}
        <EditIcon onClick={handleModal} />
      </div>
      {modal && (
        <form className={styles.smallForm} onSubmit={handlePhone}>
          <p>Введите новый номер телефона</p>
          <div className={styles.plus}>
            <span>+</span>
            <input
              type="tel"
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
      )}
    </>
  );
};

export default PhoneCard;
