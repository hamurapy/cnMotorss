import React, { useState } from "react";
import styles from "./account.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Registration from "@/pages/registration";

function AccountInfo(): JSX.Element {
  const [modal, setModal] = useState(false);
  const { user } = useSelector((store: RootState) => store.auth);

  const handleOpen = () => {
    setModal((prev) => !prev);
  };
  return (
    <>
      <h3 className={styles.accountTitle}>Аккаунт</h3>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <button className={styles.editBtn} type="button" onClick={handleOpen}>
        Редактировать
      </button>
      {modal && (
        <div className={styles.smallForm}>
          <form className={styles.accountForm}>
            <input type="text" placeholder="Имя" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Пароль" />
            <div className={styles.btnPosition}>
              <button type="submit">Изменить</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AccountInfo;
