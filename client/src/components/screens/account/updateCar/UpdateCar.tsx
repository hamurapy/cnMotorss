import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store";
import { loadCars } from "@/components/screens/account/types/cars.slice";
import { useSelector } from "react-redux";
import UpdateCard from "./UpdateCard";
import styles from "./updateCar.module.css";
import AccountMenu from "../AccountMenu";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import { Car } from "../../catalog/catalog.types";

export default function UpdateCar(): JSX.Element {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(loadCars());
  }, [dispatch]);

  const cars = useSelector((state: RootState) => state.cars.cars);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const goToPreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const handleItemsPerPageChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const searchValue = parseInt(searchQuery, 10);
    if (!isNaN(searchValue)) {
      const filtered = cars.filter(
        (car) => car.id === parseInt(searchQuery, 10)
      );
      setFilteredCars(filtered);
    } else {
      const filtered = cars.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCars(filtered);
    }

    setSearchQuery("");
  };
  return (
    <>
      <div className="accountContent">
        <AccountMenu />
        <div className="accountWrap">
          <h3>Редактировать</h3>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Поиск в каталоге"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
          <ul className={styles.carsBlock}>
            {filteredCars.length > 0 ? (
              currentCars.map((car) => {
                return <UpdateCard key={car.id} car={car} />;
              })
            ) : (
              <div
                style={{ width: "100%", textAlign: "center", margin: "2rem" }}
              >
                Машин в каталоге нет
              </div>
            )}
          </ul>
          {filteredCars.length > 9 && (
            <div className={styles.paginationBlock}>
              <div className={styles.paginationSelect}>
                Показать:
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <span>
                {startIndex + 1}-{Math.min(endIndex, filteredCars.length)}
                &nbsp;из&nbsp;
                {filteredCars.length}
              </span>
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                <NavigateBeforeIcon />
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <NavigateNextIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
