import React, {useEffect} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CarWithOutId } from "../catalog/catalog.types";
import { useAppDispatch } from "@/store";
import { addCar } from "./redux/carsSlice";
import styles from "./account.module.css";

function FormAddCar(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CarWithOutId>();

  const onSubmit: SubmitHandler<CarWithOutId> = (data) => {
    const formData = new FormData();

    Object.keys(data.img).forEach((key: any) => {
      formData.append("img", data.img[key]);
    });

    formData.append("brand", data.brand);
    formData.append("model", data.model);
    formData.append("color", data.color);
    formData.append("liters", data.liters.toString());
    formData.append("wheel", data.wheel);
    formData.append("engine", data.engine);
    formData.append("year", data.year.toString());
    formData.append("mileage", data.mileage.toString());
    formData.append("power", data.power.toString());
    formData.append("price", data.price.toString());
    formData.append("driveUnit", data.driveUnit);
    formData.append("transmission", data.transmission);
    formData.append("description", data.description);

    dispatch(addCar(formData))
      .then(() => {
        alert('Машина успешно добавлена');
      })
      .catch(() => {
        alert('Ошибка при добавлении машины');
      });

    reset();
  };

  return (
    <>
      <h3>Добавить авто</h3>
      <form className={styles.accountForm} onSubmit={handleSubmit(onSubmit)}>
        <p>Добавить изображения</p>
        <input
          className={styles.inputFile}
          type="file"
          {...register("img", { required: true })}
          multiple
        />
        <div className={styles.lineForm}>
          <input
            {...register("brand", { required: true })}
            placeholder="Марка"
          />
          <input
            {...register("model", { required: true })}
            placeholder="Модель"
          />
          <input
            {...register("year", { required: true })}
            placeholder="Год выпуска"
          />
          <input
            {...register("mileage", { required: true })}
            placeholder="Пробег"
          />
        </div>
        <div className={styles.lineForm}>
          <input
            {...register("color", { required: true })}
            placeholder="Цвет"
          />
          <select {...register("wheel", { required: true })}>
            <option value="" disabled selected hidden>
              Руль
            </option>
            <option value="Правый">Правый</option>
            <option value="Левый">Левый</option>
          </select>
          <select {...register("transmission", { required: true })}>
            <option value="" disabled selected hidden>
              Коробка
            </option>
            <option value="Механика">Механика</option>
            <option value="Автомат">Автомат</option>
            <option value="Робот">Робот</option>
          </select>
          <input
            {...register("power", { required: true })}
            placeholder="Мощность двигателя"
          />
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
          <select {...register("engine", { required: true })}>
            <option value="" disabled selected hidden>
              Двигатель
            </option>
            <option value="Бензин">Бензин</option>
            <option value="Дизель">Дизель</option>
            <option value="Гибрид">Гибрид</option>
            <option value="Электрический">Электрический</option>
            <option value="Турбодизельный">Турбодизельный</option>
          </select>
          <select {...register("driveUnit", { required: true })}>
            <option value="" disabled selected hidden>
              Привод
            </option>
            <option value="Передний">Передний</option>
            <option value="Задний">Задний</option>
            <option value="Полный">Полный</option>
            <option value="Постоянный полный">Постоянный полный</option>
          </select>
          <input
            {...register("price", { required: true })}
            placeholder="Цена"
          />
        </div>
        <textarea
          {...register("description", { required: true })}
          placeholder="Описание"
        />
        <div className="btnPosition">
          <button type="submit">Добавить авто</button>
        </div>
      </form>
    </>
  );
}

export default FormAddCar;
