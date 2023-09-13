import React from "react";
import Image from "next/image";

function About(): JSX.Element {
  return (
    <>
      <Image
        className="carPhoto"
        src="/about-bg.png"
        alt="Продажа авто с пробегом"
        draggable={false}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority={true}
      />
      <div className="contentBlock" style={{ margin: "0 auto 5rem" }}>
        <h1>Авто с пробегом с собственных стоянок в Китае</h1>
        <p>
          У нас вы можете приобрести любой представленный на сайте автомобиль,
          узнать его состояние и полную историю.
        </p>
        <p>
          Наша компания уже более 10 лет ведет деятельность на рынке Китая, и
          благодаря многолетнему опыту, вы получаете лучший результат в
          кратчайшие сроки.
        </p>
        <p>Мы работаем строго по договору и в установленные сроки.</p>
        <p>
          Наши менеджеры ознакомят со всеми транспортными средствами, которые
          вас заинтересуют и помогут рассчитать конечную стоимость автомобиля в
          России.
        </p>
      </div>
    </>
  );
}

export default About;
