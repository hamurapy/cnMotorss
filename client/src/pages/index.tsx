import { Car } from '@/components/screens/catalog/catalog.types';
import Homepage from '@/components/screens/home/HomePage'
import Layout from '@/app/layout';
import { NextPageContext } from 'next'

export default function Home({ cars } : { cars: Car[] }):JSX.Element {
  return (
    <Layout title={'Продажа авто с пробегом'} description={''} keywords={''}>
      <Homepage cars={cars}/>
    </Layout>
  );
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  const res = await fetch('http://localhost:4000/api/cars')
  const cars = await res.json()
  return { cars: cars }
}
 