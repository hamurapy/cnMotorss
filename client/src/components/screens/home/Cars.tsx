import React from "react";
import Link from "next/link";
import styles from "./home.module.css";
import { Car } from "../catalog/catalog.types";
import CarSlider from "./CarSlider";
import classNames from "classnames";

function Cars({ cars }: { cars: Car[] }): JSX.Element {
  return (
    <section>
      <h2>Каталог</h2>
      <ul className={styles.carsBlock}>
        {cars
          .map((car) => (
            <li key={car.id}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => window.open(`/car/${car.id}`, "_blank")}
              >
                <CarSlider photos={car.photos} />
                <div className={classNames(styles.infoBlock, styles.catBlock)}>
                  <span className={classNames(styles.model, styles.itemLeft)}>
                    {car.brand} {car.model}
                  </span>
                  <span className={classNames(styles.price, styles.itemRight)}>
                    {car.price} ¥
                  </span>
                  <span className={classNames(styles.items, styles.itemCenter)}>
                    {car.year}/{car.mileage} км
                  </span>
                </div>
              </div>
            </li>
          ))
          .slice(0, 8)}
      </ul>
      <Link className={styles.btnLink} href="/catalog">
        Весь каталог
      </Link>
    </section>
  );
}

export default Cars;
