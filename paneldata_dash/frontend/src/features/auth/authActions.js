
import {
    LOGIN_USER,
    LOGOUT_USER, SET_AUTHENTICATED,
    SET_USER
} from "./authConstants";
import axios from 'axios';
import { asyncActionFinish, asyncActionStart} from "../async/asyncActions";

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const login = (creds) => {
  return async (dispatch) => {

    try {
        dispatch(asyncActionStart());
        return axios
            .get('/auth?sso', config)
            .then((res) => {
                dispatch(loginSuccess(res.data))
            })
            .catch((error) => {

                dispatch(asyncActionFinish());
            });

    } catch (error) {
        dispatch(asyncActionFinish());
        console.log(error)
    }
  };
};

export const authenticate = (token) => {
    return async (dispatch) => {

        try {
            dispatch(asyncActionStart());
            return axios
                .post(`/auth?token=${token}`,{})
                .then((res) => {
                   dispatch(authSuccess({access_token: res.data.access_token}))
                   setAuthorizationToken({access_token:res.data.access_token})
                })
                .catch((error) => {
                    dispatch(asyncActionFinish());
                });

        } catch (error) {
            dispatch(asyncActionFinish());
            console.log(error)
        }
    };
};



export const getUserData = (token) => (dispatch) => {
    dispatch(asyncActionStart());
    axios.get('/users')
        .then(res=>{
            dispatch({type: SET_USER, payload: {access_token:token,user:res.data}})
            dispatch(asyncActionFinish());
        })
        .catch(err =>{
            dispatch(logout())
            dispatch(asyncActionFinish());
            console.log(err);
        })
}



export const logout = () => {
    return async (dispatch) => {
        clearLocalStorage();
        dispatch(logoutAction());
    };
};


export const loginSuccess = (payload) => {
    return {
        type: LOGIN_USER,
        payload:{
            redirectUri: payload.message,
        }
    }
};

export const authSuccess = (auth) => {
    return {
        type: SET_AUTHENTICATED,
        payload:{
            token: auth.access_token,
            user: auth.user,
        }
    }
};




export const logoutAction = () => {
    return {
        type: LOGOUT_USER
    }
}

// local storage funcs
const setAuthorizationToken = (auth) =>{
  localStorage.setItem("access_token", `${auth.access_token}`);
  axios.defaults.headers.common['Authorization'] = `${auth.access_token}`;
}
const clearLocalStorage = () => {
    localStorage.removeItem("access_token")
}


