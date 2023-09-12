import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function WhatsappCard(): JSX.Element {
  const phones = useSelector((state: RootState) => state.phone.phoneList);
  return (
    <>
      {phones.map((whatsapp) => (
        <Link
          key={whatsapp.id}
          title="Whatsapp"
          href={`whatsapp://send?phone=${whatsapp.whatsapp}`}
        >
          <WhatsAppIcon sx={{ fontSize: 35 }} />
        </Link>
      ))}
    </>
  );
}

export default WhatsappCard;
