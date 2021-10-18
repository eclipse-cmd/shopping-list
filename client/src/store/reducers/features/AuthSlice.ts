import { createSlice } from "@reduxjs/toolkit"
import { setToken } from "app/helper"

export interface AuthState {
    isLoading: boolean,
    isAuth: boolean,
    token: string,
    user: {}
}

const initialState: AuthState = {
    isLoading: false,
    isAuth: false,
    token: "",
    user: {},
}

export const authSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        "USER_LOADING": (state) => {
            state.isLoading = true
        },
        "USER_NOT_LOADING": (state) => {
            state.isLoading = false
        },
        "USER_LOADED": (state, action) => {
            setToken({ token: action.payload.token, user: action.payload.user })
            state.isLoading = false
            state.isAuth = true
            state.user = action.payload.user
        },
        "AUTH_SUCCESS": (state, action) => {
            setToken({ token: action.payload.token, user: action.payload.user })
            state.isLoading = false
            state.isAuth = true
            state.token = action.payload.token
            state.user = action.payload.user
        },
        "AUTH_FAILED": (state) => {
            localStorage.removeItem("authUser")
            state.isLoading = false
            state.isAuth = false
            state.token = ''
            state.user = {}
        },
       
    },
})

export const { actions } = authSlice
export default authSlice.reducer

