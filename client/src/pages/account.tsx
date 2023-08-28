import React, { useEffect } from "react";
import AccountPage from "@/components/screens/account/accountPage/AccountPage";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import Head from "next/head";

function Account(): JSX.Element {
  const { admin } = useSelector((store: RootState) => store.auth.user);
  const router = useRouter();
  // useEffect(() => {
  //   if (!admin) {
  //     router.replace("/");
  //   }
  // }, [admin, router]);

  return (
    <>
      <Head>
        <title>Личный кабинет | CN MOTORS</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.png" />
        <meta http-equiv="cache-control" content="public" />
        <meta name="robots" content="all" />
      </Head>
      <AccountPage />
    </>
  );
}

export default Account;
