import {combineReducers, createStore} from "redux";
import ItemReducer from "./ItemReducer";
import cartReducer from "./CartReducer";
import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
const rootReducer = combineReducers({
    itemStore : ItemReducer,
    cartStore : cartReducer
}


)

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const myStore = createStore(persistedReducer)
  export const myPersistor = persistStore(myStore)

