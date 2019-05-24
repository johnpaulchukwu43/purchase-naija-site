/*
 Created by Johnpaul Chukwu @ $
*/
import  {axiosInstance,catcher} from './requestHandler'
import {userOrderEndpoint} from "../constants/endpoints";

const checkOutCart = (cb=()=>{},userId,body)=>{
    const endpoint= userOrderEndpoint(userId);
    axiosInstance.post(endpoint,body)
        .then(res=>{
            cb(catcher(res));
        });
};

const getUserOrders = (cb=()=>{},userId,pageNum,pageSize)=>{
    const endpoint= appendBasePageParam(userOrderEndpoint(userId),pageNum,pageSize);
    axiosInstance.get(endpoint)
        .then(res=>{
            cb(catcher(res));
        });
};

const appendBasePageParam = (url,pageNumber,pageSize) =>{
    return `${url}?pageNum=${pageNumber}&pageSize=${pageSize}`
};



export default {
    checkOutCart:checkOutCart,
    getUserOrders:getUserOrders,

}
