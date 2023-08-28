import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";
import { CREATE_MESSAGE, GET_MESSAGES } from "./ActionType";


export const createMessage = (data,token) => async(dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/message/new`,data, {
            headers: {
                "Content-Type": "application/json",
                 Authorization : `Bearer ${token}`
            }
        });
        const message = res.data
        dispatch({type:CREATE_MESSAGE , payload:message})
        
    } catch (error) {
        console.log(error)
        
    }
}

export const getAllMessages = (chatId,token) => async(dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/message/chat/${chatId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });
        const messages = await res.data
        dispatch({type:GET_MESSAGES , payload:messages})
        
    } catch (error) {
        console.log(error)
        
    }
}


