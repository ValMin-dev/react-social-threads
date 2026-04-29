import { createListenerMiddleware } from "@reduxjs/toolkit"
import { userApi } from "../app/services/userApi"

// Этот middleware слушает успешный логин и кладёт токен в localStorage.
export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    if (action.payload.token) {
      // Сохраняем токен, чтобы не терять вход после перезагрузки страницы.
      localStorage.setItem("token", action.payload.token)
    }
  },
})
