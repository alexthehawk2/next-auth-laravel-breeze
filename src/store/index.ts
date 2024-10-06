// src/store/index.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Example slice
const loadingSlice = createSlice({
  name: 'loading',
  initialState: { value: true },
  reducers: {
    setLoading: (state, action: { payload: boolean }) => {
      state.value = action.payload;
    },
  },
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null
  },
  reducers: {
    setUser: (state, action)=>{
      state.value = action.payload
    }
  }
})
export const { setLoading } = loadingSlice.actions;
export const {setUser} = userSlice.actions
const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    user: userSlice.reducer
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
