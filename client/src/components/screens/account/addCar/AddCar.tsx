import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CarWithOutId } from "../../catalog/catalog.types";
import { useAppDispatch } from "@/store";
import { addCar } from "../types/cars.slice";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./addCar.module.css";

function FormAddCar(): JSX.Element {
  const [brand, setBrand] = useState("");
  const [brandBtn, setBrandBtn] = useState(false);
  const [model, setModel] = useState("");
  const [modelBtn, setModelBtn] = useState(false);
  const [color, setColor] = useState("");
  const [colorBtn, setColorBtn] = useState(false);

  const [mileage, setMileage] = useState("");
  const [mileageText, setMileageText] = useState("");
  const [mileageBtn, setMileageBtn] = useState(false);
  const [power, setPower] = useState("");
  const [powerText, setPowerText] = useState("");
  const [powerBtn, setPowerBtn] = useState(false);
  const [price, setPrice] = useState("");
  const [priceText, setPriceText] = useState("");
  const [priceBtn, setPriceBtn] = useState(false);

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

    setBrand("");
    setBrandBtn(false);
    setModel("");
    setModelBtn(false);
    setColor("");
    setColorBtn(false);
    setMileage("");
    setMileageText("");
    setMileageBtn(false);
    setPower("");
    setPowerText("");
    setPowerBtn(false);
    setPrice("");
    setPriceText("");
    setPriceBtn(false);

    reset();
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
    if (e.target.value !== "") {
      setBrandBtn(true);
    }
  };

  const clearBrand = () => {
    setBrand("");
    setBrandBtn(false);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value);
    if (e.target.value !== "") {
      setModelBtn(true);
    }
  };

  const clearModel = () => {
    setModel("");
    setModelBtn(false);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    if (e.target.value !== "") {
      setColorBtn(true);
    }
  };

  const clearColor = () => {
    setColor("");
    setColorBtn(false);
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMileage(e.target.value);
    setMileageText(e.target.value + " км");
    if (e.target.value !== "") {
      setMileageBtn(true);
    }
  };
  const clearMileage = () => {
    setMileage("");
    setMileageText("");
    setMileageBtn(false);
  };

  const handlePowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPower(e.target.value);
    setPowerText(e.target.value + " л.c.");
    if (e.target.value !== "") {
      setPowerBtn(true);
    }
  };
  const clearPower = () => {
    setPower("");
    setPowerText("");
    setPowerBtn(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    setPriceText(e.target.value + " ₽");
    if (e.target.value !== "") {
      setPriceBtn(true);
    }
  };
  const clearPrice = () => {
    setPrice("");
    setPriceText("");
    setPriceBtn(false);
  };

  const startYear = 1927;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <>
      <h3>Добавить авто</h3>
      <form className={styles.accountForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.imageOption}>
          <label>Добавить изображения</label>
          <input
            className={styles.inputFile}
            type="file"
            {...register("img", { required: true })}
            multiple
          />
        </div>
        <div className={styles.lineForm}>
          <div className={styles.formOption}>
            <label>Марка</label>
            <div className={styles.coverInput}>
              <input
                {...register("brand", { required: true })}
                value={brand}
                onChange={handleBrandChange}
              />
              {brandBtn && (
                <div className={styles.clear}>
                  <CloseIcon onClick={clearBrand} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.formOption}>
            <label>Модель</label>
            <div className={styles.coverInput}>
              <input
                {...register("model", { required: true })}
                value={model}
                onChange={handleModelChange}
              />
              {modelBtn && (
                <div className={styles.clear}>
                  <CloseIcon onClick={clearModel} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.formOption}>
            <label>Пробег</label>
            <div className={styles.coverInput}>
              <input
                type="text"
                value={mileageText}
                className={styles.coverTop}
                readOnly
              />
              <input
                {...register("mileage", { required: true })}
                className={styles.coverBottom}
                type="number"
                value={mileage}
                onChange={handleMileageChange}
              />
              {mileageBtn && (
                <div className={styles.clear}>
                  <CloseIcon onClick={clearMileage} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.formOption}>
            <label>Год выпуска</label>
            <select {...register("year", { required: true })}>
              <option value="">Выберите</option>
              {years
                .map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))
                .reverse()}
            </select>
          </div>
        </div>
        <div className={styles.lineForm}>
          <div className={styles.formOption}>
            <label>Коробка</label>
            <select {...register("transmission", { required: true })}>
              <option value="">Выберите</option>
              <option value="">Коробка</option>
              <option value="Механика">Механика</option>
              <option value="Автомат">Автомат</option>
              <option value="Робот">Робот</option>
            </select>
          </div>
          <div className={styles.formOption}>
            <label>Руль</label>
            <select {...register("wheel", { required: true })}>
              <option value="">Выберите</option>
              <option value="Правый">Правый</option>
              <option value="Левый">Левый</option>
            </select>
          </div>
          <div className={styles.formOption}>
            <label>Привод</label>
            <select {...register("driveUnit", { required: true })}>
              <option value="">Выберите</option>
              <option value="Передний">Передний</option>
              <option value="Задний">Задний</option>
              <option value="Полный">Полный</option>
              <option value="Постоянный полный">Постоянный полный</option>
            </select>
          </div>
          <div className={styles.formOption}>
            <label>Цвет</label>
            <div className={styles.coverInput}>
              <input
                {...register("color", { required: true })}
                value={color}
                onChange={handleColorChange}
              />
              {colorBtn && (
                <div className={styles.clear}>
                  <CloseIcon onClick={clearColor} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.lineForm}>
          <div className={styles.formOption}>
            <label>Объем, л</label>
            <select {...register("liters", { required: true })}>
              <option value="">Выберите</option>
              {[
                0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4,
                1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7,
                2.8, 2.9, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0, 9.0,
                10.0,
              ].map((value) => (
                <option key={value} value={value}>
                  {value} л
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formOption}>
            <label>Мощность двигателя, л.с.</label>
            <div className={styles.coverInput}>
              <input
                type="text"
                value={powerText}
                className={styles.coverTop}
                readOnly
              />
              <input
                {...register("power", { required: true })}
                className={styles.coverBottom}
                type="number"
                value={power}
                onChange={handlePowerChange}
              />
              {powerBtn && (
                <div className={styles.clear}>
                  <CloseIcon onClick={clearPower} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.formOption}>
            <label>Двигатель</label>
            <select {...register("engine", { required: true })}>
              <option value="">Выберите</option>
              <option value="Бензин">Бензин</option>
              <option value="Дизель">Дизель</option>
              <option value="Гибрид">Гибрид</option>
              <option value="Электрический">Электрический</option>
              <option value="Турбодизельный">Турбодизельный</option>
            </select>
          </div>
          <div className={styles.formOption}>
            <label>Цена</label>
            <div className={styles.coverInput}>
              <input
                type="text"
                value={priceText}
                className={styles.coverTop}
                readOnly
              />
              <input
                {...register("price", { required: true })}
                className={styles.coverBottom}
                type="number"
                value={price}
                onChange={handlePriceChange}
              />
              {priceBtn && (
                <div className={styles.clear}>
                  <CloseIcon onClick={clearPrice} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.imageOption}>
          <label>Описание</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Описание машины"
          />
        </div>
        <div className="btnPosition">
          <button type="submit">Добавить авто</button>
        </div>
      </form>
    </>
  );
}

export default FormAddCar;
