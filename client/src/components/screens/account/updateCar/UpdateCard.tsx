import React, { useState } from "react";
import { Car, CarId } from "../../catalog/catalog.types";
import styles from "@/components/screens/account/application/application.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { deleteCar } from "../types/cars.slice";
import { useAppDispatch } from "@/store";

function CarCard({ car }: { car: Car }): JSX.Element {
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const handleModalDelete = (carId: number): void => {
    setSelectedCarId(carId);
    setModalDelete(true);
  };

  const delCar = (carId: CarId): void => {
    dispatch(deleteCar(Number(carId)));
    setModalDelete(false);
  };

  const closeModal = (): void => {
    setModalDelete(false);
  };

  return (
    <>
      <tr>
        <td>
          <span>ID</span>
          {car.id}
        </td>
        <td>
          <span>Марка</span>
          {car.brand}
        </td>
        <td>
          <span>Модель</span>
          {car.model}
        </td>
        <td>
          <span>Цвет</span>
          {car.color}
        </td>
        <td>
          <span>Год выпуска</span>
          {car.year}
        </td>
        <td>
          <span>Цена</span>
          {car.price} ¥
        </td>
        <td>
          <span>Редактировать</span>
          <Link href={`/update/${car.id}`}>
            <EditIcon sx={{ fontSize: 30 }} />
          </Link>
        </td>
        <td>
          <span>Удалить</span>
          <DeleteForeverIcon
            onClick={() => handleModalDelete(car.id)}
            sx={{ fontSize: 30 }}
          />
        </td>
      </tr>
      {modalDelete && selectedCarId === car.id && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Вы уверены, что хотите удалить эту машину из каталога?</p>
            <div className={styles.modalBtns}>
              <button onClick={() => delCar(car.id)}>Да</button>
              <button onClick={closeModal}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CarCard;
