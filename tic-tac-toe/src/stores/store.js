import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './slice'


export const store = configureStore({
  reducer: { board: boardReducer },
})