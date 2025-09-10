import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./authReducer/authReducer";
import CalculatorReducer from "./CalculatorReducer/CalculatorReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  calculator: CalculatorReducer
});
