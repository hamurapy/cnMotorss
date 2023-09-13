import React from "react";
import Link from "next/link";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function TelegramCard(): JSX.Element {
  const phones = useSelector((state: RootState) => state.phone.phoneList);

  return (
    <>
      {phones.map((telegram) => (
        <Link
          key={telegram.id}
          title="Telegram"
          href={`https://telegram.me/${telegram.telegram}`}
          target="_blank"
        >
          <TelegramIcon sx={{ fontSize: 35 }} />
        </Link>
      ))}
    </>
  );
}

export default TelegramCard;
