import { combineReducers, configureStore } from '@reduxjs/toolkit'
import getUsersSlice from './slices/usersListSlice'
import getUserRepoSlice from './slices/userRepoSlice'

const rootReducer = combineReducers({
  getUsers: getUsersSlice,
  getUserRepo: getUserRepoSlice,
})

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
})
