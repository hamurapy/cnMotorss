import React from 'react'
import Layout from '@/app/layout';
import Image from 'next/image';
import { Car } from '@/components/screens/catalog/catalog.types';
import styles from '@/components/screens/catalog/catalog.module.css'

export const getStaticPaths = async () => {
  const res = await fetch(process.env.URL + '/api/cars')
  const cars = await res.json()

  const paths = cars.map((car: { id: any; }) => {
    return {
      params:  {id: car.id.toString()}
    }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context: { params: { id: number; }; }) {
  const id = context.params.id
  const res = await fetch(process.env.URL + `/api/cars/${id}`)
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
					      src={`/cars/img/car${car.id}.jpeg`}
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
      </Layout>
    )
  }