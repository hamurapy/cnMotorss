import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { useRouter } from "next/router";
import { login } from "./auth.slice";
import Image from "next/image";
import styles from "@/components/screens/auth/auth.module.css";

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, error } = useSelector((store: RootState) => store.auth);

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if ("email" in user) {
      router.push("/account");
    }
  }, [user]);

  return (
    <div className="contentBlock">
      <h1>Вход</h1>
      <div className={styles.adminBlock}>
        <Image
          src="/favicon.png"
          alt="Продажа авто с пробегом"
          draggable={false}
          width={100}
          height={100}
        />
        <form onSubmit={loginSubmit}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
          />
          <div className="btnPosition">
            <button type="submit">Войти</button>
          </div>
        </form>
        {error && (
          <div className={styles.error} style={{ display: "block" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
