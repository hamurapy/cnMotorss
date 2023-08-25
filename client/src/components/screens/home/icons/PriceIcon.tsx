import React from "react";
import styles from "../home.module.css";

function Price(): JSX.Element {
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 879.74 791.7"
    >
      <path
        className={styles.filled}
        d="M851.83,176.34H712.49l-54.57-59.43A87.48,87.48,0,0,0,593.21,88.3H406.79a89.1,89.1,0,0,0-65.13,28.61l-54,59.43H148.17c-48.45,0-88,39.59-88,87.93v527.8c0,48.35,39.59,87.93,88,87.93H851.83c48.45,0,88-39.59,88-87.93V264.27c0-48.35-39.59-87.93-88-87.93ZM500,748c-121.39,0-219.88-98.49-219.88-219.88S378.61,308.29,500,308.29s219.88,98.49,219.88,219.88S621.39,748,500,748Z"
        transform="translate(-60.13 -88.3)"
      />
      <path
        className={styles.filled}
        d="M500,396.22l7,.21a132,132,0,1,1-13.93,0Z"
        transform="translate(-60.13 -88.3)"
      />
    </svg>
  );
}

export default Price;
