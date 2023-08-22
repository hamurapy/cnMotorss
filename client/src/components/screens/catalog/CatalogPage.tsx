/* eslint-disable @next/next/no-img-element */
import { Car } from "./catalog.types"
import Image from 'next/image'
import { useSelector } from 'react-redux';
import styles from './catalog.module.css'
import Link from "next/link"
import { RootState } from "@/store";

export default function CatalogPage({ cars }: {cars: Car[]}) {
  const { admin } = useSelector((store: RootState) => store.auth.user);

  
  return (
    <div className={styles.contentBlock}>
      <h1>Каталог</h1>
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
           { admin && <div className={styles.infoBlock}>
              <button className={styles.change}>Изменить</button>
              <button className={styles.delete}>Удалить</button>
            </div> }
          </li>
        ))}
      </ul>
    </div>
  )
}
 
