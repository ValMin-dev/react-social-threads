import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../app/types"
import { userApi } from "../../app/services/userApi"
import { RootState } from "../../app/store"

// Что хранится в user-разделе Redux store.
interface InitialState {
  user: User | null
  token?: string | null
  isAuthenticated: boolean
  users: User[] | null
  current: User | null
}

const initialState: InitialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  users: null,
  current: null,
}

// Здесь храним данные пользователя и меняем их после запросов.
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Полностью очищает данные пользователя.
    logout: () => initialState,
    // Сбрасывает только авторизацию и текущие данные пользователя.
    resetUser: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    // После логина сохраняем токен и помечаем, что пользователь вошёл.
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      },
    )
    // После запроса current сохраняем текущего пользователя.
    builder.addMatcher(
      userApi.endpoints.current.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true
        state.current = action.payload.user
      },
    )
    // После загрузки профиля по id кладём его в store.
    builder.addMatcher(
      userApi.endpoints.getUserById.matchFulfilled,
      (state, action) => {
        state.user = action.payload
      },
    )
  },
})

export const { logout, resetUser } = slice.actions
export default slice.reducer
// Эти функции помогают удобно брать нужные данные из store.
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const selectCurrentUser = (state: RootState) => state.user.current
export const selectUserById = (state: RootState) => state.user.user
