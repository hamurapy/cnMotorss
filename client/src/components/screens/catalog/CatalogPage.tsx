/* eslint-disable @next/next/no-img-element */
import { Car } from "./catalog.types"
import Image from 'next/image'
import { useSelector } from 'react-redux';
import styles from './catalog.module.css'
import Link from "next/link"
import { RootState } from "@/store";
import { useState } from "react";

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
           { admin && <div className={styles.infoBlock}>
              <button className={styles.change}>Изменить</button>
              <button className={styles.delete}>Удалить</button>
            </div> }
          </li>
        ))}
      </ul>
    </div>
  )
}
 
