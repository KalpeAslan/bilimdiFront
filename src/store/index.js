import {
    combineReducers,
    createStore
} from "redux";
import calcReducer from './calcReducer'
import {
    composeWithDevTools
} from "redux-devtools-extension"
import {
    globalReducer
} from "./globalReducer"

const rootReducer = combineReducers({
    calc: calcReducer,
    global: globalReducer
})

export const store = createStore(rootReducer, composeWithDevTools())