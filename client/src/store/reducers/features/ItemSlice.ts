import { createSlice } from "@reduxjs/toolkit"

export interface ItemState {
    value: Array<object>
}

const initialState: ItemState = {
    value: []
}

export const itemSlice = createSlice({
    name: 'ITEM',
    initialState,
    reducers: {
        "SET_ITEMS": (state, action) => {
            state.value = [...action.payload, ...state.value]
        },
        "ADD_ITEMS": (state, action) => {
            state.value = [action.payload, ...state.value]
        },
        "DELETE_ITEM": (state, action) => {
            state.value = state.value.filter((item: any) => item._id !== action.payload)
        }
    },
})

export const { actions } = itemSlice
export default itemSlice.reducer

