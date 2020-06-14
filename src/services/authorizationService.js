import store from '../store/index';
import {hasTokenExpired, setAuthorizationToken} from "../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import {
    setCurrentUser as sendDispatchToSetCurrentUser,
    setGuestUser as sendDispatchToSetGuestUser,
    throwGuestError as sendDispatchToThrowGuestError
} from "../actions/authActions";
import {GUEST_TOKEN} from "../constants/ActionTypes";
import {
    setGuestCart as sendDispatchToSetGuestCart,
    setUserCart as sendDispatchToSetUserCart
} from "../actions/cartActions";
import {requestGuestToken} from "../api/userRepository"
import {isBlank} from "../utils/stringUtils"
import Notify from "../utils/notification";

export const checkUserType = () => {
    let isUserDefined = true;
    const notify = new Notify();
    let guestToken = localStorage.getItem('GuestToken');
    let userToken = localStorage.getItem('UserToken');
    return new Promise((resolve, reject) => {
        //if the user is logged in and token is still valid, save the token else request for guest token
        if (!isBlank(userToken) && !hasTokenExpired(userToken)) {
            setCustomerUser();
            return resolve(isUserDefined);
        } else {
            notify.info("Currently browsing as Guest User.")
        }

        //IF THERE IS NO GUEST TOKEN  or IF THE GUEST TOKEN HAS EXPIRED, REQUEST FOR A NEW ONE
        if (isBlank(guestToken) || hasTokenExpired(guestToken)) {
            requestAndSaveNewGuestToken();
        }
        resolve(isUserDefined);
    })
};


export const requestAndSaveNewGuestToken = () => {
    store.dispatch(tryOut());
};

const tryOut = () => (dispatch) => {
    let isUserDefined = false;
    requestGuestToken().then(result => {
        isUserDefined = result.success;
        let response = result.res;

        if (isUserDefined) {
            saveGuestCredentials(response);
        } else {
            dispatch(sendDispatchToThrowGuestError(result.err));
        }
    });
};

export const saveGuestCredentials = (response) => {
    const token = response.data.token;
    localStorage.setItem(GUEST_TOKEN, token);
    setAuthorizationToken(token);
    const decodedGuestInfo = jwtDecode(token);
    store.dispatch(sendDispatchToSetGuestUser(decodedGuestInfo));
    store.dispatch(sendDispatchToSetGuestCart(decodedGuestInfo));
};


export const setCustomerUser = () => {
    setAuthorizationToken(localStorage.UserToken);
    const decodedUser = jwtDecode(localStorage.UserToken);
    store.dispatch(sendDispatchToSetCurrentUser(decodedUser));
    store.dispatch(sendDispatchToSetUserCart(decodedUser))
};




