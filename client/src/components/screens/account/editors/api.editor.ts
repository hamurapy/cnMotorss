import { EditorId, EditorType } from "./types/editor.type";

export async function loadEditor(): Promise<EditorType[]> {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/editor`);
  return res.json();
}

export const addEditors = async (
  newEditor: EditorType,
): Promise<EditorType> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/editor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({
      name: newEditor.name,
      email: newEditor.email,
      password: newEditor.password,
      admin: newEditor.admin,
    }),
    credentials: 'include',
  });
  return res.json();
};

export const updateEditor = async (updateEditor: EditorType): Promise<EditorType> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/editor/${updateEditor.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({
      name: updateEditor.name,
      email: updateEditor.email,
      password: updateEditor.password,
      admin: updateEditor.admin,
    }),
  });
  const data = await res.json();
  return data;
};

export const deleteEditors = async (
  id: EditorId,
): Promise<number> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/editor/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
};