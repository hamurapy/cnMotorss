/* eslint-disable @next/next/no-img-element */
import { Car } from "./catalog.types"
import { useSelector } from 'react-redux';
import styles from './catalog.module.css'
import Link from "next/link"
import { RootState } from "@/store";
import { useState } from "react";
import CarSlider from "../home/CarSlider";

export default function CatalogPage({ cars }: {cars: Car[]}) {
  const { admin } = useSelector((store: RootState) => store.auth.user);

  const brands = Array.from(new Set(cars.map((car) => car.brand)));
  const [brandFilter, setBrandFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  
  const filteredModels = cars
    .filter((car) => car.brand === brandFilter)
    .map((car) => car.model);
    
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
    if (brandFilter && car.brand !== brandFilter) {
      return false;
    }
    if (modelFilter && car.model !== modelFilter) {
      return false;
    }
    return true;
  });
  console.log(filteredModels);
  

  
  return (
    <div className={styles.contentBlock}>
      <h1>Каталог</h1>
      <div className={styles.catalogBlock}>
        <div className={styles.filter}>
          <div>
            <label htmlFor="brand-filter">Бренд:</label>
            <select
              id="brand-filter"
              value={brandFilter}
              onChange={handleBrandChange}
            >
              <option value="">Марка</option>
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
      </div>
      <ul className={styles.carsBlock}>
        {filteredCars.map((car) => (
          <li key={car.id}>
            <Link href={`/car/${car.id}`}>
              <div className={styles.photoBlock}>
              <CarSlider photos={car.photos}/> </div>
              <div className={styles.infoBlock}>
                <span className={styles.model}>{car.brand} {car.model}</span>
                <span className={styles.price}>{car.price} ₽</span>
              </div>
              <div className={styles.infoItems}>
                <span>{car.year}</span>
                <span>{car.mileage} км</span>
                <span>{car.power} л.с./{car.engine}</span>
                <span>{car.driveUnit}</span>
                <span>{car.transmission}</span>
              </div>
            </Link>
           { admin && <div className={styles.infoBlock}>
              <button className={styles.change}>Изменить</button>
              <button className={styles.delete}>Удалить</button>
            </div> } 
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}
 
