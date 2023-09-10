import React, { useCallback, useState } from "react";
import { EditorType } from "./types/editor.type";
import { useAppDispatch } from "@/store";
import { deleteEditors, updateEditors } from "./editor.slice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import styles from "@/components/screens/account/application/application.module.css";

function EditorCard({ editor }: { editor: EditorType }): JSX.Element {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(editor.name);
  const [email, setEmail] = useState(editor.email);
  const [password, setPassword] = useState(editor.password);

  const dispatch = useAppDispatch();

  const deleteEditor = useCallback(() => {
    dispatch(deleteEditors(Number(editor.id)));
  }, [editor.id, dispatch]);

  const handleEdit = (): void => {
    setEdit((prev) => !prev);
  };

  const handleName: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setName(e.target.value);
  };

  const handleEmail: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setEmail(e.target.value);
  };

  const handlePassword: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ): void => {
    setPassword(e.target.value);
  };

  const updateEditor: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    dispatch(
      updateEditors({
        id: editor.id,
        name,
        email,
        password,
        admin: false,
      })
    );
    setEdit((prev) => !prev);
  };

  return (
    <>
      <tr>
        <td>
          <span>ID</span>
          {editor.id}
        </td>
        <td>
          <span>Имя</span>
          {editor.name}
        </td>
        <td>
          <span>E-mail</span>
          {editor.email}
        </td>
        <td>
          <span>Редактировать</span>
          <EditIcon sx={{ fontSize: 25 }} onClick={handleEdit} />
        </td>
        <td>
          <span>Удалить</span>
          <DeleteForeverIcon sx={{ fontSize: 30 }} onClick={deleteEditor} />
        </td>
      </tr>
      {edit && (
        <tr>
          <td colSpan={6} style={{ padding: "2rem 0 0 0" }}>
            <form className={styles.editorForm} onSubmit={updateEditor}>
              <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={handleName}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={handlePassword}
              />
              <button type="submit">Редактировать</button>
            </form>
          </td>
        </tr>
      )}
    </>
  );
}

export default EditorCard;
