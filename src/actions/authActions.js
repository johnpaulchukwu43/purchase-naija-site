import {
    CREATE_USER_SUCCESSFUL, FAILED_TO_ADD_TO_CART,
    GET_ERRORS, GET_GUEST_TOKEN_ERROR, GET_LOGIN_ERRORS, GET_PROVIDER_SIGNUP_ERRORS, GET_SIGNUP_ERRORS, GUEST_TOKEN,
    SET_CURRENT_USER,
    SET_CURRENT_USER_INFO,
    SET_GUEST_USER, UPDATE_USER_INFO_FAILED, UPDATE_USER_PASSWORD_FAILED, USER_TOKEN
} from "../constants/ActionTypes";
import {setAuthorizationToken} from "../utils/setAuthorizationToken";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import {
    GET_GUEST_TOKEN_ENDPOINT,
    LOGIN_SERVICE_PR0_ENDPOINT, LOGIN_USER_ENDPOINT,
    REGISTER_SERVICE_PR0_ENDPOINT,
    REGISTER_USER_ENDPOINT, updateCartEndpoint, updateUserInfoEndpoint,
} from "../constants/endpoints";
import {setGuestCart, setUserCart} from "./cartActions";
import store from "../store";
import * as types from "../constants/ActionTypes";
import userRepo from "../api/userRepository"

//Auth
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setCurrentUserInfo(info) {
    return {
        type: SET_CURRENT_USER_INFO,
        info
    };

}

export function setGuestUser(user) {
    return {
        type: SET_GUEST_USER,
        user
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('UserToken');
        setAuthorizationToken(false);
        dispatch(requestGuestToken());
    }
}


export function login(data) {
    return dispatch => {
        return axios.post(LOGIN_USER_ENDPOINT, data).then(res => {
            saveCredentials(dispatch,res)
        }).catch(err=>{
            throwLoginError(dispatch,err.response.data);
        })
    }
}

export const  updateUserInfo = (cb=()=>{},userId,data)=>(dispatch)=>{
    dispatch(updateUserInfoBegin());
    userRepo.updateUserInfo(result=>{
        if(result.client_error_message){
            throwUserUpdateError(dispatch,result.client_error_message,result.response.data);
            cb({success:false,error:result.response.data});
        }else{
            dispatch(updateUserInfoSuccess());
            dispatch(setCurrentUserInfo(result.data.user));
            cb({success:true})
        }
    },userId,data);

};

export const  updateUserPassword = (cb=()=>{},userId,data)=>(dispatch)=>{
    dispatch(updateUserPasswordBegin());
    userRepo.updateUserPassword(result=>{
        if(result.client_error_message){
            throwUserUpdateError(dispatch,result.client_error_message,result.response.data);
            cb(result.response.data);
        }else{
            dispatch(updateUserPasswordSuccess());
            cb({success:true})
        }
    },userId,data);

};

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post(REGISTER_USER_ENDPOINT, userData).then(res=>{
            userRegisterSuccess(dispatch)
        }).catch(err=>{
            throwSignUpError(dispatch,err.response.data);
        });
    }
}
export function loginServiceProviderRequest(data) {
    return dispatch => {
        return axios.post(LOGIN_SERVICE_PR0_ENDPOINT, data).then(res => {
            saveCredentials(dispatch,res)
        }).catch(err=>{
            // throwError(dispatch,err);
        })
    }
}
export function SignUpServiceProviderRequest(userData) {
    return dispatch => {
        return axios.post(REGISTER_SERVICE_PR0_ENDPOINT, userData).then(res=>{
            providerRegisterSuccess(dispatch)
        }).catch(err=>{
            throwProviderSignUpError(dispatch,err.response.data);
        });
    };
}

export function requestGuestToken(){
    return dispatch =>{
        return axios.get(GET_GUEST_TOKEN_ENDPOINT).then(res=>{
            saveGuestCredentials(dispatch,res);
        }).catch(err=>{
            throwGuestError(dispatch,err.response.data);
        })
    }
}

export const updateUserInfoBegin = () => ({
    type: types.UPDATE_USER_INFO_BEGIN
});

export const updateUserPasswordSuccess = () => ({
    type: types.UPDATE_USER_PASSWORD_SUCCESSFUL
});

export const updateUserPasswordBegin = () => ({
    type: types.UPDATE_USER_PASSWORD_BEGIN
});

export const updateUserInfoSuccess = () => ({
    type: types.UPDATE_USER_INFO_SUCCESSFUL
});


const throwLoginError = (dispatch,err)=>{
    dispatch({
        type: GET_LOGIN_ERRORS,
        payload: err
    });
};

const throwSignUpError = (dispatch,err)=>{
    dispatch({
        type: GET_SIGNUP_ERRORS,
        payload: err
    });
};

const throwProviderSignUpError = (dispatch,err)=>{
    dispatch({
        type: GET_PROVIDER_SIGNUP_ERRORS,
        payload: err
    });
};

const throwGuestError = (dispatch,err)=>{
    dispatch({
        type: GET_GUEST_TOKEN_ERROR,
        payload: err
    });
};

const userRegisterSuccess = (dispatch)=>{
    dispatch({
        type:CREATE_USER_SUCCESSFUL
    });
};

const providerRegisterSuccess = (dispatch)=>{
    dispatch({
        type:CREATE_USER_SUCCESSFUL
    });
};

const saveCredentials =(dispatch,res)=>{
    const token = res.data.token;
    localStorage.setItem(USER_TOKEN, token);
    localStorage.removeItem(GUEST_TOKEN);
    setAuthorizationToken(token);
    const decoded = jwtDecode(token);
    dispatch(setCurrentUser(decoded));
    dispatch(setCurrentUserInfo(res.data.user));
    dispatch(setUserCart(decoded));
};

const saveGuestCredentials =(dispatch,res)=>{
    const token = res.data.token;
    localStorage.setItem(GUEST_TOKEN, token);
    setAuthorizationToken(token);
    const decoded = jwtDecode(token);
    dispatch(setGuestUser(decoded));
    dispatch(setGuestCart(decoded))
};

const throwUserUpdateError = (dispatch, client_error_message, debug_message) => {
    // toast.error(`Failed to Update User Info, ${debug_message}`);
    dispatch({
        type: UPDATE_USER_INFO_FAILED,
        payload:  debug_message
    });
};

const throwUserUpdatePasswordError = (dispatch, client_error_message, debug_message) => {
    // toast.error(`Failed to Update User Info, ${debug_message}`);
    dispatch({
        type: UPDATE_USER_PASSWORD_FAILED,
        payload:  debug_message
    });
};
