import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiApplication from './api.application';
import { ApplicationId, ApplicationState, ApplicationType } from './types/application.type';


const initialState: ApplicationState = {
  applicationList: [],
  error: undefined 
};

export const loadApplication = createAsyncThunk('application/loadApplication', async () => {
  const applications = await apiApplication.loadApplication();
  return applications;
});

export const addApplications = createAsyncThunk(
  'application/addApplications',
  (newApplication: ApplicationType) =>
    apiApplication.addApplications(newApplication),
);

export const updateApplications = createAsyncThunk(
  'application/updateApplications',
  (updateApplication: ApplicationType) =>
    apiApplication.updateApplication(updateApplication),
);

export const deleteApplications = createAsyncThunk(
  'applications/deleteApplications',
  (delApplicationsId: ApplicationId) =>
    apiApplication.deleteApplications(delApplicationsId),
);

const applicationsSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(loadApplication.fulfilled, (state, action) => {
      state.applicationList = action.payload;
    })
    .addCase(addApplications.fulfilled, (state, action) => {
      state.applicationList.unshift(action.payload);
    })
    .addCase(addApplications.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(updateApplications.fulfilled, (state, action) => {
      state.applicationList = state.applicationList.map((application) =>
      application.id === action.payload.id ? action.payload : application,
      );
    })
    .addCase(updateApplications.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(deleteApplications.fulfilled, (state, action) => {
      state.applicationList = state.applicationList.filter(
        (application) => application.id !== action.payload,
      );
    })
    .addCase(deleteApplications.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default applicationsSlice.reducer;