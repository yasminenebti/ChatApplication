import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ACtionType"

const initialState = {
    register: null,
    login: null,
    reqUser: null,
    searchUser : [],
    updatedUser : null

};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return { ...state, register: action.payload };
        case LOGIN:
            return { ...state, login: action.payload };
        case REQ_USER:
            return { ...state, reqUser : action.payload}
        case SEARCH_USER:
            return { ...state, searchUser : action.payload}
        case UPDATE_USER:
            return { ...state, updatedUser : action.payload}
        case LOGOUT:
            return { ...state, reqUser : null}
        default:
            return state;
    }
};





