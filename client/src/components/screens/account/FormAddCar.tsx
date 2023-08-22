import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CarWithOutId } from '../catalog/catalog.types';
import { useAppDispatch } from '../../../store';
import { addCar } from './redux/carsSlice';

function FormAddCar(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<CarWithOutId>();

  const onSubmit: SubmitHandler<CarWithOutId> = (data) => {
    const formData = new FormData();

    Object.keys(data.img).forEach((key: any) => {
      formData.append('img', data.img[key]);
    });

    formData.append('brand', data.brand);
    formData.append('model', data.model);
    formData.append('engine', data.engine);
    formData.append('year', data.year.toString());
    formData.append('mileage', data.mileage.toString());
    formData.append('power', data.power.toString());
    formData.append('price', data.price.toString());
    formData.append('driveUnit', data.driveUnit);
    formData.append('transmission', data.transmission);
    formData.append('description', data.description);

    console.log(Array.from(formData));

    dispatch(addCar(formData));
    // reset();
  };

  return (
    <div>
      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
        <label className="form__label">
          Brand
          <input {...register('brand', { required: true })} />
        </label>
        <div>{errors.brand && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Model
          <input {...register('model', { required: true })} />
        </label>
        <div>{errors.model && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Engine
          <select
            {...register('engine', { required: true })}
          >
               <option value="">Выберите вариант</option>
             <option value="вариант1">Бензиновый</option>
                <option value="вариант2">Дизельный</option>
                <option value="вариант3">Электрический</option>
                <option value="вариант4">Гибридный</option>
                <option value="вариант5">Турбодизельный</option>
          </select>
        </label>
        <div>{errors.engine && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Year
          <input {...register('year', { required: true })} />
        </label>
        <div>{errors.year && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Mileage
          <input {...register('mileage', { required: true })} />
        </label>
        <div>{errors.mileage && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Power
          <input {...register('power', { required: true })} />
        </label>
        <div>{errors.power && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Drive unit
          <select
            {...register('driveUnit', { required: true })}
          >
               <option value="">Выберите вариант</option>
             <option value="вариант1">Передний</option>
                <option value="вариант2">Задний</option>
                <option value="вариант3">Полный</option>
                <option value="вариант4">Постоянный полный</option>
          </select>
        </label>
        <div>{errors.driveUnit && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Transmission
          <select
            {...register('transmission', { required: true })}
          >
            <option value="">Выберите вариант</option>
            <option value="вариант1">Механическая</option>
            <option value="вариант2">Автоматическая</option>
            <option value="вариант3">Роботизированная</option>
          </select>
        </label>
        <div>{errors.transmission && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Price
          <input {...register('price', { required: true })} />
        </label>
        <div>{errors.price && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Description
          <input {...register('description', { required: true })} />
        </label>
        <div>{errors.description && <p>Заполните все поля!</p>}</div>
        <label className="form__label">
          Image
          <input
            type="file"
            {...register('img', { required: true })}
            multiple
          />
        </label>
        <button type="submit">Добавить Ta4чку</button>
      </form>
    </div>
  );
}

export default FormAddCar;
