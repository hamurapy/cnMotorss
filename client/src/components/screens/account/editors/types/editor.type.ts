export type EditorType = {
  id?: number,
  name: string,
  email: string,
  password: string,
  admin: boolean,
}

export type EditorId = EditorType['id'];

export type EditorState = {
  editorList: EditorType[];
  error: string | undefined;
};
