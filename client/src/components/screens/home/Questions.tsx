import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import styles from "./home.module.css";
import PhoneNumber from "../phoneNumber/PhoneNumber";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AdresCard from "../contact/AdresCard";
import WhatsappCard from "../contact/WhatsappCard";
import TelegramCard from "../contact/TelegramCard";

function Questions(): JSX.Element {
  return (
    <section>
      <h2>Появились вопросы? Свяжитесь с нами!</h2>
      <div className="social">
        <div className="socialItem">
          <div className={styles.phone}>
            <LocationOnIcon sx={{ fontSize: 40 }} />
            <AdresCard />
          </div>
        </div>
        <div className="socialItem">
          <div className={styles.phone}>
            <LocalPhoneIcon sx={{ fontSize: 40 }} />
            <PhoneNumber />
          </div>
        </div>
        <div className="socialItem">
          <div className={styles.phone}>
            <div className="socialIcons">
              <WhatsappCard />
              <TelegramCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Questions;
