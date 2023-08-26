import React from "react";
import Layout from "@/app/layout";
import { Car } from "@/components/screens/catalog/catalog.types";
import styles from "@/components/screens/catalog/catalog.module.css";
import UpdateFormCar from "@/components/screens/account/UpdateCar";
import SingleCarSlider from "@/components/screens/catalog/SingleCarSlider";

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:4000/api/cars/ss'); 
  const carIds = await res.json();

  const paths = carIds.map((id: any) => { 
    return {
      params:  {id: id.toString()}
    };
  });

  return {
    paths,
    fallback: false
  };
};

export async function getStaticProps(context: { params: { id: number } }) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:4000/api/cars/${id}`);
  const cars = await res.json();
  return {
    props: {
      car: cars,
    },
  };
}

export default function CarPage({ car }: { car: Car }): JSX.Element {
  return (
    <Layout title={car.brand} description={""} keywords={""}>
      <div className="contentBlock">
        <h1>
          {car.brand} {car.model}
        </h1>
        <div className={styles.twoColumn}>
          <div className={styles.sidePhoto}>
            <SingleCarSlider photos={car.photos} />
          </div>
          <div className={styles.side}>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Марка:</p>
              <p>{car.brand}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Модель:</p>
              <p>{car.model}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Год выпуска:</p>
              <p>{car.year}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Цвет:</p>
              <p>{car.color}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Двигатель:</p>
              <p>
                {car.liters} л/{car.power} л.с./{car.engine}
              </p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Привод:</p>
              <p>{car?.transmission}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Руль:</p>
              <p>{car.wheel}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Пробег:</p>
              <p>{car.mileage} км</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Коробка:</p>
              <p>{car.driveUnit}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.carPrice}>Цена:</p>
              <p>{car.price} ₽</p>
            </div>
          </div>
        </div>
        {car.description ? (
          <>
            <p className={styles.carDescription}>Описание:</p>
            <p className={styles.description}>{car.description}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
}
