/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { Car, CarId } from "./catalog.types"
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import styles from './catalog.module.css'
import Link from "next/link"
import { deleteCar } from '../account/redux/carsSlice';
import { RootState } from "@/store";
import { useState } from "react";

export default function CatalogPage({ cars }: {cars: Car[]}) {
  const { admin } = useSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();

  const delCar = (carId: CarId): void => {
    dispatch(deleteCar(Number(carId)));
    // window.location.reload()
  };
  // useEffect(() => {
  //   async function getStaticProps() {
  //     const res = await fetch('http://localhost:4000/api/cars')
  //     const cars = await res.json()
  //     return {
  //       props: {
  //         cars,
  //       },
  //     }
  //   }
  // }, [cars]);

  const brands = Array.from(new Set(cars.map((car) => car.brand)));
  const [brandFilter, setBrandFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  
  const filteredModels = cars
    .filter((car) => car.brand === brandFilter)
    .map((car) => car.model);

    const handleMinPriceChange = (e: any) => {
      setMinPrice(e.target.value);
    };
    
    const handleMaxPriceChange = (e: any) => {
      setMaxPrice(e.target.value);
    };

    const handleMinYearChange = (e: any) => {
      setMinYear(e.target.value);
    };
    
    const handleMaxYearChange = (e: any) => {
      setMaxYear(e.target.value);
    };

    const handleFindClick = () => {
      setSearchClicked(true);
    };
    
    const handleBrandChange = (e: any) => {
      const selectedBrand = e.target.value;
      setBrandFilter(selectedBrand);
      setModelFilter('');  
    };
    
    const handleModelChange = (e: any) => {
      const selectedModel = e.target.value;
      if (brandFilter && selectedModel === '') {
        setModelFilter('');
      } else {
        setModelFilter(selectedModel);
      }
    };

    const filteredCars = cars.filter((car) => {
      if (!searchClicked) {
        return true;
      }
      if (brandFilter && car.brand !== brandFilter) {
        return false;
      }
      if (modelFilter && car.model !== modelFilter) {
        return false;
      }
      if (minPrice && parseFloat(car.price) < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice && parseFloat(car.price) > parseFloat(maxPrice)) {
        return false;
      }
      if (minYear && parseInt(car.year) < parseInt(minYear)) {
        return false;
      }
      if (maxYear && parseInt(car.year) > parseInt(maxYear)) {
        return false;
      }
      return true;
    });

  return (
    <div className={styles.contentBlock}>
      <h1>Каталог</h1>
      <div>
        <label htmlFor="brand-filter">Бренд:</label>
        <select
          id="brand-filter"
          value={brandFilter}
          onChange={handleBrandChange}
        >
          <option value="">выберите бренд</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
<div>
        <label htmlFor="model-filter">Модель:</label>
        <select
          id="model-filter"
          value={modelFilter}
          onChange={handleModelChange}
          disabled={!brandFilter}
        >
          <option value="">выберите модель</option>
          {filteredModels
    .filter((model, index, self) => 
      self.findIndex(m => m === model) === index
    )
    .map((model) => (
      <option key={model} value={model}>{model}</option>
    ))}
        </select>
      </div>
      <label htmlFor="min-price-filter">Минимальная цена:</label>
<input
  id="min-price-filter"
  type="number"
  value={minPrice}
  onChange={handleMinPriceChange}
/>

<label htmlFor="max-price-filter">Максимальная цена:</label>
<input
  id="max-price-filter"
  type="number"
  value={maxPrice}
  onChange={handleMaxPriceChange}
/>
<label htmlFor="min-year-filter">Минимальный год:</label>
<input
  id="min-year-filter"
  type="number"
  value={minYear}
  onChange={handleMinYearChange}
/>

<label htmlFor="max-year-filter">Максимальный год:</label>
<input
  id="max-year-filter"
  type="number"
  value={maxYear}
  onChange={handleMaxYearChange}
/>
<button onClick={handleFindClick}>Find</button>
      <ul className={styles.carsBlock}>
        {filteredCars.map((car) => (
          <li key={car.id}>
            <Link href={`/car/${car.id}`}>
            <div className={styles.imgBlock}>
              <Image
					      src={`http://localhost:4000${car.photos[0].img}`}
                alt={`${car.brand} ${car.model}`}
                priority={true}
                width={0}
                height={0}
                layout="fill"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				      />
            </div>
            <div className={styles.infoBlock}>
              <span>{car.brand}</span>
              <span>{car.model}</span>
            </div>
            </Link>
           { 1 && <div className={styles.infoBlock}>
              <button className={styles.change}>Изменить</button>
              <button className={styles.delete} onClick={()=>delCar(car.id)} >Удалить</button>
            </div> }
          </li>
        ))}
      </ul>
    </div>
  )
}
 
