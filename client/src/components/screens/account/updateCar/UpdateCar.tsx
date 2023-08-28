import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store";
import { loadCars } from "../types/cars.slice";
import { useSelector } from "react-redux";
import UpdateCard from "./UpdateCard";
import styles from "./updateCar.module.css";

export default function UpdateCar(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCars());
  }, [dispatch]);

  const cars = useSelector((state: RootState) => state.cars.cars);

  return (
    <>
      <h3>Редактировать</h3>
      <ul className={styles.carsBlock}>
        {cars.map((car) => (
          <UpdateCard key={car.id} car={car} />
        ))}
      </ul>
    </>
  );
}
