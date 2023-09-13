import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function AdresCard(): JSX.Element {
  const phones = useSelector((state: RootState) => state.phone.phoneList);
  return (
    <>
      {phones.map((adres) => (
        <span key={adres.id}>{adres.adres}</span>
      ))}
    </>
  );
}

export default AdresCard;
