import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { loadPhone } from "./phone.slice";
import Link from "next/link";

export default function PhoneNumber() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPhone());
  }, [dispatch]);

  const phones = useSelector((state: RootState) => state.phone.phoneList);
  const phone = phones.map((phone) => phone.phoneNumber);

  console.log(phone);

  return (
    <>
      {phones.map((phone) => (
        <Link key={phone.phoneNumber} href={`tel: ${phone.phoneNumber}`}>
          {phone.phoneNumber}
        </Link>
      ))}
    </>
  );
}
