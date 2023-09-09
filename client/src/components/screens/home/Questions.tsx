import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import styles from "./home.module.css";
import PhoneNumber from "../phoneNumber/PhoneNumber";

function Questions(): JSX.Element {
  return (
    <section>
      <h2>Появились вопросы? Звоните не откладывая!</h2>
      <div className={styles.phone}>
        <LocalPhoneIcon sx={{ fontSize: 40 }} />
        <PhoneNumber />
      </div>
    </section>
  );
}

export default Questions;
