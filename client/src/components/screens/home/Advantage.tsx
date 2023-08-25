import React from "react";
import Image from "next/image";
import styles from "./home.module.css";
import RobotIcon from "./icons/RobotIcon";
import Price from "./icons/PriceIcon";
import CarIcon from "./icons/CarIcon";
import ScrewIcon from "./icons/ScrewIcon";

function Advantage(): JSX.Element {
  return (
    <section>
      <h2>Наши преимущества</h2>
      <div className={styles.advantage}>
        <div className={styles.advantageItem}>
          <RobotIcon />
          <p>Помощь в выборе авто согласно вашим требованиям и бюджету</p>
        </div>
        <div className={styles.advantageItem}>
          <CarIcon />
          <p>Собственные стоянки в нескольких городах Китая</p>
        </div>
        <div className={styles.advantageItem}>
          <Price />
          <p>Предоставляем полный фотоотчет и историю транспортного средства</p>
        </div>
        <div className={styles.advantageItem}>
          <ScrewIcon />
          <p>Доставка транспортного средства в течение 25 дней</p>
        </div>
      </div>
    </section>
  );
}

export default Advantage;
