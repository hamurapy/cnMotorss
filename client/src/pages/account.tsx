import Layout from "@/app/layout";
import AccountInfoPage from "@/components/screens/account/accountInfo/AccountInfoPage";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function AccountInfo(): JSX.Element {
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
        <Layout title={"Информация об аккаунте"} description={""} keywords={""}>
          <AccountInfoPage />
        </Layout>
      )}
    </>
  );
}

export default AccountInfo;
