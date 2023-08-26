/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Car } from "./catalog.types"
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import styles from './catalog.module.css'
import Link from "next/link"
import { deleteCar } from '../account/redux/carsSlice';
import { RootState } from "@/store";

export default function CatalogPage({ cars }: { cars: Car[] }): JSX.Element {
  const dispatch = useAppDispatch();
  const { admin } = useSelector((store: RootState) => store.auth.user);

  const itemsPerPage = 3; // Количество машин на странице

  const initialCars = cars; // Сохраняем параметр в другой переменной
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCars, setDisplayedCars] = useState(initialCars.slice(0, itemsPerPage)); 

  const handlePageChange = async (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Отправляем запрос на сервер для получения машин на указанной странице
    const res = await fetch(`http://localhost:4000/api/cars?startIndex=${startIndex}&endIndex=${endIndex}`);
    const newCars = await res.json();
    
    setDisplayedCars(newCars); 
    setCurrentPage(page);
  };

  const delCar = (carId): void => {
    dispatch(deleteCar(Number(carId)));
    // window.location.reload()
  };
  return (
    <div className={styles.contentBlock}>

      <ul className={styles.carsBlock}>
        {displayedCars.map((car) => (
          <li className={styles.listItem} key={car.id}>
          <Link href={`/car/${car.id}`}>
            <div className={styles.infoBlock}>
              <span className={styles.model}>
                {car.brand} {car.model}
              </span>
              <span className={styles.price}>{car.price} ₽</span>
            </div>
            <div className={styles.infoItems}>
              <span>{car.year}</span>
              <span>{car.mileage} км</span>
              <span>
                {car.power} л.с./{car.engine}
              </span>
              <span>{car.driveUnit}</span>
              <span>{car.transmission}</span>
            </div>
          </Link>
          {admin && (
            <div className={styles.infoBlock}>
              <button className={styles.change}>Изменить</button>
              <button
                className={styles.delete}
                onClick={() => delCar(car.id)}
              >
                Удалить
              </button>
            </div>
          )}
        </li>

        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Предыдущая
        </button>
        <span>Страница {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={cars.length === 0}>
          Следующая
        </button>
      </div>
    </div>
  );
}










 
