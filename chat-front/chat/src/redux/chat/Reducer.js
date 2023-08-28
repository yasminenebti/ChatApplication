import { CREATE_CHAT, CREATE_GROUP, GET_CHATS_USER } from "./ActionType";

const initialState = {
    chats: [],
    chat : null,
    groupChat: null
};


export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CHAT:
            return { ...state, chat: action.payload };
        case CREATE_GROUP:
            return { ...state, groupChat: action.payload };
        case GET_CHATS_USER:
            return { ...state, chats : action.payload}
        default:
            return state;
    }
};