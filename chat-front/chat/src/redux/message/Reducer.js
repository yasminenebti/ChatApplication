import { CREATE_MESSAGE, GET_MESSAGES } from "./ActionType";

const initialState = {
    messages : [],
    message : null
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MESSAGE:
            return { ...state, message: action.payload };
        case GET_MESSAGES:
            return { ...state, messages: action.payload };
        default:
            return state;
    }
};