import React from "react";
import styles from "./home.module.css";

function Request(): JSX.Element {
  return (
    <section className={styles.request}>
      <h2>Отправить заявку</h2>
      <form className={styles.requestForm}>
        <input type="text" placeholder="Ваше Имя" />
        <input type="text" placeholder="Ваш E-mail" />
        <input type="text" placeholder="Ваш телефон" />
        <button>Отправить</button>
      </form>
    </section>
  );
}

export default Request;
