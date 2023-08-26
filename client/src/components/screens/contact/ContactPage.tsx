import React from "react";
import Link from "next/link";
import Image from "next/image";
import PhoneIcon from "@/components/layout/PhoneIcon";
import styles from "./contact.module.css";

function ContactPage(): JSX.Element {
  return (
    <div className="contentBlock">
      <h1>Контакты</h1>
      <div className={styles.twoColumn}>
        <div className={styles.side}>
          <div className={styles.contactBlock}>
            <Image
              src="/logo-black.svg"
              width={100}
              height={50}
              alt="Продажа авто с пробегом"
              draggable={false}
              priority={true}
            />
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
            <div className="btnPosition">
              <button>Отправить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
