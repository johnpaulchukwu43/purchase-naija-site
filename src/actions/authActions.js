import {
    API_SERVER_UNREACHABLE, CREATE_GUEST_CART,
    CREATE_USER_CART,
    CREATE_USER_SUCCESSFUL,
    CUSTOMER_CART,
    GET_GUEST_TOKEN_ERROR,
    GET_LOGIN_ERRORS,
    GET_PROVIDER_SIGNUP_ERRORS,
    GET_SIGNUP_ERRORS, GUEST_CART,
    GUEST_TOKEN,
    SET_CURRENT_USER,
    SET_CURRENT_USER_INFO,
    SET_GUEST_USER,
    UPDATE_USER_INFO_FAILED,
    UPDATE_USER_PASSWORD_FAILED,
    USER_TOKEN
} from "../constants/ActionTypes";
import {hasTokenExpired, setAuthorizationToken} from "../utils/setAuthorizationToken";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import {
    GET_GUEST_TOKEN_ENDPOINT,
    LOGIN_SERVICE_PR0_ENDPOINT, LOGIN_USER_ENDPOINT,
    REGISTER_SERVICE_PR0_ENDPOINT,
    REGISTER_USER_ENDPOINT,
} from "../constants/endpoints";
import {externalRefreshCart,refreshCart} from "./cartActions";
import * as types from "../constants/ActionTypes";
import userRepo from "../api/userRepository"
import {requestAndSaveNewGuestToken} from "../services/authorizationService";
import {isBlank} from "../utils/stringUtils";

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

export const logout = () => (dispatch) => {
    /*
    * On user logOut:
    * 1) remove user token
    * 2) check if there is existing token,
    *   i) if there is set as authorizationToken else request for another.
    * */
    localStorage.removeItem('UserToken');
    let guestToken = localStorage.getItem('GuestToken');
    if (isBlank(guestToken) || hasTokenExpired(guestToken)) {
        requestAndSaveNewGuestToken();
    }else{
        setAuthorizationToken(guestToken);
        const decodedGuestInfo = jwtDecode(guestToken);
        console.log("current guest user after logout is"+JSON.stringify(decodedGuestInfo));
        dispatch(setGuestUser(decodedGuestInfo));
        if(decodedGuestInfo.hasOwnProperty("guestId")){
            refreshCart(dispatch,decodedGuestInfo.guestId,CREATE_GUEST_CART,GUEST_CART)
        }
    }
};


export const login = (data) => (dispatch) => {
    /*
    * A couple of things happening after user successfully login
    * 1) Fetch the current user(customer) cart from our api server
    * 2) Lastly, we persist the current user and cart on our app
    * */
    return new Promise((resolve, reject) => {
        axios.post(LOGIN_USER_ENDPOINT, data).then(authResponse => {
            const customerId = authResponse.data.user.id;
            saveCredentials(dispatch, authResponse);
            refreshCart(dispatch, customerId, CREATE_USER_CART, CUSTOMER_CART);
            resolve({success:true});
        }).catch(err => {
            throwLoginError(dispatch, err.response.data);
            reject({success:false,error:err.response.data});
        })
    });
};

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


const throwLoginError = (dispatch, err) => {
    dispatch({
        type: GET_LOGIN_ERRORS,
        payload: err
    });
};

const throwSignUpError = (dispatch, err) => {
    dispatch({
        type: GET_SIGNUP_ERRORS,
        payload: err
    });
};

const throwProviderSignUpError = (dispatch, err) => {
    dispatch({
        type: GET_PROVIDER_SIGNUP_ERRORS,
        payload: err
    });
};

export const throwGuestError = (err) => {
    return {
        type: GET_GUEST_TOKEN_ERROR,
        payload: err
    };
};

const userRegisterSuccess = (dispatch) => {
    dispatch({
        type: CREATE_USER_SUCCESSFUL
    });
};

const providerRegisterSuccess = (dispatch) => {
    dispatch({
        type: CREATE_USER_SUCCESSFUL
    });
};

const saveCredentials = (dispatch, res) => {
    const token = res.data.token;
    localStorage.setItem(USER_TOKEN, token);
    setAuthorizationToken(token);
    const decoded = jwtDecode(token);
    dispatch(setCurrentUser(decoded));
    dispatch(setCurrentUserInfo(res.data.user));
};



const throwUserUpdateError = (dispatch, client_error_message, debug_message) => {
    // toast.error(`Failed to Update User Info, ${debug_message}`);
    dispatch({
        type: UPDATE_USER_INFO_FAILED,
        payload: debug_message
    });
};

const throwUserUpdatePasswordError = (dispatch, client_error_message, debug_message) => {
    // toast.error(`Failed to Update User Info, ${debug_message}`);
    dispatch({
        type: UPDATE_USER_PASSWORD_FAILED,
        payload: debug_message
    });
};
