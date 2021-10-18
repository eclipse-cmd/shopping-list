import { combineReducers } from "redux";
import ItemReducer from "store/reducers/features/ItemSlice"
import AuthReducer from "store/reducers/features/AuthSlice"
import IsLoadingReducer from "store/reducers/features/IsLoadingSlice"

const
    reducer = combineReducers({
        auth: AuthReducer,
        items: ItemReducer,
        isLoading: IsLoadingReducer
    })

export default reducer