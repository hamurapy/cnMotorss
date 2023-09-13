import Layout from "@/app/layout";
import UpdateCar from "@/components/screens/account/updateCar/UpdateCar";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function EditCar(): JSX.Element {
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
        <Layout title={"Редактирование"} description={""} keywords={""}>
          <UpdateCar />
        </Layout>
      )}
    </>
  );
}

export default EditCar;
