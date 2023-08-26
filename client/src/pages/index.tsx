import { Car } from '@/components/screens/catalog/catalog.types';
import Homepage from '@/components/screens/home/HomePage'
import Layout from '@/app/layout';

export default function Home({ cars } : { cars: Car[] }):JSX.Element {
  return (
    <Layout title={'Продажа авто с пробегом'} description={''} keywords={''}>
      <Homepage cars={cars}/>
    </Layout>
  );
}

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