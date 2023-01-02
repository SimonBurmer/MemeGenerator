import ReduxLogger from "redux-logger";
import appReducer from "./appSlice";
import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    counter: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
