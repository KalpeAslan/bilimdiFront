import {combineReducers,createStore} from "redux";
import calcStore from './calcStore'
import {composeWithDevTools} from "redux-devtools-extension"

const rootReducer = combineReducers({
    calc:calcStore
})

export default createStore(rootReducer,composeWithDevTools())