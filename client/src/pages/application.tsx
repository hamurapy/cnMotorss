import Layout from "@/app/layout";
import ApplicationPage from "@/components/screens/account/application/ApplicationPage";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Application(): JSX.Element {
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
        <Layout title={"Заявки"} description={""} keywords={""}>
          <ApplicationPage />
        </Layout>
      )}
    </>
  );
}

export default Application;
