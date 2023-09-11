import React from "react";
import styles from "./footer.module.css";
import ScrollToTopBtn from "../ScrollToTopBtn";
import Link from "next/link";

function Footer(): JSX.Element {
  const date = new Date();

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/sitemap">Карта сайта</Link> |
          <Link href="/policy">Политика конфеденциальности</Link>
        </div>
        <p>&copy; {date.getFullYear()} CN MOTORS</p>
      </footer>
      <ScrollToTopBtn />
    </>
  );
}

export default Footer;
