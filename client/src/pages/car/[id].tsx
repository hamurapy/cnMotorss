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
import { RootState, useAppDispatch } from "@/store";
import { addApplications } from "@/components/screens/account/application/application.slice";
import { sentApplication } from "@/components/screens/telegram/telegramCar/telegramCar.slice";
import { useSelector } from "react-redux";
import Link from "next/link";

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
  const { user } = useSelector((store: RootState) => store.auth);

  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationVisible(true);

    setTimeout(() => {
      setNotificationVisible(false);
      setNotificationMessage("");
      setName("");
      setEmail("");
      setPhone("");
      setModal((prev) => !prev);
    }, 3000);
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;

    const numericValue = inputValue.replace(/\D/g, "");

    let formattedValue = "";
    if (numericValue.length >= 1) {
      formattedValue += numericValue.substring(0, 1);
    }
    if (numericValue.length >= 2) {
      formattedValue += "(" + numericValue.substring(1, 4);
    }
    if (numericValue.length >= 5) {
      formattedValue += ")" + numericValue.substring(4, 7);
    }
    if (numericValue.length >= 8) {
      formattedValue += "-" + numericValue.substring(7, 9);
    }
    if (numericValue.length >= 10) {
      formattedValue += "-" + numericValue.substring(9, 11);
    }

    setPhone(formattedValue);
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

    showNotification("Заявка успешно отправлена!");
    dispatch(addApplications(newApplication));
    dispatch(sentApplication({ application: newApplication }));
  };

  return (
    <>
      <Layout
        title={`${car.brand} ${car.model}`}
        description={`Продажа авто с пробегом с собственных стоянок в Китае. У нас вы можете купить ${car.brand} ${car.model} с пробегом в России.`}
        keywords={
          "авто продажа машин с пробегом, бу продажа машин с пробегом, продажа машин с пробегом цены, россия продажа машина пробег, продажа машин с пробегом в москве, продажа легковых машин с пробегом, купить машину с пробегом недорого, купить машина бу с пробегом, купить машину с пробегом в москве, купить машину с пробегом без посредников, купить машину с пробегом с фото, машины купить недорого с пробегом"
        }
      >
        <div className="contentBlock">
          <div className={styles.twoColumn}>
            <div className={styles.sidePhoto}>
              <h1>
                {car.brand} {car.model}
              </h1>
            </div>
            <div className={styles.side}>
              <div className="btnPosition">
                {user.name ? (
                  <>
                    <div className="carId">ID: {car.id}</div>
                    <Link href={`/update/${car.id}`} className={styles.btnLink}>
                      Редактировать
                    </Link>
                  </>
                ) : (
                  <button type="button" onClick={handleModal}>
                    Оформить заявку
                  </button>
                )}
              </div>
            </div>
          </div>
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
                  <p>{car.price} ¥</p>
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
        </div>
      </Layout>
      {modal && (
        <div className={styles.modalBlock} onClick={handleModal}>
          <div className={styles.modalContent} onClick={handleModalClick}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Ваше Имя"
                onChange={handleName}
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Ваш Email"
                onChange={handleEmail}
                required
              />
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                placeholder="Ваш телефон"
                onChange={handlePhone}
                required
              />
              <div className="btnPosition">
                <button type="submit">Отправить</button>
              </div>
              <div className="app">{notificationMessage}</div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
