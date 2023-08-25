import React from "react";
import Layout from "@/app/layout";
import Image from "next/image";
import { Car } from "@/components/screens/catalog/catalog.types";
import styles from "@/components/screens/catalog/catalog.module.css";
import UpdateFormCar from "@/components/screens/account/UpdateFormCar";
import SingleCarSlider from "@/components/screens/catalog/SingleCarSlider";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:4000/api/cars");
  const cars = await res.json();

  const paths = cars.map((car: { id: any }) => {
    return {
      params: { id: car.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
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
      <div className={styles.contentBlock}>
        <h1>
          {car.brand} {car.model}
        </h1>
        <div className={styles.twoColumn}>
          <div className={styles.side}>
            {/* <Image
					      src={`http://localhost:4000${car.photos[0].img}`}
                alt={`${car.brand} ${car.model}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                priority={true}
				      /> */}
            <SingleCarSlider photos={car.photos} />
          </div>
          <div className={styles.side}>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Марка:</p>
              <p className={styles.listDesription}>{car.brand}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Модель:</p>
              <p className={styles.listDesription}>{car.model}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Год выпуска:</p>
              <p className={styles.listDesription}>{car.year}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Цвет:</p>
              <p className={styles.listDesription}>{car.color}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Двигатель:</p>
              <p className={styles.listDesription}>
                {car.liters} л/{car.power} л.с./{car.engine}
              </p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Привод:</p>
              <p className={styles.listDesription}>{car?.transmission}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Руль:</p>
              <p className={styles.listDesription}>{car.wheel}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Пробег:</p>
              <p className={styles.listDesription}>{car.mileage} км</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.listName}>Коробка:</p>
              <p className={styles.listDesription}>{car.driveUnit}</p>
            </div>
            <div className={styles.sideInfo}>
              <p className={styles.price}>Цена:</p>
              <p className={styles.listDesription}>{car.price}</p>
            </div>
          </div>
        </div>
        {car.description ? (
          <>
            <h3 className={styles.carDescription}>Описание:</h3>
            <p>{car.description}</p>
          </>
        ) : (
          <></>
        )}
      </div>
      {car && <UpdateFormCar key={car?.id} car={car} />}
    </Layout>
  );
}
