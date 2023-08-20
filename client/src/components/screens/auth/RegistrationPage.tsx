import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { registr } from './auth.slice';
import Image from 'next/image';
import styles from '@/components/screens/auth/auth.module.css'

function Registration(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { user, error } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    if ('email' in user) {
      // navigate('/');
      console.log('ok')
    }
  }, [user]);

  const registration = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(registr({ email, password }));
  };

  return (
    <div className={styles.contentBlock}>
      <h1>Регистрация</h1>
      <div className={styles.adminBlock}>
      <Image
				src="/favicon.png"
				alt="Продажа авто с пробегом"
				draggable={false}
        width={100}
        height={100}
			/>
      <form onSubmit={registration}>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <div className="errorBlock">{error}</div>
      </div>
    </div>
  );
}

export default Registration;
