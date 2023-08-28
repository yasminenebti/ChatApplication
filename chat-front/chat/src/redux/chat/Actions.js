import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";
import { CREATE_CHAT, CREATE_GROUP, GET_CHATS_USER } from "./ActionType";



export const createChat = (currentUserId,userToChatId) => async(dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/chat/new/${currentUserId}/${userToChatId}`, {
            headers: {
                "Content-Type" : "application/json",
                //Authorization : `Bearer ${token}`
            }
        });
        const chat =  res.data
        console.log(chat)
        dispatch({type:CREATE_CHAT , payload:chat})
        
    } catch (error) {
        console.log(error)
        
    }
}

export const createGroup = (data,token,userId) => async(dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/chat/group/${userId}`, data ,{
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });
        const chat = res.data
        dispatch({type:CREATE_GROUP , payload:chat})
        
    } catch (error) {
        console.log(error)
        
    }
}

export const getChatsByUser = (userId,token) => async(dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/chat/userChat/${userId}` ,{
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });
        const chats =  res.data
        dispatch({type:GET_CHATS_USER , payload:chats})
        
    } catch (error) {
        console.log(error)
        
    }
}