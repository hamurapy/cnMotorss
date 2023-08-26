import React from "react";
import styles from "./footer.module.css";
import ScrollToTopBtn from "../ScrollToTopBtn";

function Footer(): JSX.Element {
  const date = new Date();

  return (
    <>
      <footer className={styles.footer}>
        <p>&copy; {date.getFullYear()} CN MOTORS</p>
      </footer>
      <ScrollToTopBtn />
    </>
  );
}

export default Footer;
