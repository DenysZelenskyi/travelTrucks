import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_CONFIG } from "../constants/config";

/**
 * Async thunk to fetch all campers from the API
 * @returns {Promise} - Promise that resolves with the campers data
 */
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async () => {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAMPERS}`
    );
    return response.data;
  }
);

/**
 * Async thunk to fetch a single camper by ID from the API
 * @param {string} id - The ID of the camper to fetch
 * @returns {Promise} - Promise that resolves with the camper data
 */
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id) => {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAMPER_BY_ID(id)}`
    );
    return response.data;
  }
);

/**
 * Redux slice for managing campers state
 * Handles loading, error, and success states for API requests
 */
const campersSlice = createSlice({
  name: "campers",
  initialState: {
    campers: [],
    camperDetail: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchCampers states
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle fetchCamperById states
      .addCase(fetchCamperById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.camper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default campersSlice.reducer;
