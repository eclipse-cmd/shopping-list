
import { createSlice } from "@reduxjs/toolkit"

interface isLoadingState {
    value: boolean
}

const initialState: isLoadingState = {
    value: false
}

export const isLoadingSlice = createSlice({
    name: 'ISLOADING',
    initialState,
    reducers: {
        "IDLE": (state) => {
            state.value = false
        },
        "ACTIVE": (state) => {
            state.value = true
        }
    },
})

export const { IDLE, ACTIVE } = isLoadingSlice.actions
export default isLoadingSlice.reducer

