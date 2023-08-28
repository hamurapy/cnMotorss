import React, { useEffect, useState } from 'react';
import { Car, CarId } from "./catalog.types";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import styles from './catalog.module.css';
import Link from "next/link";
import { deleteCar } from '../account/redux/carsSlice';
import { RootState } from "@/store";       
import CarSlider from "../home/CarSlider";
import { useRouter } from 'next/router';

export default function CatalogPage({ cars,carsBrandAndModel }: { cars: Car[],carsBrandAndModel: Car[] }) {
  const { admin } = useSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();
  const itemsPerPage = 20;//--------поменять
  const router = useRouter();
  const initialPage = parseInt(router.query.page as string) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [engineFilter, setEngineFilter] = useState("");
  const [transmission, setTransmission] = useState("");
  const [driveUnit, setDriveUnit] = useState("");
  const [minLiters, setMinLiters] = useState("");
  const [maxLiters, setMaxLiters] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [brandFilter, setBrandFilter] = useState(""); // Add this line
  const [modelFilter, setModelFilter] = useState(""); // Add this line
  const [displayedCars, setDisplayedCars] = useState(cars.slice(0, itemsPerPage)); 

  useEffect(() => {
    if (router.query.page) {
      const newPage = parseInt(router.query.page as string);
      setCurrentPage(newPage);
    }
  }, [router.query.page]);

  const handleGoToCarDetails = (carId: string) => {
    router.push(`/car/${carId}?page=${currentPage}`);
  };

  const totalPages = Math.ceil(carsBrandAndModel.length / itemsPerPage);
  const pageButtonsToShow = 5; 
  const pageButtonStart = Math.max(currentPage - Math.floor(pageButtonsToShow / 2), 1);
  const pageButtonEnd = Math.min(pageButtonStart + pageButtonsToShow - 1, totalPages);
  
  const fetchCars = async (startIndex: number, endIndex: number) => {
    const res = await fetch(
      `http://localhost:4000/api/cars/filter?priceFrom=${minPrice}&priceTo=${maxPrice}&yearFrom=${minYear}&yearTo=${maxYear}&brand=${brandFilter}&model=${modelFilter}&engine=${engineFilter}&transmission=${transmission}&driveUnit=${driveUnit}&litersFrom=${minLiters}&litersTo=${maxLiters}&mileageFrom=${minMileage}&mileageTo=${maxMileage}&startIndex=${startIndex}&endIndex=${endIndex}`
    );
    return res.json();
  };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const res = await fetchCars(startIndex, endIndex);
    setDisplayedCars(res); 
    setCurrentPage(page);
    router.push(`/catalog?page=${page}`);
  };

  const handleSearchAndPageChange = async (e: React.FormEvent<HTMLFormElement>, page: number) => {
    e.preventDefault();
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const res = await fetchCars(startIndex, endIndex);
    setDisplayedCars(res); 
    setCurrentPage(page);
    router.push(`/catalog?page=${page}`);
  };

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

  const handleEngineFilterChange = (e: any) => {
    setEngineFilter(e.target.value);
  };

  const handleTransmissionChange = (e: any) => {
    setTransmission(e.target.value);
  };

  const handleDriveUnitChange = (e: any) => {
    setDriveUnit(e.target.value);
  };

  const handleMinLitersChange = (e: any) => {
    setMinLiters(e.target.value);
  };

  const handleMaxLitersChange = (e: any) => {
    setMaxLiters(e.target.value);
  };

  const handleMinMileageChange = (e: any) => {
    setMinMileage(e.target.value);
  };

  const handleMaxMileageChange = (e: any) => {
    setMaxMileage(e.target.value);
  };

  const handleBrandChange = (e: any) => {
    const selectedBrand = e.target.value;
    setBrandFilter(selectedBrand);
    setModelFilter("");
  };

  const handleModelChange = (e: any) => {
    const selectedModel = e.target.value;

    if (brandFilter && selectedModel === "") {
      setModelFilter("");
    } else {
      setModelFilter(selectedModel);
    }
  };

  const brands = Array.from(new Set(carsBrandAndModel.map((car) => car.brand)));
  const filteredModels = carsBrandAndModel
    .filter((car) => car.brand === brandFilter)
    .map((car) => car.model);

  return (
    <div className="contentBlock">
      <h1>Каталог</h1>
      <div className={styles.catalogBlock}>
        <form onSubmit={(e) => handleSearchAndPageChange(e, 1)}>
          <div className={styles.brand}>
            <select
              id="brand-filter"
              value={brandFilter}
              onChange={handleBrandChange}
            >
              <option value="">Марка</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              id="engine-filter"
              value={engineFilter}
              onChange={handleEngineFilterChange}
            >
              <option value="">Двигатель</option>
              <option value="Бензин">Бензин</option>
              <option value="Дизель">Дизель</option>
              <option value="Гибрид">Гибрид</option>
              <option value="Электрический">Электрический</option>
              <option value="Турбодизельный">Турбодизельный</option>
            </select>
            <select
              id="transmission-filter"
              value={transmission}
              onChange={handleTransmissionChange}
            >
              <option value="">Коробка</option>
              <option value="Автомат">Автомат</option>
              <option value="Механика">Механика</option>
              <option value="Робот">Робот</option>
            </select>
            <select
              id="driveUnit-filter"
              value={driveUnit}
              onChange={handleDriveUnitChange}
            >
              <option value="">Привод</option>
              <option value="Передний">Передний</option>
              <option value="Задний">Задний</option>
              <option value="Полный">Полный</option>
              <option value="Постоянный полный">Постоянный полный</option>
            </select>
            <select
              id="model-filter"
              value={modelFilter}
              onChange={handleModelChange}
              disabled={!brandFilter}
            >
              <option value="">Модель</option>
              {filteredModels
                .filter(
                  (model, index, self) =>
                    self.findIndex((m) => m === model) === index
                )
                .map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.brand}>
            <div className={styles.filterOptions}>
              <input
                className={styles.inputLeft}
                id="min-price-filter"
                placeholder="Цена от"
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <input
                id="max-price-filter"
                className={styles.inputRight}
                placeholder="до"
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
            <div className={styles.filterOptions}>
              <input
                id="min-year-filter"
                className={styles.inputLeft}
                placeholder="Год от"
                type="number"
                value={minYear}
                onChange={handleMinYearChange}
              />
              <input
                id="max-year-filter"
                className={styles.inputRight}
                placeholder="до"
                type="number"
                value={maxYear}
                onChange={handleMaxYearChange}
              />
            </div>
            <select
              id="min-liters-filter"
              value={minLiters}
              onChange={handleMinLitersChange}
            >
              <option value="">Литры от</option>
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
            <select
              id="max-liters-filter"
              value={maxLiters}
              onChange={handleMaxLitersChange}
            >
              <option value="">до</option>
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
            <input
              id="min-mileage-filter"
              className={styles.inputLeft}
              placeholder="Пробег от"
              type="number"
              value={minMileage}
              onChange={handleMinMileageChange}
            />
            <input
              id="max-mileage-filter"
              className={styles.inputRight}
              placeholder="до"
              type="number"
              value={maxMileage}
              onChange={handleMaxMileageChange}
            />
          </div>
          <div className="btnPosition">
            <button type="submit">Показать предложения</button>
          </div>
        </form>
        <p className={styles.china}>
          * Цены на сайте указаны в национальной валюте Китая
        </p>
        <ul className={styles.carsBlock}>
          {displayedCars.map((car) => (
            <li className={styles.listItem} key={car.id}>
              <Link href={`/car/${car.id}?page=${currentPage}`}>
                <div className={styles.cardBlock}>
                  <div className={styles.photoBlock}>
                    <CarSlider photos={car.photos} />{" "}
                  </div>
                  <div className={styles.infoBlock}>
                    <div className={styles.model}>
                      {car.brand} {car.model}
                    </div>
                    <div className={styles.price}>{car.price} ₽</div>
                    <div className={styles.year}>{car.year}</div>
                    <span className={styles.leftItem}>
                      {car.liters} л/{car.power} л.с./{car.engine}
                    </span>
                    <span className={styles.centerItem}>{car.driveUnit}</span>
                    <span className={styles.mileage}>{car.mileage} км</span>
                    <span className={styles.leftItem}>{car.transmission}</span>
                    <span className={styles.centerItem}>{car.color}</span>
                  </div>
                </div>
              </Link>
              
            </li>
          ))}
        </ul>
        <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Предыдущая
        </button>
        {Array.from({ length: pageButtonEnd - pageButtonStart + 1 }, (_, index) => {
          const pageNumber = index + pageButtonStart;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={pageNumber === currentPage ? styles.activePage : ""}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Следующая
        </button>
      </div>
    </div>
    </div>
  )
      }