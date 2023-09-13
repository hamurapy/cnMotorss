import Layout from "@/app/layout";
import AddCarPage from "@/components/screens/account/addCar/AddCarPage";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function AddCar(): JSX.Element {
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
        <Layout title={"Добавить авто"} description={""} keywords={""}>
          <AddCarPage />
        </Layout>
      )}
    </>
  );
}

export default AddCar;
