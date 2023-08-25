import React from "react";
import Image from "next/image";
import styles from "@/components/screens/contact/contact.module.css";

function About(): JSX.Element {
  return (
    <>
      <Image
        className={styles.aboutPhoto}
        src="/about-bg.png"
        alt="Продажа авто с пробегом"
        draggable={false}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority={true}
      />
      <div className={styles.aboutBlock}>
        <h1>Авто с пробегом с собственных стоянок в Китае</h1>
        <p className={styles.sideText}>
          У нас вы можете приобрести любой представленный на сайте автомобиль,
          узнать его состояние и полную историю.
        </p>
        <p className={styles.sideText}>
          Наша компания уже более 10 лет ведет деятельность на рынке Китая, и
          благодаря многолетнему опыту, вы получаете лучший результат в
          кратчайшие сроки.
        </p>
        <p className={styles.sideText}>
          Мы работаем строго по договору и в установленные сроки.
        </p>
        <p className={styles.sideText}>
          Наши менеджеры ознакомят со всеми транспортными средствами, которые
          вас заинтересуют и помогут рассчитать конечную стоимость автомобиля в
          России.
        </p>
      </div>
    </>
  );
}

export default About;
