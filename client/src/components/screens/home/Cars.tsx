import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import styles from '@/components/screens/catalog/catalog.module.css'
import { Car } from '../catalog/catalog.types';

function Cars({ cars}: {cars: Car[]}):JSX.Element {
  return (
    <section>
      <h2>Каталог</h2>
      <ul className={styles.carsBlock}>
        {cars.map((car) => (
          <li key={car.id}>
            <Link href={`/car/${car.id}`}>
            <div className={styles.imgBlock}>
              <Image
					      src={car['PhotoCars.img']}
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
          </li>
        )).slice(0, 8)}
      </ul>
      <Link className="btnLink" href="/catalog">Весь каталог</Link>
    </section>
  )
}

export default Cars