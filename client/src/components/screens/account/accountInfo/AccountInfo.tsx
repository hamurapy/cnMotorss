import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import PhoneCard from "./PhoneCard";
import Image from "next/image";
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
      <div className={styles.accountBlock}>
        <div className={styles.accountPhotoBlock}>
          <Image
            src="/favicon.png"
            width={100}
            height={100}
            alt="CN MOTORS"
            draggable={false}
            priority={true}
          />
        </div>
        <div className={styles.accountItemBlock}>Имя: {user.name}</div>
        <div className={styles.accountItemBlock}>E-mail: {user.email}</div>
      </div>
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
          <h3>Телефон</h3>
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
