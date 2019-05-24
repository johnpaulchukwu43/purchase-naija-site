import axios from 'axios';
import jwtDecode from "jwt-decode";

export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function hasTokenExpired(token){
    let hasExpired = false;
    const exp =jwtDecode(token).exp;
    if (Date.now() / 1000 > exp) {
        //has Expired, REQUEST AGAIN
        hasExpired =true;
    }
    return hasExpired;
}
