import React from "react";
import styles from "./home.module.css";

function Welcome(): JSX.Element {
  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.headerTitle}>
          Продажа Авто
          <br />с пробегом
        </h1>
        <form className={styles.formHeader}>
          <input type="text" placeholder="Ваше Имя:" />
          <input type="email" placeholder="Ваш Email:" />
          <input type="tel" placeholder="Ваш номер телефона:" />
          <div className="btnPosition">
            <button>Отправить заявку</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Welcome;
