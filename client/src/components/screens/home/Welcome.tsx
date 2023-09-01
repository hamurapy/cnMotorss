import React from "react";
import styles from "./home.module.css";
import ApplicationForm from "./ApplicationForm";

function Welcome(): JSX.Element {
  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.headerTitle}>
          Продажа Авто
          <br />с пробегом
        </h1>
        <div className={styles.formHeader}>
          <ApplicationForm />
        </div>
      </div>
    </section>
  );
}

export default Welcome;
