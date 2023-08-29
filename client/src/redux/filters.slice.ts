import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minPrice: "",
  maxPrice: "",
  minYear: "",
  maxYear: "",
  brandFilter: '',
  modelFilter: '',
  engineFilter:'',
  transmission:'',
  driveUnit:'',
  minLiters:'',
  maxLiters:'',
  minMileage:'',
  maxMileage:'',
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state:any, action) => {
      const { filterName, value } = action.payload;
      state[filterName] = value;
    },
    
  },
});

export const { setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
