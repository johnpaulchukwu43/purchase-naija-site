/*
 Created by Johnpaul Chukwu @ $
*/
import React, {Component} from 'react';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

class Notify {

    constructor(){
        this.toast = toast;
        this.options ={
            autoClose: 5000,
            hideProgressBar: false,
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: true,
            closeOnClick: true,
        };
    }

    success(message){
        return this.toast.success(message,this.options)
    }

    error(message){
        return this.toast.error(message,this.options)
    }

    info(message){
        return this.toast.info(message,this.options)
    }

    warn(message){
        return this.toast.warn(message,this.options)
    }

}
export default Notify
