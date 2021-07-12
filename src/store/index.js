import {combineReducers,createStore} from "redux";
import calcReducer from './calcReducer'
import {composeWithDevTools} from "redux-devtools-extension"

const rootReducer = combineReducers({
    calc:calcReducer
})

export default createStore(rootReducer,composeWithDevTools())