import React, { useEffect, useState } from "react";
import { Car, CarId } from "./catalog.types";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../../../store";
// import Link from "next/link";
// import { deleteCar } from "../account/types/cars.slice";
// import { RootState } from "@/store";
import CarSlider from "../home/CarSlider";
import styles from "./catalog.module.css";
import classNames from "classnames";
import CloseIcon from "@mui/icons-material/Close";
// import Image from "next/image";
import { useRouter } from "next/router";

export default function CatalogPage({
  cars,
  carsBrandAndModel,
}: {
  cars: Car[];
  carsBrandAndModel: Car[];
}) {
  
  // const { admin } = useSelector((store: RootState) => store.auth.user);
  // const dispatch = useAppDispatch();
  const itemsPerPage = 20; //--------поменять
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
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [displayedCars, setDisplayedCars] = useState(
    cars.slice(0, itemsPerPage)
  );
  const [noMatchingCars, setNoMatchingCars] = useState(false);
  const [minMileageText, setMinMileageText] = useState("");
  const [minMileageBtn, setMinMileageBtn] = useState(false);
  const [maxMileageText, setMaxMileageText] = useState("");
  const [maxMileageBtn, setMaxMileageBtn] = useState(false);
  const [minPriceText, setMinPriceText] = useState("");
  const [minPriceBtn, setMinPriceBtn] = useState(false);
  const [maxPriceText, setMaxPriceText] = useState("");
  const [maxPriceBtn, setMaxPriceBtn] = useState(false);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(carsBrandAndModel.length / itemsPerPage)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const fetchFilteredCarIds = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/cars/filterIds?priceFrom=${minPrice}&priceTo=${maxPrice}&yearFrom=${minYear}&yearTo=${maxYear}&brand=${brandFilter}&model=${modelFilter}&engine=${engineFilter}&transmission=${transmission}&driveUnit=${driveUnit}&litersFrom=${minLiters}&litersTo=${maxLiters}&mileageFrom=${minMileage}&mileageTo=${maxMileage}`
      );
      const data = await res.json();
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      
      return data;
    } catch (error) {
      console.error("Error fetching filtered car IDs:", error);
      return []; 
    }
  };
  
  
  
  // const totalPages = Math.ceil(carsBrandAndModel.length / itemsPerPage);
  const pageButtonsToShow = 5;
  const pageButtonStart = Math.max(
    currentPage - Math.floor(pageButtonsToShow / 2),
    1
  );
  const pageButtonEnd = Math.min(
    pageButtonStart + pageButtonsToShow - 1,
    totalPages
  );

  const fetchCars = async (startIndex: number, endIndex: number) => {
    const res = await fetch(
      `http://localhost:4000/api/cars/filter?priceFrom=${minPrice}&priceTo=${maxPrice}&yearFrom=${minYear}&yearTo=${maxYear}&brand=${brandFilter}&model=${modelFilter}&engine=${engineFilter}&transmission=${transmission}&driveUnit=${driveUnit}&litersFrom=${minLiters}&litersTo=${maxLiters}&mileageFrom=${minMileage}&mileageTo=${maxMileage}&startIndex=${startIndex}&endIndex=${endIndex}`
    );
    return res.json();
  };
 

  const handleSearchAndPageChange = async (
    e: React.FormEvent<HTMLFormElement>,
    page: number
  ) => {
    e.preventDefault();
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredCarIds = await fetchFilteredCarIds()
    const res = await fetchCars(startIndex, endIndex);

    setDisplayedCars(res);
    setCurrentPage(page);
    setNoMatchingCars(res.length === 0);
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

  const handleMinMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinMileage(e.target.value);
    setMinMileageText(e.target.value + " км");
    if (e.target.value !== "") {
      setMinMileageBtn(true);
    }
  };

  const clearMinMileage = () => {
    setMinMileage("");
    setMinMileageText("");
    setMinMileageBtn(false);
  };

  const handleMaxMileageChange = (e: any) => {
    setMaxMileage(e.target.value);
    setMaxMileageText(e.target.value + " км");
    if (e.target.value !== "") {
      setMaxMileageBtn(true);
    }
  };

  const clearMaxMileage = () => {
    setMaxMileage("");
    setMaxMileageText("");
    setMaxMileageBtn(false);
  };

  const handleMinPriceChange = (e: any) => {
    setMinPrice(e.target.value);
    setMinPriceText(e.target.value + " ₽");
    if (e.target.value !== "") {
      setMinPriceBtn(true);
    }
  };

  const clearMinPrice = () => {
    setMinPrice("");
    setMinPriceText("");
    setMinPriceBtn(false);
  };

  const handleMaxPriceChange = (e: any) => {
    setMaxPrice(e.target.value);
    setMaxPriceText(e.target.value + " ₽");
    if (e.target.value !== "") {
      setMaxPriceBtn(true);
    }
  };

  const clearMaxPrice = () => {
    setMaxPrice("");
    setMaxPriceText("");
    setMaxPriceBtn(false);
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

  const startYear = 1927;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

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
          </div>

          <div className={styles.brand}>
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
            <div className={styles.filterOptions}>
              <select
                id="min-liters-filter"
                className={styles.inputLeft}
                value={minLiters}
                onChange={handleMinLitersChange}
              >
                <option value="">Объем от, л</option>
                {[
                  0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
                  1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5,
                  2.6, 2.7, 2.8, 2.9, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0,
                  8.0, 9.0, 10.0,
                ].map((value) => (
                  <option key={value} value={value}>
                    {value} л
                  </option>
                ))}
              </select>
              <select
                id="max-liters-filter"
                value={maxLiters}
                className={styles.inputRight}
                onChange={handleMaxLitersChange}
              >
                <option value="">до</option>
                {[
                  0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
                  1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5,
                  2.6, 2.7, 2.8, 2.9, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0,
                  8.0, 9.0, 10.0,
                ].map((value) => (
                  <option key={value} value={value}>
                    {value} л
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.brand}>
            <div className={styles.filterOptions}>
              <select
                id="min-year-filter"
                className={styles.inputLeft}
                value={minYear}
                onChange={handleMinYearChange}
              >
                <option value="">Год от</option>
                {years
                  .map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))
                  .reverse()}
              </select>
              <select
                id="max-year-filter"
                className={styles.inputRight}
                value={maxYear}
                onChange={handleMaxYearChange}
              >
                <option value="">до</option>
                {years
                  .map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))
                  .reverse()}
              </select>
            </div>
            <div className={styles.filterOptions}>
              <div className={styles.filterLeft}>
                <input
                  type="text"
                  value={minMileageText}
                  className={styles.coverTop}
                  readOnly
                />
                <input
                  id="min-mileage-filter"
                  className={styles.coverBottom}
                  placeholder="Пробег от, км"
                  type="number"
                  value={minMileage}
                  onChange={handleMinMileageChange}
                />
                {minMileageBtn && (
                  <div className={styles.clear}>
                    <CloseIcon onClick={clearMinMileage} />
                  </div>
                )}
              </div>
              <div className={styles.filterRight}>
                <input
                  type="text"
                  value={maxMileageText}
                  className={styles.coverTop}
                  readOnly
                />
                <input
                  id="max-mileage-filter"
                  className={styles.coverBottom}
                  placeholder="до"
                  type="number"
                  value={maxMileage}
                  onChange={handleMaxMileageChange}
                />
                {maxMileageBtn && (
                  <div className={styles.clear}>
                    <CloseIcon onClick={clearMaxMileage} />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.filterOptions}>
              <div className={styles.filterLeft}>
                <input
                  type="text"
                  value={minPriceText}
                  className={styles.coverTop}
                  readOnly
                />
                <input
                  className={styles.coverBottom}
                  id="min-price-filter"
                  placeholder="Цена от, ₽"
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
                {minPriceBtn && (
                  <div className={styles.clear}>
                    <CloseIcon onClick={clearMinPrice} />
                  </div>
                )}
              </div>
              <div className={styles.filterRight}>
                <input
                  type="text"
                  value={maxPriceText}
                  className={styles.coverTop}
                  readOnly
                />
                <input
                  id="max-price-filter"
                  className={styles.coverBottom}
                  placeholder="до"
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
                {maxPriceBtn && (
                  <div className={styles.clear}>
                    <CloseIcon onClick={clearMaxPrice} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="btnPosition">
            <button className={styles.filterBtn} type="submit">
              Показать предложения
            </button>
          </div>
        </form>
        <p className={styles.china}>
          * Цены на сайте указаны в национальной валюте Китая
        </p>
        {noMatchingCars ? (
  <p className={styles.noCarsFound}>Таких машин не найдено</p>
) : (
        <ul className={styles.carsBlock}>
        {displayedCars.map((car) => (
  <li className={styles.listItem} key={car.id}>
      <div className={styles.cardBlock} style={{ cursor: 'pointer' }} onClick={() => window.open(`/car/${car.id}`, '_blank')}>
        <div className={styles.photoBlock}>
          <CarSlider photos={car.photos} />
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.model}>
            {car.brand} {car.model} 
          </div>
          <div className={styles.price}>{car.price} ₽</div>
          <div className={styles.year}>{car.year}</div>
          <div className={classNames(styles.leftItem, styles.engine)}>
            {car.liters} л/{car.power} л.с./{car.engine}
          </div>
          <div className={classNames(styles.centerItem, styles.driveUnit)}>
            {car.driveUnit}
          </div>
          <div className={styles.mileage}>{car.mileage} км</div>
          <div className={classNames(styles.leftItem, styles.transmission)}>
            {car.transmission}
          </div>
          <div className={classNames(styles.centerItem, styles.color)}>
            {car.color}
          </div>
        </div>
      </div>
  </li>
))}
        </ul>
        )}
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Предыдущая
          </button>
          {Array.from(
            { length: pageButtonEnd - pageButtonStart + 1 },
            (_, index) => {
              const pageNumber = index + pageButtonStart;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={
                    pageNumber === currentPage ? styles.activePage : ""
                  }
                >
                  {pageNumber}
                </button>
              );
            }
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Следующая
          </button>
        </div>
        
      </div>
      
    </div>
    
  );
  
}
