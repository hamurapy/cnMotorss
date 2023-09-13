import { Car } from "@/components/screens/catalog/catalog.types";
import Homepage from "@/components/screens/home/HomePage";
import Layout from "@/app/layout";

export default function Home({
  carsWithPhotos,
}: {
  carsWithPhotos: Car[];
}): JSX.Element {
  return (
    <Layout
      title={"Продажа авто с пробегом"}
      description={
        "Продажа авто с пробегом с собственных стоянок в Китае. У нас вы можете купить машину с пробегом в России."
      }
      keywords={
        "авто продажа машин с пробегом, бу продажа машин с пробегом, продажа машин с пробегом цены, россия продажа машина пробег, продажа машин с пробегом в москве, продажа легковых машин с пробегом, купить машину с пробегом недорого, купить машина бу с пробегом, купить машину с пробегом в москве, купить машину с пробегом без посредников, купить машину с пробегом с фото, машины купить недорого с пробегом"
      }
    >
      <Homepage cars={carsWithPhotos} />
    </Layout>
  );
}

export async function getStaticProps() {
  const startIndex = 0;
  const endIndex = 20;

  const res = await fetch(
    `http://localhost:4000/api/cars?startIndex=${startIndex}&endIndex=${endIndex}`
  );
  const data = await res.json();
  const carsWithPhotos = data.carsWithPhotos;

  return {
    props: {
      carsWithPhotos,
    },
  };
}
