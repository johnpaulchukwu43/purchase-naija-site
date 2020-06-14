/*
 Created by Johnpaul Chukwu @ $
*/
import  {axiosInstance,catcher} from './requestHandler'
import {
    GET_GUEST_TOKEN_ENDPOINT,
    updateUserInfoEndpoint,
    updateUserPasswordEndpoint
} from "../constants/endpoints";
import axios from "axios";
import {API_SERVER_UNREACHABLE} from "../constants/ActionTypes";

const updateUserInfo = (cb=()=>{},userId, data) => {
    const endpoint = updateUserInfoEndpoint(userId);
    axiosInstance.put(endpoint,data)
        .then(res=>{
            cb(catcher(res));
        });
};

const updateUserPassword = (cb=()=>{},userId, data) => {
    const endpoint = updateUserPasswordEndpoint(userId);
    axiosInstance.put(endpoint,data)
        .then(res=>{
            cb(catcher(res));
        });
};

export const requestGuestToken = () => {
    return new Promise((resolve)=>{
        axios.get(GET_GUEST_TOKEN_ENDPOINT).then(res=>{
            resolve({success:true,res})
        }).catch(err=>{
            const errorInfo = err.response === undefined ? API_SERVER_UNREACHABLE : err.response.data;
            resolve({success:false,err:errorInfo});
        })
    })
};

export default {
    updateUserInfo,
    updateUserPassword
}
