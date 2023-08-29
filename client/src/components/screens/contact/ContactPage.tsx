import React from "react";
import Image from "next/image";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import styles from "./contact.module.css";
import PhoneNumber from "../phoneNumber/PhoneNumber";

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
              <LocalPhoneIcon sx={{ fontSize: 35 }} />
              <div className={styles.phoneLink}>
                <PhoneNumber />
              </div>
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
