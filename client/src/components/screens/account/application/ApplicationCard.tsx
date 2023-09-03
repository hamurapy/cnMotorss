import React, { useCallback, useEffect } from "react";
import { ApplicationType } from "./types/application.type";
import styles from "./application.module.css";
import { useAppDispatch } from "@/store";
import { deleteApplications, updateApplications } from "./application.slice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Image from "next/image";
import Link from "next/link";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import SpeedIcon from "@mui/icons-material/Speed";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import classNames from "classnames";

function ApplicationCard({ app }: { app: ApplicationType }): JSX.Element {
  const dispatch = useAppDispatch();

  const deleteApplication = useCallback(() => {
    dispatch(deleteApplications(Number(app.id)));
  }, [app.id, dispatch]);

  const rawDate = app.createdAt;
  let formattedDateTime = "";
  if (rawDate) {
    const date = new Date(rawDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    formattedDateTime = `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year} ${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  }

  const updateApplication: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ): void => {
    e.preventDefault();
    const newStatus = e.target.value;
    dispatch(
      updateApplications({
        id: app.id,
        status: newStatus,
      })
    );
  };

  return (
    <>
      <div className={styles.appCard}>
        <table className={styles.respTab}>
          <thead>
            <tr>
              <th
                style={{
                  background:
                    app.status === "Новая"
                      ? "#a20101"
                      : app.status === "Обработана"
                      ? "#337AB7"
                      : app.status === "В процессе"
                      ? "#0c9645"
                      : "#a20101",
                }}
              >
                ID
              </th>
              <th
                style={{
                  background:
                    app.status === "Новая"
                      ? "#a20101"
                      : app.status === "Обработана"
                      ? "#337AB7"
                      : app.status === "В процессе"
                      ? "#0c9645"
                      : "#a20101",
                }}
              >
                Имя
              </th>
              <th
                style={{
                  background:
                    app.status === "Новая"
                      ? "#a20101"
                      : app.status === "Обработана"
                      ? "#337AB7"
                      : app.status === "В процессе"
                      ? "#0c9645"
                      : "#a20101",
                }}
              >
                E-mail
              </th>
              <th
                style={{
                  background:
                    app.status === "Новая"
                      ? "#a20101"
                      : app.status === "Обработана"
                      ? "#337AB7"
                      : app.status === "В процессе"
                      ? "#0c9645"
                      : "#a20101",
                }}
              >
                Телефон
              </th>
              <th
                style={{
                  background:
                    app.status === "Новая"
                      ? "#a20101"
                      : app.status === "Обработана"
                      ? "#337AB7"
                      : app.status === "В процессе"
                      ? "#0c9645"
                      : "#a20101",
                }}
              >
                Дата
              </th>
              <th
                style={{
                  background:
                    app.status === "Новая"
                      ? "#a20101"
                      : app.status === "Обработана"
                      ? "#337AB7"
                      : app.status === "В процессе"
                      ? "#0c9645"
                      : "#a20101",
                }}
              >
                Статус
              </th>
              <th
                style={{
                  background:
                    app.status === "Новая"
                      ? "#a20101"
                      : app.status === "Обработана"
                      ? "#337AB7"
                      : app.status === "В процессе"
                      ? "#0c9645"
                      : "#a20101",
                }}
              >
                Удалить
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span
                  style={{
                    background:
                      app.status === "Новая"
                        ? "#a20101"
                        : app.status === "Обработана"
                        ? "#337AB7"
                        : app.status === "В процессе"
                        ? "#0c9645"
                        : "#a20101",
                  }}
                >
                  ID
                </span>
                {app.id}
              </td>
              <td>
                <span
                  style={{
                    background:
                      app.status === "Новая"
                        ? "#a20101"
                        : app.status === "Обработана"
                        ? "#337AB7"
                        : app.status === "В процессе"
                        ? "#0c9645"
                        : "#a20101",
                  }}
                >
                  Имя
                </span>
                {app.name}
              </td>
              <td>
                <span
                  style={{
                    background:
                      app.status === "Новая"
                        ? "#a20101"
                        : app.status === "Обработана"
                        ? "#337AB7"
                        : app.status === "В процессе"
                        ? "#0c9645"
                        : "#a20101",
                  }}
                >
                  E-mail
                </span>
                {app.email}
              </td>
              <td>
                <span
                  style={{
                    background:
                      app.status === "Новая"
                        ? "#a20101"
                        : app.status === "Обработана"
                        ? "#337AB7"
                        : app.status === "В процессе"
                        ? "#0c9645"
                        : "#a20101",
                  }}
                >
                  Телефон
                </span>
                {app.phone}
              </td>
              <td>
                <span
                  style={{
                    background:
                      app.status === "Новая"
                        ? "#a20101"
                        : app.status === "Обработана"
                        ? "#337AB7"
                        : app.status === "В процессе"
                        ? "#0c9645"
                        : "#a20101",
                  }}
                >
                  Дата
                </span>
                {formattedDateTime}
              </td>
              <td>
                <span
                  style={{
                    background:
                      app.status === "Новая"
                        ? "#a20101"
                        : app.status === "Обработана"
                        ? "#337AB7"
                        : app.status === "В процессе"
                        ? "#0c9645"
                        : "#a20101",
                  }}
                >
                  Статус
                </span>
                <select onChange={updateApplication}>
                  <option value="Новая">Новая</option>
                  <option value="В процессе">В процессе</option>
                  <option value="Обработана">Обработана</option>
                </select>
              </td>
              <td>
                <span
                  style={{
                    background:
                      app.status === "Новая"
                        ? "#a20101"
                        : app.status === "Обработана"
                        ? "#337AB7"
                        : app.status === "В процессе"
                        ? "#0c9645"
                        : "#a20101",
                  }}
                >
                  Удалить
                </span>
                <DeleteForeverIcon
                  sx={{ fontSize: 35 }}
                  onClick={deleteApplication}
                />
              </td>
            </tr>
            {app.message && (
              <tr>
                <td colSpan={7} className={styles.message}>
                  Сообщение: {app?.message}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {app.carID && (
          <Link href={`/car/${app?.carID}`}>
            <table className={styles.respTab}>
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className={classNames(styles.option, styles.message)}
                  >
                    ID: {app?.carID} | {app?.car}
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2} className={styles.imgBlock}>
                    <div className={styles.coverImg}>
                      <Image
                        src={
                          (app && `http://localhost:4000/${app.carPhoto}`) || ""
                        }
                        alt="Продажа авто с пробегом"
                        priority={true}
                        width={150}
                        height={0}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  </td>
                  <td className={styles.option}>
                    <div className={styles.sideInfo}>
                      <div className={styles.listIcon}>
                        <LocalGasStationIcon />
                      </div>
                      <div className={styles.listInfo}>
                        <p className={styles.listName}>Двигатель</p>
                        <p>{app?.engine}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.option}>
                    <div className={styles.sideInfo}>
                      <div className={styles.listIcon}>
                        <AddRoadIcon />
                      </div>
                      <div className={styles.listInfo}>
                        <p className={styles.listName}>Пробег</p>
                        <p>{app?.mileage}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.option}>
                    <div className={styles.sideInfo}>
                      <div className={styles.listIcon}>
                        <CalendarTodayIcon />
                      </div>
                      <div className={styles.listInfo}>
                        <p className={styles.listName}>Год выпуска</p>
                        <p>{app?.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.option}>
                    <div className={styles.sideInfo}>
                      <div className={styles.listIcon}>
                        <TimeToLeaveIcon />
                      </div>
                      <div className={styles.listInfo}>
                        <p className={styles.listName}>Привод</p>
                        <p>{app?.transmission}</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={styles.option}>
                    <div className={styles.sideInfo}>
                      <div className={styles.listIcon}>
                        <SportsSoccerIcon />
                      </div>
                      <div className={styles.listInfo}>
                        <p className={styles.listName}>Руль</p>
                        <p>{app?.wheel}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.option}>
                    <div className={styles.sideInfo}>
                      <div className={styles.listIcon}>
                        <SpeedIcon />
                      </div>
                      <div className={styles.listInfo}>
                        <p className={styles.listName}>Коробка</p>
                        <p>{app?.driveUnit}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.option}>
                    <div className={styles.sideInfo}>
                      <div className={styles.listIcon}>
                        <WaterDropIcon />
                      </div>
                      <div className={styles.listInfo}>
                        <p className={styles.listName}>Цвет</p>
                        <p>{app?.color}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.option}>
                    <div className={styles.sideInfo}>
                      <div className={styles.listIcon}>
                        <CurrencyRubleIcon />
                      </div>
                      <div className={styles.listInfo}>
                        <p className={styles.listName}>Цена</p>
                        <p>{app?.price} ₽</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Link>
        )}
      </div>
    </>
  );
}

export default ApplicationCard;
