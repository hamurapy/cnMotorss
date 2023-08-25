import React, { useEffect } from "react";
import AccountPage from "@/components/screens/account/AccountPage";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";

function Account(): JSX.Element {
  const { admin } = useSelector((store: RootState) => store.auth.user);
  const router = useRouter();
  // useEffect(() => {
  //   if (!admin) {
  //     router.replace("/");
  //   }
  // }, [admin, router]);

  return <>{admin && <AccountPage />}</>;
}

export default Account;
