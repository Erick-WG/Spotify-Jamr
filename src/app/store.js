import { configureStore } from "@reduxjs/toolkit";

// slices.
import searchTermReducer from "@features/search/searchSlice"
import accessReducer from "@features/access/accessSlice";

// persisting state with redux-persist.
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';


// combine reducers to be persisted.
const rootReducer = combineReducers({
    search: searchTermReducer,
    access: accessReducer
});

// storage configs.
const persistConfigs = {
  key: 'root',
  storage
}

// persistivereducer.
const mainReducer = persistReducer(persistConfigs, rootReducer) 

// create a persistive store.
export const store = configureStore({
  reducer: mainReducer
});