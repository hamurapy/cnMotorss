import React from "react";
import Link from "next/link";
import styles from "./contact.module.css";
import PhoneIcon from "@/components/layout/PhoneIcon";

function ContactPage(): JSX.Element {
  return (
    <div className={styles.contentBlock}>
      <h1>Контакты</h1>
      <div className={styles.twoColumn}>
        <div className={styles.side}>
          <div className={styles.contactBlock}>
            <p>
              Если у Вас есть вопросы, свяжитесь с нами по форме обратной связи,
              или по телефону
            </p>
            <div className={styles.phone}>
              <PhoneIcon />
              <Link className={styles.phoneLink} href="tel: +79215555578">
                +7 (921) 555-55-78
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.side}>
          <form className={styles.contactForm}>
            <input type="text" placeholder="Ваше Имя" />
            <input type="text" placeholder="Ваш E-mail" />
            <input type="text" placeholder="Ваш телефон" />
            <textarea placeholder="Ваше сообщениие" />
            <div className={styles.btnPosition}>
              <button>Отправить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
