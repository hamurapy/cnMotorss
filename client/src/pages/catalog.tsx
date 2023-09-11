import React, { useState } from "react";
import Layout from "@/app/layout";
import CatalogPage from "@/components/screens/catalog/CatalogPage";
import { Car } from "@/components/screens/catalog/catalog.types";

export async function getStaticProps() {
  const startIndex = 0;
  const endIndex = 20;

  const res = await fetch(
    `http://localhost:4000/api/cars?startIndex=${startIndex}&endIndex=${endIndex}`
  );

  const data = await res.json();
  const carsWithPhotos = data.carsWithPhotos;
  const carsBrandAndModel = data.carsBrandAndModel;

  return {
    props: {
      carsWithPhotos,
      carsBrandAndModel,
    },
  };
}

export default function Catalog({
  carsWithPhotos,
  carsBrandAndModel,
}: {
  carsWithPhotos: Car[];
  carsBrandAndModel: Car[];
}): JSX.Element {
  return (
    <Layout
      title={"Каталог"}
      description={
        "Каталог машин с пробегом с собственных стоянок в Китае. У нас вы можете купить машину с пробегом в России."
      }
      keywords={
        "авто продажа машин с пробегом, бу продажа машин с пробегом, продажа машин с пробегом цены, россия продажа машина пробег, продажа машин с пробегом в москве, продажа легковых машин с пробегом, купить машину с пробегом недорого, купить машина бу с пробегом, купить машину с пробегом в москве, купить машину с пробегом без посредников, купить машину с пробегом с фото, машины купить недорого с пробегом"
      }
    >
      <CatalogPage
        cars={carsWithPhotos}
        carsBrandAndModel={carsBrandAndModel}
      />
    </Layout>
  );
}
