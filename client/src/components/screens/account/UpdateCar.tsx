import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Car, CarId } from "../catalog/catalog.types";
import { RootState, useAppDispatch } from "@/store";
import { deleteCar, loadCars, updateCar } from "./redux/carsSlice";
import Link from "next/link";
import CarSlider from "../home/CarSlider";
import { useSelector } from "react-redux";
import styles from "../catalog/catalog.module.css";
import UpdateForm from "./UpdateForm";

export default function UpdateCar({ car }: { car: Car }): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCars());
  }, [dispatch]);

  const cars = useSelector((state: RootState) => state.cars.cars);
  const carEdit = cars.find((car) => car.id === Number(car));

  const delCar = (carId: CarId): void => {
    dispatch(deleteCar(Number(carId)));
    // window.location.reload()
  };
  return (
    <>
      <h3>Редактировать</h3>
      <ul className={styles.carsBlock}>
        {cars.map((car) => (
          <li className={styles.listItem} key={car.id}>
            <Link href={`/car/${car.id}`}>
              <div className={styles.cardBlock}>
                <div className={styles.photoBlock}>
                  <CarSlider photos={car.photos} />
                </div>
                <div className={styles.infoBlock}>
                  <div className={styles.model}>
                    {car.brand} {car.model}
                  </div>
                  <div className={styles.price}>{car.price} ₽</div>
                  <div className={styles.year}>{car.year}</div>
                  <span className={styles.leftItem}>
                    {car.liters} л/{car.power} л.с./{car.engine}
                  </span>
                  <span className={styles.centerItem}>{car.driveUnit}</span>
                  <span className={styles.mileage}>{car.mileage} км</span>
                  <span className={styles.leftItem}>{car.transmission}</span>
                  <span className={styles.centerItem}>{car.color}</span>
                </div>
              </div>
            </Link>
            <div className={styles.infoBlock}>
              {/* <button className={styles.change}>Изменить</button> */}
              <UpdateForm carEdit={carEdit} />
              <button className={styles.delete} onClick={() => delCar(car.id)}>
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
