import React, { useState } from 'react';
import Layout from '@/app/layout';
import CatalogPage from '@/components/screens/catalog/CatalogPage';
import { Car } from '@/components/screens/catalog/catalog.types';

function Catalog({ cars }: { cars: Car[] }): JSX.Element {

  return (
    <Layout title={'Каталог'} description={''} keywords={''}>
      <CatalogPage cars={cars} />
    </Layout>
  );
}

export default Catalog;

export async function getStaticProps() {
  const startIndex = 0;
  const endIndex = 20;

  const res = await fetch(`http://localhost:4000/api/cars?startIndex=${startIndex}&endIndex=${endIndex}`);
  const cars = await res.json();
  
  return {
    props: {
      cars,
    },
  };
}
