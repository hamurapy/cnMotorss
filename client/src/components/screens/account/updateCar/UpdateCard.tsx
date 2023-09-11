import React from "react";
import { Car } from "../../catalog/catalog.types";
import CarSlider from "../../home/CarSlider";
import UpdateForm from "./UpdateForm";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import EvStationIcon from "@mui/icons-material/EvStation";
import styles from "./updateCar.module.css";

function carCard({ car }: { car: Car }): JSX.Element {
  return (
    <li className={styles.listItem} key={car.id}>
      <div className={styles.cardBlock}>
        <div className={styles.cardBlock}>
          <div className={styles.model}>
            {car.brand} {car.model}
          </div>
          <div className={styles.model}>ID: {car.id}</div>
        </div>

        <div className={styles.cardBlock}>
          <div className={styles.photoBlock}>
            <CarSlider photos={car.photos} />
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <LocalGasStationIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Двигатель</p>
                <p>{car.engine}</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <GasMeterIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Объем, л</p>
                <p>{car.liters}</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <EvStationIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Мощность</p>
                <p>{car.power}</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <AddRoadIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Пробег</p>
                <p>{car.mileage} км</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <CalendarTodayIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Год выпуска</p>
                <p>{car.year}</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <TimeToLeaveIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Привод</p>
                <p>{car.driveUnit}</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <SportsSoccerIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Руль</p>
                <p>{car.wheel}</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <SpeedIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Коробка</p>
                <p>{car.transmission}</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <WaterDropIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Цвет</p>
                <p>{car.color}</p>
              </div>
            </div>
            <div className={styles.sideInfo}>
              <div className={styles.listIcon}>
                <CurrencyRubleIcon />
              </div>
              <div className={styles.listInfo}>
                <p className={styles.listName}>Цена</p>
                <p>{car.price} ¥</p>
              </div>
            </div>
          </div>
          {car.description ? (
            <>
              <div className={styles.options}>
                <p className={styles.carDescription}>Описание:</p>
                <p className={styles.description}>{car.description}</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.btnBlock}>
          <UpdateForm car={car} />
        </div>
      </div>
    </li>
  );
}

export default carCard;
