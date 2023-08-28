import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Car, CarId } from "../../catalog/catalog.types";
import { useAppDispatch } from "@/store";
import { deleteCar, updateCar } from "../types/cars.slice";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./updateCar.module.css";

function UpdateForm({ car }: { car: Car }): JSX.Element {
  const [modal, setModal] = useState(true);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  const dispatch = useAppDispatch();

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

  const handleModal = (): void => {
    setModal((prev) => !prev);
  };

  const handleModalDelete = (carId: number): void => {
    setSelectedCarId(carId);
    setModalDelete(true);
  };

  const delCar = (carId: CarId): void => {
    dispatch(deleteCar(Number(carId)));
    setModalDelete(false);
    // window.location.reload()
  };

  const closeModal = (): void => {
    setModalDelete(false);
  };

  const startYear = 1927;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <>
      {modal ? (
        <>
          <button
            className={styles.editBtn}
            type="button"
            onClick={handleModal}
          >
            Редактировать
          </button>
          <button onClick={() => handleModalDelete(car.id)}>Удалить</button>
        </>
      ) : (
        <div className="cont_form">
          <form className={styles.updateForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.imageOption}>
              <label>Редактировать изображения</label>
              <input
                className={styles.inputFile}
                type="file"
                {...register("img")}
                multiple
              />
            </div>
            <div className={styles.lineForm}>
              <div className={styles.formOption}>
                <label>Марка</label>
                <input {...register("brand")} placeholder="Марка" />
              </div>
              <div className={styles.formOption}>
                <label>Модель</label>
                <input {...register("model")} placeholder="Модель" />
              </div>
              <div className={styles.formOption}>
                <label>Год выпуска</label>
                <select {...register("year")}>
                  <option value="">Год выпуска</option>
                  {years
                    .map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))
                    .reverse()}
                </select>
              </div>
              <div className={styles.formOption}>
                <label>Пробег, км</label>
                <input
                  {...register("mileage")}
                  placeholder="Пробег"
                  type="number"
                />
              </div>
            </div>
            <div className={styles.lineForm}>
              <div className={styles.formOption}>
                <label>Цвет</label>
                <input {...register("color")} placeholder="Цвет" />
              </div>
              <div className={styles.formOption}>
                <label>Руль</label>
                <select {...register("wheel")}>
                  <option value="">Руль</option>
                  <option value="Правый">Правый</option>
                  <option value="Левый">Левый</option>
                </select>
              </div>
              <div className={styles.formOption}>
                <label>Коробка</label>
                <select {...register("transmission")}>
                  <option value="">Коробка</option>
                  <option value="Механика">Механика</option>
                  <option value="Автомат">Автомат</option>
                  <option value="Робот">Робот</option>
                </select>
              </div>
              <div className={styles.formOption}>
                <label>Мощность, л.с.</label>
                <div className={styles.coverInput}>
                  <input
                    {...register("power")}
                    placeholder="Мощность"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className={styles.lineForm}>
              <div className={styles.formOption}>
                <label>Объем, л</label>
                <select {...register("liters")}>
                  <option value="">Объем, л</option>
                  {[
                    0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
                    1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5,
                    2.6, 2.7, 2.8, 2.9, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0,
                    8.0, 9.0, 10.0,
                  ].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formOption}>
                <label>Двигатель</label>
                <select {...register("engine")}>
                  <option value="">Двигатель</option>
                  <option value="Бензин">Бензин</option>
                  <option value="Дизель">Дизель</option>
                  <option value="Гибрид">Гибрид</option>
                  <option value="Электрический">Электрический</option>
                  <option value="Турбодизельный">Турбодизельный</option>
                </select>
              </div>
              <div className={styles.formOption}>
                <label>Привод</label>
                <select {...register("driveUnit")}>
                  <option value="">Привод</option>
                  <option value="Передний">Передний</option>
                  <option value="Задний">Задний</option>
                  <option value="Полный">Полный</option>
                  <option value="Постоянный полный">Постоянный полный</option>
                </select>
              </div>
              <div className={styles.formOption}>
                <label>Цена, ₽</label>
                <div className={styles.coverInput}>
                  <input
                    {...register("price")}
                    placeholder="Цена"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className={styles.imageOption}>
              <label>Описание</label>
              <textarea {...register("description")} placeholder="Описание" />
            </div>
            <div className={styles.btnBlock}>
              <button type="submit" className={styles.editBtn}>
                Редактировать
              </button>
              <button type="button" onClick={handleModal}>
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
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

export default UpdateForm;
