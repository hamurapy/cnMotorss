import React from 'react'
import Layout from '@/app/layout';
import Image from 'next/image';
import { Car } from '@/components/screens/catalog/catalog.types';
import styles from '@/components/screens/catalog/catalog.module.css'
import UpdateFormCar from '@/components/screens/account/UpdateFormCar'

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

export async function getStaticProps(context: { params: { id: number; }; }) {
  const id = context.params.id
  const res = await fetch(`http://localhost:4000/api/cars/${id}`)
  const cars = await res.json()
  return {
    props: {
      car: cars,
    },
  }
}

export default function CarPage({car}:{car: Car}):JSX.Element {
  
    return (
      <Layout title={car.brand} description={''} keywords={''}>
        <div className={styles.contentBlock}>
          <h1>{car.brand} {car.model}</h1>
          <div className={styles.twoColumn}>
            <div className={styles.side}>
              <Image
					      src={`http://localhost:4000${car.photos[0].img}`}
                alt={`${car.brand} ${car.model}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                priority={true}
				      />
            </div>
            <div className={styles.side}>
              <div className={styles.sideInfo}>
                <p className={styles.listItem}>Brand:</p>
                <p className={styles.listDesription}>{car?.brand}</p>
              </div>
              <div className={styles.sideInfo}>
                <p className={styles.listItem}>Model:</p>
                <p className={styles.listDesription}>{car?.model}</p>
              </div>
              <div className={styles.sideInfo}>
                <p className={styles.listItem}>Year:</p>
                <p className={styles.listDesription}>{car?.year}</p>
              </div>
              <div className={styles.sideInfo}>
                <p className={styles.listItem}>Engine:</p>
                <p className={styles.listDesription}>{car?.engine}</p>
              </div>
              <div className={styles.sideInfo}>
                <p className={styles.listItem}>Power:</p>
                <p className={styles.listDesription}>{car?.power}</p>
              </div>
              <div className={styles.sideInfo}>
                <p className={styles.listItem}>Transmission:</p>
                <p className={styles.listDesription}>{car?.transmission}</p>
              </div>
              <div className={styles.sideInfo}>
                <p className={styles.listItem}>Mileage:</p>
                <p className={styles.listDesription}>{car?.mileage}</p>
              </div>
              <div className={styles.sideInfo}>
                <p className={styles.listItem}>Drive Unit:</p>
                <p className={styles.listDesription}>{car?.driveUnit}</p>
              </div>
              <div className={styles.sideInfo}>
                <p className={styles.price}>Price:</p>
                <p className={styles.listDesription}>{car?.price}</p>
              </div>
            </div>
          </div>
          <h3 className={styles.carDescription}>Description:</h3>
          <p>{car?.description}</p>
        </div>
        {car && <UpdateFormCar key={car?.id} car={car} />}
      </Layout>
    )
  }