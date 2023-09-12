import Layout from "@/app/layout";
import UpdateSingleCar from "@/components/screens/account/updateCar/UpdateSingleCar";
import { Car } from "@/components/screens/catalog/catalog.types";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:4000/api/cars/ss");
  const carIds = await res.json();

  const paths = carIds.map((id: any) => {
    return {
      params: { id: id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context: { params: { id: number } }) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:4000/api/cars/${id}`);
  const cars = await res.json();
  return {
    props: {
      car: cars,
    },
  };
}

function Update({ car }: { car: Car }): JSX.Element {
  const { user } = useSelector((store: RootState) => store.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <>
      {user && (
        <Layout title={"Редактировать"} description={""} keywords={""}>
          <UpdateSingleCar car={car} />
        </Layout>
      )}
    </>
  );
}

export default Update;
