import { combineReducers } from "@reduxjs/toolkit";
import softplayReducer from "./slices/sofplaySlice.js";
import cardReducer from './slices/cardSlice.js';
import cartReducer from "./slices/cartSlice.js";

const rootReducer = combineReducers({
  softplay: softplayReducer,
  card: cardReducer,
  cart: cartReducer
});

export default rootReducer;