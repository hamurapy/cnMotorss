import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import PhoneCard from "./PhoneCard";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import AccountMenu from "../AccountMenu";
import {
  loadUser,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from "../../auth/user.slice";
import styles from "./accountInfo.module.css";

function AccountInfo(): JSX.Element {
  const users = useSelector((state: RootState) => state.user.users);
  const phones = useSelector((state: RootState) => state.phone.phoneList);

  const [modalName, setModalName] = useState(false);
  const [modalEmail, setModalEmail] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  const [name, setName] = useState(users[0]?.name);
  const [email, setEmail] = useState(users[0]?.email);
  const [password, setPassword] = useState(users[0]?.password);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      setName(users[0]?.name);
      setEmail(users[0]?.email);
      setPassword(users[0]?.password);
    }
  }, [users]);

  const handleOpenName = (): void => {
    setModalName((prev) => !prev);
  };

  const handleOpenEmail = (): void => {
    setModalEmail((prev) => !prev);
  };

  const handleOpenPassword = (): void => {
    setModalPassword((prev) => !prev);
  };

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setName(e.target.value);
  };

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setEmail(e.target.value);
  };

  const handlePassword: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ): void => {
    setPassword(e.target.value);
  };

  const updateName: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    dispatch(
      updateUserName({
        id: users[0].id,
        name,
      })
    );
    setModalName((prev) => !prev);
  };

  const updateEmail: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    dispatch(
      updateUserEmail({
        id: users[0].id,
        email,
      })
    );
    setModalEmail((prev) => !prev);
  };

  const updatePassword: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    dispatch(
      updateUserPassword({
        id: users[0].id,
        password,
      })
    );
    setModalPassword((prev) => !prev);
  };

  return (
    <>
      {users.map((user) => (
        <div className="accountContent" key={user.id}>
          <AccountMenu />
          <div className="accountWrap">
            <h3>Аккаунт</h3>
            <div className={styles.accountBlock}>
              <div className={styles.accountPhotoBlock}>
                <Image
                  src="/favicon.png"
                  width={100}
                  height={100}
                  alt="CN MOTORS"
                  draggable={false}
                  priority={false}
                />
              </div>
              <div className={styles.accountItemsBlock}>
                <div className={styles.accountItemBlock}>Имя: {user.name}</div>
                <div className={styles.accountItemBlock}>
                  E-mail: {user.email}
                </div>
                <div className={styles.accountItemBlock}>
                  Пароль: *** <EditIcon onClick={handleOpenPassword} />
                </div>
              </div>
            </div>
            {modalName && (
              <div className={styles.smallForm}>
                <form onSubmit={updateName}>
                  <label>Введите имя</label>
                  <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={handleName}
                  />
                  <button type="submit">Сохранить</button>
                </form>
              </div>
            )}
            {modalEmail && (
              <div className={styles.smallForm}>
                <form onSubmit={updateEmail}>
                  <label>Введите e-mail</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                  />
                  <button type="submit">Сохранить</button>
                </form>
              </div>
            )}
            {modalPassword && (
              <div className={styles.smallForm}>
                <form onSubmit={updatePassword}>
                  <label>Введите пароль</label>
                  <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePassword}
                  />
                  <button type="submit">Сохранить</button>
                </form>
              </div>
            )}
            {user.admin && (
              <>
                <hr />
                <div>
                  {phones.map((phone) => (
                    <PhoneCard key={phone.id} phone={phone} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default AccountInfo;
