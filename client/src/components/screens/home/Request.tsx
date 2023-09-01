import React from "react";
import styles from "./home.module.css";
import ApplicationForm from "./ApplicationForm";

function Request(): JSX.Element {
  return (
    <section className={styles.request}>
      <h2>Отправить заявку</h2>
      <div className={styles.requestForm}>
        <ApplicationForm />
      </div>
    </section>
  );
}

export default Request;
