/*
 Created by Johnpaul Chukwu @ $
*/
import axios from 'axios'
axios.defaults.timeout = process.env.REACT_APP_CONNECTION_TIMEOUT;

export const axiosInstance = axios.create({
    validateStatus: function (status) {
        return status >= 200 && status <= 503;
    },
});

const get = (endpoint,cb= () => {}) =>{
    axiosInstance.get(endpoint)
        .then((response)=>{
            cb(catcher(response));
        })
        .catch((err)=>{
            cb(catcher(err));
        });
};

export const catcher = (response)=> {
    let status = response.status;
    let clientInfo=null;
    if(status >=200 && status <= 300){
        return response;
    }else if(status === 304){
        return response;
    }
    else if(status >=400 && status <500){
        if(status === 403){
            clientInfo = "Unauthorized Access : Login to continue";
            return {client_error_message:clientInfo,response};
        }
        clientInfo = "Bad Request Error, Try Again";
        return {client_error_message:clientInfo,response};
    }else if(status >=500 && status < 600){
        clientInfo = "Unable to Connect to Server, \n Try Again";
        return {client_error_message:clientInfo,response};
    }else{
        clientInfo = "Unknown Error, \n Try Again";
        return {client_error_message:clientInfo,response};
    }

};


