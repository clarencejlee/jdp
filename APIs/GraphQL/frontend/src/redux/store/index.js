import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import rootReducer from "../slices";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {},
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST,
        REHYDRATE,
        PURGE, REGISTER],
    },
  }),
});
export const useUserDispatch = useDispatch;

let persistor = persistStore(store);

export { store, persistor };
