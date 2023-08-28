import React from "react";
import Link from "next/link";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import styles from "./home.module.css";

function Questions(): JSX.Element {
  return (
    <section>
      <h2>Появились вопросы? Звоните не откладывая!</h2>
      <div className={styles.phone}>
        <LocalPhoneIcon sx={{ fontSize: 40 }} />
        <Link href="tel: +79215555578">+7 (921) 555-55-78</Link>
      </div>
    </section>
  );
}

export default Questions;
