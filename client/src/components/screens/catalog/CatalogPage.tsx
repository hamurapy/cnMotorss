/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { Car } from "./catalog.types"
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import styles from './catalog.module.css'
import Link from "next/link"
import { deleteCar } from '../account/redux/carsSlice';
import { RootState } from "@/store";

export default function CatalogPage({ cars }: {cars: Car[]}) {
  const { admin } = useSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();

  const delCar = (carId): void => {
    dispatch(deleteCar(Number(carId)));
    // window.location.reload()
  };
  // useEffect(() => {
  //   async function getStaticProps() {
  //     const res = await fetch('http://localhost:4000/api/cars')
  //     const cars = await res.json()
  //     return {
  //       props: {
  //         cars,
  //       },
  //     }
  //   }
  // }, [cars]);

  return (
    <div className={styles.contentBlock}>
      <h1>Каталог</h1>
      <ul className={styles.carsBlock}>
        {cars.map((car) => (
          <li key={car.id}>
            <Link href={`/car/${car.id}`}>
            <div className={styles.imgBlock}>
              <Image
					      src={`http://localhost:4000${car.photos[0].img}`}
                alt={`${car.brand} ${car.model}`}
                priority={true}
                width={0}
                height={0}
                layout="fill"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				      />
            </div>
            <div className={styles.infoBlock}>
              <span>{car.brand}</span>
              <span>{car.model}</span>
            </div>
            </Link>
           { 1 && <div className={styles.infoBlock}>
              <button className={styles.change}>Изменить</button>
              <button className={styles.delete} onClick={()=>delCar(car.id)} >Удалить</button>
            </div> }
          </li>
        ))}
      </ul>
    </div>
  )
}
 
