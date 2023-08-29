import React, { useState } from 'react';
import Layout from '@/app/layout';
import CatalogPage from '@/components/screens/catalog/CatalogPage';
import { Car } from '@/components/screens/catalog/catalog.types';

export async function getStaticProps() {
  const startIndex = 0;
  const endIndex = 20; //---------поменять

  const res = await fetch(`http://localhost:4000/api/cars?startIndex=${startIndex}&endIndex=${endIndex}`);
  
  const data = await res.json();
  const carsWithPhotos = data.carsWithPhotos;
  const carsBrandAndModel = data.carsBrandAndModel;

  return {
    props: {
      carsWithPhotos,
      carsBrandAndModel
    },
  };
}

export default function Catalog({ carsWithPhotos, carsBrandAndModel }: { carsWithPhotos: Car[], carsBrandAndModel: Car[] }): JSX.Element {

  return (
    <Layout title={'Каталог'} description={''} keywords={''}>
      <CatalogPage cars={carsWithPhotos} carsBrandAndModel={carsBrandAndModel} />
    </Layout>
  );
}
