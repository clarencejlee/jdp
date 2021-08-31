import { createReducer } from "../../app/common/util/reducerUtils";
import {
    LOGIN_USER, LOGOUT_USER,
    SET_AUTHENTICATED,
    SET_USER,
    SIGN_OUT_USER
} from "./authConstants";

const initialState = {
    authenticated: false,
    token: null,
    user: null,
    redirectUri: null,

}

const loginUser = (state, payload) => {
    return {
        ...state,
        redirectUri: payload.redirectUri
    }
}

const setUser = (state, payload) => {
    return {
        ...state,
        authenticated: true,
        user: payload.user,
        token: payload.access_token,
    }
}
const logoutUser = (state) => {
    return {
        ...state,
        authenticated: false,
        user: null,
        token: null,
        step:1
    }
}

const signOutUser = (state) => {
    return {
        ...state,
        authenticated: false,
        token: null,
        user:null
    }
}


const setAuthenticated = (state, payload) => {
    return {
        ...state,
        token: payload.token,
        user: payload.user,
        authenticated:true,

    }
}

export default createReducer(initialState, {
    [LOGIN_USER]: loginUser,
    [LOGOUT_USER]: logoutUser,
    [SET_USER]: setUser,
    [SET_AUTHENTICATED]: setAuthenticated,
    [SIGN_OUT_USER]: signOutUser
})
