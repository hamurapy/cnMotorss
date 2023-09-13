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

  function formatPhoneNumber(phone: string | undefined) {
    const cleaned = ("" + phone).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return (
        "+" +
        match[1] +
        " (" +
        match[2] +
        ") " +
        match[3] +
        "-" +
        match[4] +
        "-" +
        match[5]
      );
    }
    return null;
  }

  return (
    <>
      {phones.map((phone) => (
        <Link key={phone.phoneNumber} href={`tel: +${phone.phoneNumber}`}>
          {formatPhoneNumber(phone.phoneNumber)}
        </Link>
      ))}
    </>
  );
}
