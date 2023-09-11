import Layout from "@/app/layout";
import EditorsPage from "@/components/screens/account/editors/EditorsPage";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Editors(): JSX.Element {
  const { user } = useSelector((store: RootState) => store.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user.admin) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <>
      {user.admin && (
        <Layout title={"Редакторы"} description={""} keywords={""}>
          <EditorsPage />
        </Layout>
      )}
    </>
  );
}

export default Editors;
