/*
 Created by Johnpaul Chukwu @ $
*/

import {
    ADD_TO_CART, CHECKOUT_SUCCESS,
    CREATE_GUEST_CART, CREATE_USER_CART, DECREMENT,
    FAILED_TO_ADD_TO_CART,
    FAILED_TO_FETCH_CART,
    INCREMENT, REMOVE_FROM_CART
} from "../constants/ActionTypes";
import * as types from "../constants/ActionTypes";
import shop from "../api/shop";
import userOrder from "../api/orderRepository";
import Notify from '../utils/notification';


const notify = new Notify();


export function setGuestCart(guest) {
    return {
        type: CREATE_GUEST_CART,
        guest
    };
}


export function setUserCart(user) {
    return {
        type: CREATE_USER_CART,
        user
    };
}

export const addToCartBegin = () => ({
    type: types.ADD_TO_CART_BEGIN
});

export const incrementQuantityBegin = () => ({
    type: types.INCREMENT_QTY
});

export const decrementQuantityBegin = () => ({
    type: types.DECREMENT_QTY_BEGIN
});

export const removeFromCartBegin = () => ({
    type: types.REMOVE_FROM_CART_BEGIN
});

export const checkOutCartBegin = () => ({
    type: types.CHECKOUT_BEGIN
});

export const checkOutCartSuccess = () => ({
    type: types.CHECKOUT_SUCCESS
});

export const checkOutCartFailed = (error) => ({
    type: types.CHECKOUT_FAILURE,
    payload: error
});



export const changeGuestCartToCustomerCartBegin = ()=>({
    type: types.UPDATE_CART_TYPE_AND_OWNER_BEGIN
});

export const changeGuestCartToCustomerCartSuccess = ()=>({
    type: types.UPDATE_CART_TYPE_AND_OWNER_SUCCESS
});

export const changeGuestCartToCustomerCartFailed = (error)=>({
    type: types.UPDATE_CART_TYPE_AND_OWNER_FAILED,
    payload:error
});

export const addToCartWithoutSpecifyingQuantityBegin = () => ({
    type: types.ADD_TO_CART_WITHOUT_GIVEN_QUANTITY_BEGIN
});


export const checkOutCart = (userId, body) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(checkOutCartBegin());
        userOrder.checkOutCart(data => {
            if (data.client_error_message) {
                dispatch(checkOutCartFailed(data.response.data));
                reject({success: false, message: data.client_error_message});
            } else {
                dispatch(checkOutCartSuccess());
                resolve(data.data)
            }
        }, userId, body);
    });
};


//when adding to cart, we require three info:  current cartList , the product and the quantity to be added
export const addToCartWithoutSpecifyingQuantity = (cartList, product, qtyRequested) => (dispatch) => {
    let isIncrementProductIncart = false;
    let productIndexInCart = null;
    dispatch(addToCartWithoutSpecifyingQuantityBegin());
    //check if product is already in cart,if exists then just increment qunatity else create a new
    let products = cartList.cartInfo.products;
    products.forEach((item, index) => {
        if (item.productId === product._id) {
            isIncrementProductIncart = true;
            productIndexInCart = index;
        }
    });
    if (isIncrementProductIncart || productIndexInCart) {
        staticIncrementProductQuantity(dispatch, cartList, product, productIndexInCart, qtyRequested)
    } else {
        addToCart(dispatch, cartList, product, qtyRequested);
    }
};

//to update quantity in existing cart, we need the user's Id, the collection(category) product belongs to , the Id of product and quantity
const staticIncrementProductQuantity = (dispatch, cartList, product, productIndexInCart, qtyRequested) => {
    dispatch(incrementQuantityBegin());
    let userId = cartList.guestId || cartList.userId;
    let category = product.productCategory;
    let productId = product._id;
    let newQuantity = cartList.cartInfo.products[productIndexInCart].quantity + qtyRequested;
    shop.updateProductInCart(
        data => {
            if (data.client_error_message) {
                throwError(dispatch, data.client_error_message, data.response.data);
            } else {
                refreshCart(dispatch, userId, INCREMENT);
            }
        },
        userId, category, productId, newQuantity, INCREMENT
    )
};

export const incrementProductQuantity = (cartList, product, productIndexInCart, qtyRequested) => (dispatch) => {
    dispatch(incrementQuantityBegin());
    let userId = cartList.guestId || cartList.userId;
    let category = product.productCategory;
    let productId = product._id;
    let newQuantity = cartList.cartInfo.products[productIndexInCart].quantity + qtyRequested;
    shop.updateProductInCart(
        data => {
            if (data.client_error_message) {
                throwError(dispatch, data.client_error_message, data.response.data);
            } else {
                refreshCart(dispatch, userId, INCREMENT);
            }
        },
        userId, category, productId, newQuantity, INCREMENT
    )
};

