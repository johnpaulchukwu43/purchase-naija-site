/*
 Created by Johnpaul Chukwu @ $
*/
import  {axiosInstance,catcher} from './requestHandler'
import {saveOrderEndpoint, updateUserInfoEndpoint, updateUserPasswordEndpoint} from "../constants/endpoints";
import _products from "./data";

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


export default {
    updateUserInfo,
    updateUserPassword
}
