import React, { useState } from "react";
import Layout from "@/app/layout";
import { Car } from "@/components/screens/catalog/catalog.types";
import styles from "@/components/screens/catalog/catalog.module.css";
import SingleCarSlider from "@/components/screens/catalog/SingleCarSlider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import { useAppDispatch } from "@/store";
import { addApplications } from "@/components/screens/account/application/application.slice";
import { sentApplication } from "@/components/screens/telegram/telegramCar/telegramCar.slice";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:4000/api/cars/ss");
  const carIds = await res.json();

  const paths = carIds.map((id: any) => {
    return {
      params: { id: id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context: { params: { id: number } }) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:4000/api/cars/${id}`);
  const cars = await res.json();
  return {
    props: {
      car: cars,
    },
  };
}

export default function CarPage({ car }: { car: Car }): JSX.Element {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhone(e.target.value);
  };
  const handleModal = (): void => {
    setModal((prev) => !prev);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    const newApplication = {
      name,
      email,
      phone,
      carID: car.id,
      car: `${car.brand} ${car.model}`,
      carPhoto: car.photos[0].img,
      year: car.year,
      color: car.color,
      mileage: car.mileage,
      wheel: car.wheel,
      engine: `${car.liters} л/${car.power} л.с./${car.engine}`,
      driveUnit: car.driveUnit,
      transmission: car.transmission,
      price: car.price,
      status: "Новая",
    };
    dispatch(addApplications(newApplication));
    dispatch(sentApplication({ application: newApplication }));
    setModal((prev) => !prev);
  };

  return (
    <>
      <Layout
        title={`${car.brand} ${car.model}`}
        description={""}
        keywords={""}
      >
        <div className="contentBlock">
          <h1>
            {car.brand} {car.model}
          </h1>
          <div className={styles.twoColumn}>
            <div className={styles.sidePhoto}>
              <SingleCarSlider photos={car.photos} />
            </div>
            <div className={styles.side}>
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
                  <WaterDropIcon />
                </div>
                <div className={styles.listInfo}>
                  <p className={styles.listName}>Цвет</p>
                  <p>{car.color}</p>
                </div>
              </div>
              <div className={styles.sideInfo}>
                <div className={styles.listIcon}>
                  <LocalGasStationIcon />
                </div>
                <div className={styles.listInfo}>
                  <p className={styles.listName}>Двигатель</p>
                  <p>
                    {car.liters} л/{car.power} л.с./{car.engine}
                  </p>
                </div>
              </div>
              <div className={styles.sideInfo}>
                <div className={styles.listIcon}>
                  <TimeToLeaveIcon />
                </div>
                <div className={styles.listInfo}>
                  <p className={styles.listName}>Привод</p>
                  <p>{car?.transmission}</p>
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
                  <AddRoadIcon />
                </div>
                <div className={styles.listInfo}>
                  <p className={styles.listName}>Пробег</p>
                  <p>{car.mileage} км</p>
                </div>
              </div>
              <div className={styles.sideInfo}>
                <div className={styles.listIcon}>
                  <SpeedIcon />
                </div>
                <div className={styles.listInfo}>
                  <p className={styles.listName}>Коробка</p>
                  <p>{car.driveUnit}</p>
                </div>
              </div>
              <div className={styles.sideInfo}>
                <div className={styles.listIcon}>
                  <CurrencyRubleIcon />
                </div>
                <div className={styles.listInfo}>
                  <p className={styles.carPrice}>Цена</p>
                  <p>{car.price} ₽</p>
                </div>
              </div>
            </div>
          </div>
          {car.description ? (
            <>
              <p className={styles.carDescription}>Описание:</p>
              <p
                className={styles.description}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {car.description}
              </p>
            </>
          ) : (
            <></>
          )}
          <div className="btnPosition">
            <button type="button" onClick={handleModal}>
              Оформить заявку
            </button>
          </div>
        </div>
      </Layout>
      {modal && (
        <div className={styles.modalBlock} onClick={handleModal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Ваше Имя"
                onChange={handleName}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Ваш Email"
                onChange={handleEmail}
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                placeholder="Ваш телефон"
                onChange={handlePhone}
              />
              <div className="btnPosition">
                <button type="submit">Отправить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
