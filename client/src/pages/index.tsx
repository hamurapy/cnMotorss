import { Car } from '@/components/screens/catalog/catalog.types';
import Homepage from '@/components/screens/home/HomePage'
import Layout from '@/app/layout';


export default function Home({ carsWithPhotos } : { carsWithPhotos: Car[] }):JSX.Element {
  return (
    <Layout title={'Продажа авто с пробегом'} description={''} keywords={''}>
      <Homepage cars={carsWithPhotos}/>
    </Layout>
  );
}

export async function getStaticProps() {
  const startIndex = 0;
  const endIndex = 20;//------поменять

  const res = await fetch(`http://localhost:4000/api/cars?startIndex=${startIndex}&endIndex=${endIndex}`);
  const data = await res.json();
  const carsWithPhotos = data.carsWithPhotos;
  
  return {
    props: {
      carsWithPhotos,
    },
  };
}