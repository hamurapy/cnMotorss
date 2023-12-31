import React, { useState } from "react";
import { useAppDispatch } from "@/store";
import {
  updateAdres,
  updateGoogle,
  updatePhone,
  updateTelegram,
  updateWhatsapp,
  updateYandex,
} from "../../phoneNumber/phone.slice";
import { PhoneType } from "../../phoneNumber/types/phone.type";
import styles from "./accountInfo.module.css";
import EditIcon from "@mui/icons-material/Edit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GoogleIcon from "@mui/icons-material/Google";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";

const PhoneCard = ({ phone }: { phone: PhoneType }) => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = React.useState(phone.phoneNumber);
  const [adres, setAdres] = React.useState(phone.adres);
  const [whatsapp, setWhatsapp] = React.useState(phone.whatsapp);
  const [telegram, setTelegram] = React.useState(phone.telegram);
  const [yandex, setYandex] = React.useState(phone.yandex);
  const [google, setGoogle] = React.useState(phone.google);
  const [modalPhone, setModalPhone] = React.useState(false);
  const [modalAdres, setModalAdres] = React.useState(false);
  const [modalWhatsapp, setModalWhatsapp] = React.useState(false);
  const [modalTelegram, setModalTelegram] = React.useState(false);
  const [modalYandex, setModalYandex] = React.useState(false);
  const [modalGoogle, setModalGoogle] = React.useState(false);

  const handlePhone = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updatePhone({ id: phone.id, phoneNumber: phoneNumber }));
    setModalPhone((prev) => !prev);
  };

  const handleAdres = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateAdres({ id: phone.id, adres: adres }));
    setModalAdres((prev) => !prev);
  };

  const handleWhatsapp = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateWhatsapp({ id: phone.id, whatsapp: whatsapp }));
    setModalWhatsapp((prev) => !prev);
  };

  const handleTelegram = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateTelegram({ id: phone.id, telegram: telegram }));
    setModalTelegram((prev) => !prev);
  };

  const handleYandex = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateYandex({ id: phone.id, yandex: yandex }));
    setModalYandex((prev) => !prev);
  };

  const handleGoogle = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateGoogle({ id: phone.id, google: google }));
    setModalGoogle((prev) => !prev);
  };

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAdresChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAdres(e.target.value);
  };

  const handleWhatsappChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setWhatsapp(e.target.value);
  };

  const handleTelegramChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setTelegram(e.target.value);
  };

  const handleYandexChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setYandex(e.target.value);
  };

  const handleGoogleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setGoogle(e.target.value);
  };

  const handleModalPhone = (): void => {
    setModalPhone((prev) => !prev);
  };

  const handleModalAdres = (): void => {
    setModalAdres((prev) => !prev);
  };

  const handleModalWhatsapp = (): void => {
    setModalWhatsapp((prev) => !prev);
  };

  const handleModalTelegram = (): void => {
    setModalTelegram((prev) => !prev);
  };

  const handleModalYandex = (): void => {
    setModalYandex((prev) => !prev);
  };

  const handleModalGoogle = (): void => {
    setModalGoogle((prev) => !prev);
  };

  function formatPhoneNumber(phone: string | undefined) {
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
          <LocationOnIcon sx={{ fontSize: 30 }} />
        </div>
        {phone.adres}
        <EditIcon onClick={handleModalAdres} />
      </div>
      {modalAdres && (
        <form className={styles.smallForm} onSubmit={handleAdres}>
          <label>Введите адрес</label>
          <div className={styles.plus}>
            <input
              type="text"
              id="adres"
              name="adres"
              value={adres}
              onChange={handleAdresChange}
              placeholder="Введите адрес"
            />
          </div>
          <div className="btnPosition">
            <button type="submit">Сохранить</button>
          </div>
        </form>
      )}
      <div className={styles.telBlock}>
        <div className={styles.telIcon}>
          <LocalPhoneIcon sx={{ fontSize: 30 }} />
        </div>
        {formatPhoneNumber(phone.phoneNumber)}
        <EditIcon onClick={handleModalPhone} />
      </div>
      {modalPhone && (
        <form className={styles.smallForm} onSubmit={handlePhone}>
          <label>Введите новый номер телефона</label>
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
      <div className={styles.telBlock}>
        <div className={styles.telIcon}>
          <WhatsAppIcon sx={{ fontSize: 30 }} />
        </div>
        {phone.whatsapp}
        <EditIcon onClick={handleModalWhatsapp} />
      </div>
      {modalWhatsapp && (
        <form className={styles.smallForm} onSubmit={handleWhatsapp}>
          <label>Введите номер Whatsapp</label>
          <div className={styles.plus}>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChange={handleWhatsappChange}
              placeholder="Введите номер Whatsapp"
            />
          </div>
          <div className="btnPosition">
            <button type="submit">Сохранить</button>
          </div>
        </form>
      )}
      <div className={styles.telBlock}>
        <div className={styles.telIcon}>
          <TelegramIcon sx={{ fontSize: 30 }} />
        </div>
        {phone.telegram}
        <EditIcon onClick={handleModalTelegram} />
      </div>
      {modalTelegram && (
        <form className={styles.smallForm} onSubmit={handleTelegram}>
          <label>Введите Telegram</label>
          <div className={styles.plus}>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={telegram}
              onChange={handleTelegramChange}
              placeholder="Введите Telegram"
            />
          </div>
          <div className="btnPosition">
            <button type="submit">Сохранить</button>
          </div>
        </form>
      )}
      <div className={styles.telBlock}>
        <div className={styles.telIcon}>
          <svg
            width="30"
            height="30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <path
              d="M20,0A20,20,0,1,0,40,20,20,20,0,0,0,20,0Zm6.7,31.86H22.6V11.33H20.75c-3.39,0-5.17,1.72-5.17,4.25,0,2.86,1.23,4.2,3.76,5.92l2.09,1.41-6,9H10.94l5.39-8c-3.1-2.22-4.84-4.38-4.84-8,0-4.58,3.19-7.7,9.24-7.7h6Z"
              transform="translate(-0.04)"
            />
          </svg>
        </div>
        {phone.yandex}
        <EditIcon onClick={handleModalYandex} />
      </div>
      {modalYandex && (
        <form className={styles.smallForm} onSubmit={handleYandex}>
          <label>Введите ключ</label>
          <div className={styles.plus}>
            <input
              type="text"
              id="yandex"
              name="yandex"
              value={yandex}
              onChange={handleYandexChange}
              placeholder="Введите ключ"
            />
          </div>
          <div className="btnPosition">
            <button type="submit">Сохранить</button>
          </div>
        </form>
      )}
      <div className={styles.telBlock}>
        <div className={styles.telIcon}>
          <GoogleIcon sx={{ fontSize: 30 }} />
        </div>
        {phone.google}
        <EditIcon onClick={handleModalGoogle} />
      </div>
      {modalGoogle && (
        <form className={styles.smallForm} onSubmit={handleGoogle}>
          <label>Введите ключ</label>
          <div className={styles.plus}>
            <input
              type="text"
              id="google"
              name="google"
              value={google}
              onChange={handleGoogleChange}
              placeholder="Введите ключ"
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
