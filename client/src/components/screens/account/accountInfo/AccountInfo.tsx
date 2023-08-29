import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import styles from "./accountInfo.module.css";
import PhoneNumber from "../../phoneNumber/PhoneNumber";
import { updatePhone } from "../../phoneNumber/phone.slice";
import PhoneType from "../../phoneNumber/types/phone.type";
import PhoneCard from "./PhoneCard";

function AccountInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const phones = useSelector((state: RootState) => state.phone.phoneList);

  const [modal, setModal] = useState(false);
  const [modalPhone, setModalPhone] = useState(false);

  const handleOpen = () => {
    setModal((prev) => !prev);
  };
  const handleOpenPhone = () => {
    setModalPhone((prev) => !prev);
  };

  return (
    <>
      <h3>Аккаунт</h3>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <button className={styles.editBtn} type="button" onClick={handleOpen}>
        Редактировать
      </button>
      {modal && (
        <div className={styles.smallForm}>
          <form>
            <input type="text" placeholder="Имя" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Пароль" />
            <div className="btnPosition">
              <button type="submit">Изменить</button>
            </div>
          </form>
        </div>
      )}
      <p>Телефон</p>
      <div>
        {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
      {/* <button
        className={styles.editBtn}
        type="button"
        onClick={handleOpenPhone}
      >
        Редактировать
      </button> */}
      {/* {modalPhone && (
        
      )} */}
    </>
  );
}

export default AccountInfo;
