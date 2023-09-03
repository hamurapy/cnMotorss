import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import PhoneCard from "./PhoneCard";
import styles from "./accountInfo.module.css";

function AccountInfo(): JSX.Element {
  const { user } = useSelector((store: RootState) => store.auth);
  const phones = useSelector((state: RootState) => state.phone.phoneList);

  const [modal, setModal] = useState(false);

  const handleOpen = () => {
    setModal((prev) => !prev);
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
      {user.admin && (
        <>
          <p>Телефон</p>
          <div>
            {phones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default AccountInfo;
