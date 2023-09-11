import React, { useEffect, useState } from "react";
import { loadApplication } from "./application.slice";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import styles from "./application.module.css";
import ApplicationCard from "./ApplicationCard";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountMenu from "../AccountMenu";

function Application(): JSX.Element {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(loadApplication());
  }, [dispatch]);

  const applications = useSelector(
    (state: RootState) => state.application.applicationList
  );
  const sortedApplications = applications.slice().sort((a, b) => {
    if (a.id === undefined || b.id === undefined) {
      if (a.id === undefined && b.id === undefined) {
        return 0;
      } else if (a.id === undefined) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return b.id - a.id;
    }
  });

  const applicationsNew = sortedApplications.filter(
    (app) => app.status === "Новая"
  );
  const applicationsProcess = sortedApplications.filter(
    (app) => app.status === "В процессе"
  );
  const applicationsProcessed = sortedApplications.filter(
    (app) => app.status === "Обработана"
  );

  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);
  const totalPagesNew = Math.ceil(applicationsNew.length / itemsPerPage);
  const totalPagesProcess = Math.ceil(
    applicationsProcess.length / itemsPerPage
  );
  const totalPagesProcessed = Math.ceil(
    applicationsProcessed.length / itemsPerPage
  );
  const goToPreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = sortedApplications.slice(startIndex, endIndex);
  const currentApplicationsNew = applicationsNew.slice(startIndex, endIndex);
  const currentApplicationsProcess = applicationsProcess.slice(
    startIndex,
    endIndex
  );
  const currentApplicationsProcessed = applicationsProcessed.slice(
    startIndex,
    endIndex
  );
  const handleItemsPerPageChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="accountContent">
        <AccountMenu />
        <div className="accountWrap">
          <h3>Заявки</h3>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label={`Все (${applications.length})`} value="1" />
                  <Tab label={`Новые (${applicationsNew.length})`} value="2" />
                  <Tab
                    label={`В процессе (${applicationsProcess.length})`}
                    value="3"
                  />
                  <Tab
                    label={`Обработаны (${applicationsProcessed.length})`}
                    value="4"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <table className={styles.respTab}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Имя</th>
                      <th>E-mail</th>
                      <th>Телефон</th>
                      <th>Сообщение</th>
                      <th>Авто</th>
                      <th>Дата</th>
                      <th>Статус</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedApplications.length > 0 ? (
                      currentApplications.map((app) => {
                        return <ApplicationCard key={app.id} app={app} />;
                      })
                    ) : (
                      <tr>
                        <td colSpan={9}>Заявок нет</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {sortedApplications.length > 9 && (
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
                      {startIndex + 1}-
                      {Math.min(endIndex, sortedApplications.length)} из{" "}
                      {sortedApplications.length}
                    </span>
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
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
              </TabPanel>
              <TabPanel value="2">
                <table className={styles.respTab}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Имя</th>
                      <th>E-mail</th>
                      <th>Телефон</th>
                      <th>Сообщение</th>
                      <th>Авто</th>
                      <th>Дата</th>
                      <th>Статус</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationsNew.length > 0 ? (
                      currentApplicationsNew.map((app) => {
                        return <ApplicationCard key={app.id} app={app} />;
                      })
                    ) : (
                      <tr>
                        <td colSpan={9}>Заявок нет</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {applicationsNew.length > 9 && (
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
                      {startIndex + 1}-
                      {Math.min(endIndex, applicationsNew.length)} из{" "}
                      {applicationsNew.length}
                    </span>
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <NavigateBeforeIcon />
                    </button>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPagesNew}
                    >
                      <NavigateNextIcon />
                    </button>
                  </div>
                )}
              </TabPanel>
              <TabPanel value="3">
                <table className={styles.respTab}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Имя</th>
                      <th>E-mail</th>
                      <th>Телефон</th>
                      <th>Сообщение</th>
                      <th>Авто</th>
                      <th>Дата</th>
                      <th>Статус</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationsProcess.length > 0 ? (
                      currentApplicationsProcess.map((app) => {
                        return <ApplicationCard key={app.id} app={app} />;
                      })
                    ) : (
                      <tr>
                        <td colSpan={9}>Заявок нет</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {applicationsProcess.length > 9 && (
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
                      {startIndex + 1}-
                      {Math.min(endIndex, applicationsProcess.length)} из{" "}
                      {applicationsProcess.length}
                    </span>
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <NavigateBeforeIcon />
                    </button>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPagesProcess}
                    >
                      <NavigateNextIcon />
                    </button>
                  </div>
                )}
              </TabPanel>
              <TabPanel value="4">
                <table className={styles.respTab}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Имя</th>
                      <th>E-mail</th>
                      <th>Телефон</th>
                      <th>Сообщение</th>
                      <th>Авто</th>
                      <th>Дата</th>
                      <th>Статус</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationsProcessed.length > 0 ? (
                      currentApplicationsProcessed.map((app) => {
                        return <ApplicationCard key={app.id} app={app} />;
                      })
                    ) : (
                      <tr>
                        <td colSpan={9}>Заявок нет</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {applicationsProcessed.length > 9 && (
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
                      {startIndex + 1}-
                      {Math.min(endIndex, applicationsProcessed.length)} из{" "}
                      {applicationsProcessed.length}
                    </span>
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <NavigateBeforeIcon />
                    </button>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPagesProcessed}
                    >
                      <NavigateNextIcon />
                    </button>
                  </div>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Application;
