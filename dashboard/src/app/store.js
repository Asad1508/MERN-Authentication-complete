import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserauthApi } from '../services/userauthapi.js'
import userReducer from '../features/userslice'
import routeauthSlice from '../features/routeauthslice'

export const store = configureStore({
  reducer: {
    
[UserauthApi.reducerPath]: UserauthApi.reducer,
//yaha mention kr rhe ab 
user:userReducer,
auth:routeauthSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserauthApi.middleware),
})


setupListeners(store.dispatch)