import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Car, CarId } from "../catalog/catalog.types";
import { useAppDispatch } from "@/store";
import { updateCar } from "./redux/carsSlice";
import styles from "../catalog/catalog.module.css";

function UpdateForm({ car }: { car: Car }): JSX.Element {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(true);
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: car,
  });
  const onSubmit = (formData: Car): void => {
    const formDataObj = new FormData();

    if (formData.img) {
      for (let key in formData.img) {
        formDataObj.append("img", formData.img[key]);
      }
    }
    formDataObj.append("brand", formData.brand);
    formDataObj.append("model", formData.model);
    formDataObj.append("color", formData.color);
    formDataObj.append("liters", formData.liters.toString());
    formDataObj.append("wheel", formData.wheel);
    formDataObj.append("engine", formData.engine);
    formDataObj.append("year", formData.year.toString());
    formDataObj.append("mileage", formData.mileage.toString());
    formDataObj.append("power", formData.power.toString());
    formDataObj.append("price", formData.price.toString());
    formDataObj.append("driveUnit", formData.driveUnit);
    formDataObj.append("transmission", formData.transmission);
    formDataObj.append("description", formData.description);
    formDataObj.append("id", car.id);
    console.log(formDataObj);

    dispatch(
      updateCar(formDataObj, setModal(!modal), window.location.reload())
    );
  };
  return (
    <>
      {modal ? (
        <button
          className={styles.editBtn}
          type="button"
          onClick={() => setModal(!modal)}
        >
          Редактировать
        </button>
      ) : (
        <div className="cont_form">
          <form
            className={styles.accountForm}
            onSubmit={handleSubmit(onSubmit)}
          >
            <p>Добавить изображения</p>
            <input
              className={styles.inputFile}
              type="file"
              {...register("img")}
              multiple
            />
            <div className={styles.lineForm}>
              <input {...register("brand")} placeholder="Марка" />
              <input {...register("model")} placeholder="Модель" />
              <input {...register("year")} placeholder="Год выпуска" />
              <input {...register("mileage")} placeholder="Пробег" />
            </div>
            <div className={styles.lineForm}>
              <input {...register("color")} placeholder="Цвет" />
              <select {...register("wheel")}>
                <option value="" disabled selected hidden>
                  Руль
                </option>
                <option value="Правый">Правый</option>
                <option value="Левый">Левый</option>
              </select>
              <select {...register("transmission")}>
                <option value="" disabled selected hidden>
                  Коробка
                </option>
                <option value="Механика">Механика</option>
                <option value="Автомат">Автомат</option>
                <option value="Робот">Робот</option>
              </select>
              <input {...register("power")} placeholder="Мощность двигателя" />
            </div>
            <div className={styles.lineForm}>
              <select {...register("liters")}>
                <option value="" disabled selected hidden>
                  Объем л
                </option>
                {[
      0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6,
      1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.5,
      4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0, 9.0, 10.0,
    ].map((value) => (
      <option key={value} value={value}>
        {value} л
      </option>
    ))}
              </select>
              <select {...register("engine")}>
                <option value="" disabled selected hidden>
                  Двигатель
                </option>
                <option value="Бензин">Бензин</option>
                <option value="Дизель">Дизель</option>
                <option value="Гибрид">Гибрид</option>
                <option value="Электрический">Электрический</option>
                <option value="Турбодизельный">Турбодизельный</option>
              </select>
              <select {...register("driveUnit")}>
                <option value="" disabled selected hidden>
                  Привод
                </option>
                <option value="Передний">Передний</option>
                <option value="Задний">Задний</option>
                <option value="Полный">Полный</option>
                <option value="Постоянный полный">Постоянный полный</option>
              </select>
              <input {...register("price")} placeholder="Цена" />
            </div>
            <textarea {...register("description")} placeholder="Описание" />
            <div className="btnPosition">
              <button type="submit">Редактировать</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateForm;
