import isEmpty from 'lodash/isEmpty';
import {
    CREATE_PROVIDER_SUCCESSFUL,
    CREATE_USER_SUCCESSFUL,
    GET_ERRORS, GET_GUEST_TOKEN_ERROR, GET_LOGIN_ERRORS, GET_PROVIDER_SIGNUP_ERRORS, GET_SIGNUP_ERRORS,
    SET_CURRENT_USER, SET_CURRENT_USER_INFO, SET_GUEST_USER, UPDATE_USER_INFO_FAILED, UPDATE_USER_PASSWORD_FAILED
} from "../constants/ActionTypes";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                loginError:null,
                guest:null,
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        case SET_CURRENT_USER_INFO:
            return{
                ...state,
                user_info:action.info
            };

        case SET_GUEST_USER:
            return {
                isAuthenticated: false,
                getGuestTokenError:null,
                guest: action.user
            };
        case GET_ERRORS:
            return {
                ...state,
                error:action.payload
            };
        case GET_LOGIN_ERRORS:
            return{
                ...state,
                loginError:action.payload
            };
        case GET_SIGNUP_ERRORS:
            return{
                ...state,
                signUpError:action.payload
            };
        case GET_PROVIDER_SIGNUP_ERRORS:
            return{
                ...state,
                signUpProviderError:action.payload
            };
         case GET_GUEST_TOKEN_ERROR:
            return{
                ...state,
                getGuestTokenError:action.payload
            };

        case UPDATE_USER_INFO_FAILED:
            return {
                ...state,
                error:action.payload
            };
        case UPDATE_USER_PASSWORD_FAILED:
            return {
                ...state,
                error:action.payload
            };

         case CREATE_USER_SUCCESSFUL:
             return{
                 ...state,
                 signUpError:null,
                 isRegistered: true,
                 message:"Created User Successfully"
             };
        case CREATE_PROVIDER_SUCCESSFUL:
            return{
                ...state,
                signUpProviderError:null,
                isRegistered: true,
                message:"Created Provider Successfully"
            };

        default:
            return state;
    }
}
