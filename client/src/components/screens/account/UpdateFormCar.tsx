
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Car } from '../catalog/catalog.types';
import { useAppDispatch } from '../../../store';
import { updateCar } from './redux/carsSlice';

export default function UpdateCar({ car }: { car: Car }): JSX.Element {
  const [modal, setModal] = useState(true);
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: car,
  });

  const dispatch = useAppDispatch();

  const onSubmit = (formData: Car): void => {

    const formDataObj = new FormData();

    if (formData.img) {
      for (let key in formData.img) {
        formDataObj.append('img', formData.img[key]);
      }
    }
    formDataObj.append('brand', formData.brand);
    formDataObj.append('model', formData.model);
    formDataObj.append('color', formData.color);
    formDataObj.append('liters', formData.liters.toString());
    formDataObj.append('wheel', formData.wheel);
    formDataObj.append('engine', formData.engine);
    formDataObj.append('year', formData.year.toString());
    formDataObj.append('mileage', formData.mileage.toString());
    formDataObj.append('power', formData.power.toString());
    formDataObj.append('price', formData.price.toString());
    formDataObj.append('driveUnit', formData.driveUnit);
    formDataObj.append('transmission', formData.transmission);
    formDataObj.append('description', formData.description);
    formDataObj.append('id', car.id);
console.log(formDataObj);

    
    dispatch(updateCar(
        formDataObj ,
         setModal(!modal),
         window.location.reload()
        ));
  };

  return (
    <span>
        {modal ? (
        <button
          className="form__btn"
          type="button"
          onClick={() => setModal(!modal)}
        >
          Изменить параметры
        </button>
      ) : (
      <div className="cont_form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input {...register('brand')} />
            <label htmlFor="brand">бренд</label>
          </div>
          <div>
            <input {...register('model')} />
            <label htmlFor="model">модель</label>
          </div>
          <div>
            <input {...register('year')} />
            <label htmlFor="year">год</label>
          </div>
          <div>
            <input {...register('mileage')} />
            <label htmlFor="mileage">пробег</label>
          </div>
          <div>
            <input {...register('color')} />
            <label htmlFor="color">цвет</label>
          </div>
          <div>
          <select
                {...register('liters')}
              >
                <option value="">Выберите вариант</option>
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
            <label htmlFor="liters">объем л</label>
          </div>
          <div>
            <input {...register('wheel')} />
            <label htmlFor="wheel">руль</label>
          </div>
          <div>
          <select
                {...register('engine')}
              >
                <option value="">Выберите вариант</option>
                <option value="Бензиновый">Бензиновый</option>
                <option value="Дизельный">Дизельный</option>
                <option value="Электрический">Электрический</option>
                <option value="Гибридный">Гибридный</option>
                <option value="Турбодизельный">Турбодизельный</option>
              </select>
              <label htmlFor="engine">двигатель</label>
          </div>
          <div>
            <input {...register('power')} />
            <label htmlFor="power">мощность</label>
          </div>
          <div>
            <input {...register('price')} />
            <label htmlFor="price">цена</label>
          </div>
          <div>
          <select {...register('driveUnit')} >
                <option value="">Выберите вариант</option>
                <option value="Передний">Передний</option>
                <option value="Задний">Задний</option>
                <option value="Полный">Полный</option>
                <option value="Постоянный полный">Постоянный полный</option>
              </select>
            <label htmlFor="driveUnit">привод</label>
          </div>
          <div>
          <select {...register('transmission')}>
                <option value="">Выберите вариант</option>
                <option value="Механическая">Механическая</option>
                <option value="Автоматическая">Автоматическая</option>
                <option value="Роботизированная">Роботизированная</option>
              </select>
            <label htmlFor="transmission">коробка передач</label>
          </div>
          <div>
            <input {...register('description')} />
            <label htmlFor="description">описание</label>
          </div>
          <div>
          <label className="form__label">
          Добавить фото
          <input
            type="file"
            {...register('img')}
            multiple
          />
        </label>
          </div>
          <button type="submit">подтвердить</button>
        </form>
      </div>
      )}
    </span>
  );
}
