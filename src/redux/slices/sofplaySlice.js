// src/redux/slices/softplaySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import softplayService from "../../core/services/softplayService";

// 🧠 Başlangıç verilerini yükle
export const fetchSoftplayData = createAsyncThunk(
  "softplay/fetchData",
  async () => {
    const families = await softplayService.getFamilies();
    const children = await softplayService.getChildren();
    const durations = await softplayService.getDurations();
    return { families, children, durations };
  }
);

const softplaySlice = createSlice({
  name: "softplay",
  initialState: {
    families: [],
    children: [],
    durations: [],
    loading: false,
  },
  reducers: {
    // --- FAMILY CRUD ---
    addFamily: (state, action) => {
      state.families.push(action.payload);
      softplayService.saveFamilies(state.families);
    },
    updateFamily: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.families.findIndex((f) => f.id === id);
      if (index !== -1)
        state.families[index] = { ...state.families[index], ...updates };
      softplayService.saveFamilies(state.families);
    },
    deleteFamily: (state, action) => {
      const id = action.payload;
      state.families = state.families.filter((f) => f.id !== id);
      // Velisi silinen çocukların parent'ı null olsun
      state.children = state.children.map((c) =>
        c.parent === id ? { ...c, parent: null } : c
      );
      softplayService.saveFamilies(state.families);
      softplayService.saveChildren(state.children);
    },

    // --- CHILD CRUD ---
    addChild: (state, action) => {
      state.children.push(action.payload);
      softplayService.saveChildren(state.children);
    },
    updateChild: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.children.findIndex((c) => c.id === id);
      if (index !== -1)
        state.children[index] = { ...state.children[index], ...updates };
      softplayService.saveChildren(state.children);
    },
    deleteChild: (state, action) => {
      const id = action.payload;
      state.children = state.children.filter((c) => c.id !== id);
      softplayService.saveChildren(state.children);
    },

    // --- DURATION CRUD ---
    addDuration: (state, action) => {
      state.durations.push(action.payload);
      softplayService.saveDurations(state.durations);
    },
    updateDuration: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.durations.findIndex((d) => d.id === id);
      if (index !== -1)
        state.durations[index] = { ...state.durations[index], ...updates };
      softplayService.saveDurations(state.durations);
    },
    deleteDuration: (state, action) => {
      const id = action.payload;
      state.durations = state.durations.filter((d) => d.id !== id);
      softplayService.saveDurations(state.durations);
    },

    // --- SOFTPLAY DURUMU ---
    setChildInside: (state, action) => {
      const { id, duration } = action.payload;
      const child = state.children.find((c) => c.id === id);
      if (child) {
        child.isSoftplay = true;
        child.entryTime = Date.now();
        child.duration = duration;
      }
      softplayService.saveChildren(state.children);
    },
    setChildOutside: (state, action) => {
      const id = action.payload;
      const child = state.children.find((c) => c.id === id);
      if (child) {
        child.isSoftplay = false;
        delete child.entryTime;
        delete child.duration;
      }
      softplayService.saveChildren(state.children);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSoftplayData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSoftplayData.fulfilled, (state, action) => {
        state.loading = false;
        state.families = action.payload.families;
        state.children = action.payload.children;
        state.durations = action.payload.durations;
      })
      .addCase(fetchSoftplayData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  addFamily,
  updateFamily,
  deleteFamily,
  addChild,
  updateChild,
  deleteChild,
  addDuration,
  updateDuration,
  deleteDuration,
  setChildInside,
  setChildOutside,
} = softplaySlice.actions;

export default softplaySlice.reducer;