export const decrementProductQuantity = (cartList, product, productIndexInCart, qtyToRemove) => (dispatch) => {
    dispatch(decrementQuantityBegin());
    let userId = cartList.guestId || cartList.userId;
    let category = product.productCategory;
    let productId = product._id;
    let prevQuantity = cartList.cartInfo.products[productIndexInCart].quantity;
    if (qtyToRemove >= prevQuantity) {
        notify.error("Cant remove quantity more than already exists in cart");
    } else {
        let newQuantity = prevQuantity - qtyToRemove;
        shop.updateProductInCart(
            data => {
                if (data.client_error_message) {
                    throwError(dispatch, data.client_error_message, data.response.data);
                } else {
                    refreshCart(dispatch, userId, DECREMENT);
                }
            },
            userId, category, productId, newQuantity, DECREMENT
        )
    }

};

export const addToCart = (dispatch, cartList, product, qtyRequested) => {
    dispatch(addToCartBegin());
    const requestBody = {
        userId: cartList.guestId || cartList.userId,
        productId: product._id,
        category: product.productCategory,
        cartType: cartList.cartInfo.cartType,
        provider:product.provider,
        quantity: qtyRequested
    };
    shop.addTocart(
        data => {
            if (data.client_error_message) {
                throwError(dispatch, data.client_error_message, data.response.data);
            } else {
                refreshCart(dispatch, requestBody.userId, ADD_TO_CART,cartList.cartInfo.cartType);
            }
        }, requestBody);
};


export const changeGuestCartToCustomerCart =(cb=()=>{},oldUserId,newUserId,cartType)=>dispatch=>{
    dispatch(changeGuestCartToCustomerCartBegin());
    const body ={
        customerId:newUserId,
        cartType:cartType
    };
    shop.updateCartTypeAndOwner(result=>{
        if (result.client_error_message) {
            dispatch(changeGuestCartToCustomerCartFailed(result.client_error_message));
            cb({success:false,message:"Couldn't Update Cart Status"})
        }else{
            dispatch(changeGuestCartToCustomerCartSuccess(result.client_error_message));
            cb({success:true,message:"Update Cart Type Successfully"})
        }
    },oldUserId,body)
};

export const removeFromCart = (cartList, product) => dispatch => {
    dispatch(removeFromCartBegin());
    let userId = cartList.guestId || cartList.userId;
    let category = product.productInfo.productCategory;
    let productId = product.productInfo._id;
    shop.deleteProductFromCart(
        data => {
            if (data.client_error_message) {
                throwDeleteError(dispatch, data.client_error_message, data.response.data);
            } else {
                refreshCart(dispatch, userId, REMOVE_FROM_CART, cartList.cartInfo.cartType);
            }
        }, userId, category, productId)

};

export const refreshCart = (dispatch, userId, lastAction, cartType) => {
    dispatch(fetchCartBegin());
    shop.fetchCart(cartData => {
        if (cartData.client_error_message) {
            throwFetchError(dispatch, cartData.client_error_message, cartData.response.data)
        } else {
            //updating cart details from our api server
            dispatch(recieveCart(cartData.data.result));
            if (lastAction === DECREMENT) {
                notify.success("Item removed from Cart");
            } else if (lastAction === REMOVE_FROM_CART) {
                notify.success("Product removed from Cart");
            } else if (lastAction === CHECKOUT_SUCCESS) {
                console.log("updated cart")
            }
            else if(lastAction === CREATE_USER_CART || lastAction === CREATE_GUEST_CART){
                console.log("Fetch cart success")
            }
            else {
                console.log("success");
                notify.success("Item Added to Cart");
            }
        }
    }, userId, cartType);
};

export const externalRefreshCart = (userId,lastAction,cartType) =>(dispatch)=>{
    refreshCart(dispatch,userId,lastAction,cartType);
};
export const fetchCartBegin = () => ({
    type: types.FETCH_CART_BEGIN,
});

export const recieveCart = payload => ({
    type: types.RECEIVE_CART,
    payload
});


const throwError = (dispatch, client_error_message, debug_message) => {
    notify.success(`Failed to Add to Cart ${debug_message.message}`);
    dispatch({
        type: FAILED_TO_ADD_TO_CART,
        payload: {error: client_error_message, debug_message: debug_message}
    });
};
const throwDeleteError = (dispatch, client_error_message, debug_message) => {
    notify.success(`Failed to Remove Product From Cart ${debug_message.message}`);
    dispatch({
        type: FAILED_TO_ADD_TO_CART,
        payload: {error: client_error_message, debug_message: debug_message}
    });
};


const throwFetchError = (dispatch, client_error_message, debug_message) => {
    notify.success(`Failed to Fetch From Cart ${debug_message.message}`);
    dispatch({
        type: FAILED_TO_FETCH_CART,
        payload: {error: client_error_message, debug_message: debug_message}
    });
};
