import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/app/layout";

function Sitemap(): JSX.Element {
  return (
    <>
      <Layout
        title={"Карта сайта"}
        description={
          "Карта сайта CN Motors. Продажа авто с пробегом с собственных стоянок в Китае. У нас вы можете купить машину с пробегом в России."
        }
        keywords={
          "авто продажа машин с пробегом, бу продажа машин с пробегом, продажа машин с пробегом цены, россия продажа машина пробег, продажа машин с пробегом в москве, продажа легковых машин с пробегом, купить машину с пробегом недорого, купить машина бу с пробегом, купить машину с пробегом в москве, купить машину с пробегом без посредников, купить машину с пробегом с фото, машины купить недорого с пробегом"
        }
      >
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
          <h1>Карта сайта</h1>
          <ul style={{ fontWeight: "300" }}>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>
              <Link href="/catalog">Каталог</Link>
            </li>
            <li>
              <Link href="/about">О нас</Link>
            </li>
            <li>
              <Link href="/contact">Контакты</Link>
            </li>
            <li>
              <Link href="/">Политика конфеденциальности</Link>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
}

export default Sitemap;
