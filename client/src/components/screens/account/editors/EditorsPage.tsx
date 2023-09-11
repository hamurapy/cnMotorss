import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store";
import { addEditors, loadEditor } from "./editor.slice";
import { useSelector } from "react-redux";
import EditorCard from "./EditorCard";
import styles from "@/components/screens/account/application/application.module.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountMenu from "../AccountMenu";

function Editors(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const editors = useSelector((state: RootState) => state.editor.editorList);

  useEffect(() => {
    dispatch(loadEditor());
  }, [dispatch]);

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    const newEditor = {
      name,
      email,
      password,
      admin: false,
    };
    dispatch(addEditors(newEditor));
  };

  const users = editors.filter((editor) => !editor.admin);

  const sortedEditors = users.slice().sort((a, b) => {
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

  const totalPages = Math.ceil(sortedEditors.length / itemsPerPage);

  const goToPreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEditors = sortedEditors.slice(startIndex, endIndex);

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
          <h3>Редакторы</h3>
          <form className={styles.editorForm} onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleName}
              placeholder="Имя"
            />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="E-mail"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Пароль"
            />
            <button type="submit">Добавить</button>
          </form>

          <table className={styles.respTab}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>E-mail</th>
                <th>Редактировать</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {sortedEditors.length > 0 ? (
                currentEditors.map((editor) => {
                  return <EditorCard key={editor.id} editor={editor} />;
                })
              ) : (
                <tr>
                  <td colSpan={6}>Редакторов нет</td>
                </tr>
              )}
            </tbody>
          </table>
          {sortedEditors.length > 9 && (
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
                {startIndex + 1}-{Math.min(endIndex, sortedEditors.length)} из{" "}
                {sortedEditors.length}
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

export default Editors;
