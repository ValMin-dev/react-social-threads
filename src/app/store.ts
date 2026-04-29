import type { ThunkAction, Action } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { api } from "./services/api"
import user from "../features/user/userSlice"
import { listenerMiddleware } from "../middleware/auth"

// Здесь собирается весь Redux store приложения.
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user,
  },
  // Подключаем middleware для RTK Query и для логики авторизации.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware)
  },
})

// Тип dispatch, чтобы TypeScript понимал, что можно отправлять в store.
export type AppDispatch = typeof store.dispatch
// Тип всего состояния store.
export type RootState = ReturnType<typeof store.getState>
// Тип для thunk-функций, если они понадобятся в проекте.
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
