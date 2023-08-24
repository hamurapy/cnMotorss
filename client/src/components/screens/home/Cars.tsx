import React from 'react'
import Link from 'next/link';
import styles from './home.module.css'
import { Car } from '../catalog/catalog.types';
import CarSlider from './CarSlider';

function Cars({ cars }: { cars: Car[] }): JSX.Element {

  return (
    <section>
      <h2>Каталог</h2>
      <ul className={styles.carsBlock}>
        {cars.map((car) => (
          <li key={car.id}>
            <Link href={`/car/${car.id}`}>
              <CarSlider photos={car.photos}/>
              <div className={styles.infoBlock}>
                <span className={styles.price}>{car.price} ₽</span>
                <span className={styles.model}>{car.brand} {car.model}</span>
                <span className={styles.items}>{car.year}/{car.mileage} км</span>
            </div>            
            </Link>
          </li>
        )).slice(0, 8)}
      </ul>
      <Link className="btnLink" href="/catalog">Весь каталог</Link>
      </section>
  )
}

export default Cars