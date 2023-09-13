import React from "react";
import styles from "./home.module.css";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import TodayIcon from "@mui/icons-material/Today";

function Advantage(): JSX.Element {
  return (
    <section>
      <h2>Наши преимущества</h2>
      <div className={styles.advantage}>
        <div className={styles.advantageItem}>
          <PrecisionManufacturingIcon sx={{ fontSize: 50 }} />
          <p>Помощь в выборе авто согласно вашим требованиям и бюджету</p>
        </div>
        <div className={styles.advantageItem}>
          <TimeToLeaveIcon sx={{ fontSize: 50 }} />
          <p>Собственные стоянки в нескольких городах Китая</p>
        </div>
        <div className={styles.advantageItem}>
          <LocalSeeIcon sx={{ fontSize: 50 }} />
          <p>Предоставляем полный фотоотчет и историю транспортного средства</p>
        </div>
        <div className={styles.advantageItem}>
          <TodayIcon sx={{ fontSize: 50 }} />
          <p>Доставка транспортного средства в течение 25 дней</p>
        </div>
      </div>
    </section>
  );
}

export default Advantage;
