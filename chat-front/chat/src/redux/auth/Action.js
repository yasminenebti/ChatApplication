import { BASE_URL } from "../../utils/baseUrl"
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ACtionType"
import axios from "axios";

export const register = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const user = res.data;

        if (user.token) {
            localStorage.setItem("token", user.token);
        }

        dispatch({ type: REGISTER, payload: user });
    } catch (error) {
        console.log(error);
    }
}

export const login = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/auth/authenticate`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const user = response.data;

        if (user.token) {
            localStorage.setItem("token", user.token);
        }

        dispatch({ type: LOGIN, payload: user });
    } catch (error) {
        console.log(error);
    }
}


export const currentUser = (token) => async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/auth/currentUser` , {
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    });
      
      const currentUser = response.data;
      dispatch({type:REQ_USER , payload:currentUser})
    } catch (error) {
      console.log(error);
    }
  };

export const searchUser =(query,token) =>async(dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/auth/searchUsers?user=${query}` , {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
        })
        const user = res.data;
        dispatch({type:SEARCH_USER , payload:user})

    } catch (error) {
        console.log(error)
    }

}

export const updateProfile =(id,userRequest,token) =>async(dispatch) => {
    try {
        const res = await axios.put(`${BASE_URL}/api/v1/auth/updateProfile/${id}` , userRequest ,{
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
        })
        const updatedUser = res.data;
        console.log("update user" , updatedUser)
        dispatch({type:UPDATE_USER , payload:updatedUser})

    } catch (error) {
        console.log(error)
    }

}

export const logoutAccount =() =>async(dispatch) => {
    localStorage.removeItem("token")
    dispatch({type:LOGOUT , payload:null})
}

