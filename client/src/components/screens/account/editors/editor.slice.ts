import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiEditor from './api.editor';
import { EditorId, EditorState, EditorType } from './types/editor.type';


const initialState: EditorState = {
  editorList: [],
  error: undefined 
};

export const loadEditor = createAsyncThunk('editor/loadEditor', async () => {
  const editors = await apiEditor.loadEditor();
  return editors;
});

export const addEditors = createAsyncThunk(
  'editor/addEditors',
  (newEditor: EditorType) =>
    apiEditor.addEditors(newEditor),
);

export const updateEditors = createAsyncThunk(
  'editor/updateEditors',
  (updateEditor: EditorType) =>
    apiEditor.updateEditor(updateEditor),
);

export const deleteEditors = createAsyncThunk(
  'editor/deleteEditors',
  (delEditorsId: EditorId) =>
    apiEditor.deleteEditors(delEditorsId),
);

const editorsSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(loadEditor.fulfilled, (state, action) => {
      state.editorList = action.payload;
    })
    .addCase(addEditors.fulfilled, (state, action) => {
      state.editorList.unshift(action.payload);
    })
    .addCase(addEditors.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(updateEditors.fulfilled, (state, action) => {
      state.editorList = state.editorList.map((editor) =>
      editor.id === action.payload.id ? action.payload : editor,
      );
    })
    .addCase(updateEditors.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(deleteEditors.fulfilled, (state, action) => {
      state.editorList = state.editorList.filter(
        (editor) => editor.id !== action.payload,
      );
    })
    .addCase(deleteEditors.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default editorsSlice.reducer;