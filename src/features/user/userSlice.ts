import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../app/types"
import { userApi } from "../../app/services/userApi"
import { RootState } from "../../app/store"

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

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      },
    )
    builder.addMatcher(
      userApi.endpoints.current.matchFulfilled,
      (state, action) => {
        state.isAuthenticated = true
        state.current = action.payload.user
      },
    )
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
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const selectCurrentUser = (state: RootState) => state.user.current
export const selectUserById = (state: RootState) => state.user.user
