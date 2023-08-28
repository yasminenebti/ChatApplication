import { applyMiddleware , combineReducers , legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { chatReducer } from "./chat/Reducer";
import { messageReducer } from "./message/Reducer";
const rootReducer = combineReducers({
    auth : authReducer,
    chat : chatReducer,
    message : messageReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))