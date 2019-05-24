import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import store from "../store";
import {toast} from 'react-toastify';
import {addToCartWithoutSpecifyingQuantity} from "./cartActions";
import Notify from "../utils/notification";

const notify = new Notify();

//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product, qty) => (dispatch) => {
    notify.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))

}
export const addToCartAndRemoveWishlist = (cartList,product, qty) => (dispatch) => {
    dispatch(addToCartWithoutSpecifyingQuantity(cartList,product, qty));
    dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});


//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product,routeToProductView) => (dispatch) => {
    notify.success("Item Added to Wishlist");
    product ={...product,routeToProductView};
    dispatch(addToWishlistUnsafe(product))

}
export const addToWishlistUnsafe = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product,

});
export const removeFromWishlist = product_id => ({
    type: types.REMOVE_FROM_WISHLIST,
    product_id
});


//Compare Products
export const addToCompare = (product,routeToProductView) => (dispatch) => {
    notify.success("Item Added to Compare");
    product ={...product,routeToProductView};
    dispatch(addToCompareUnsafe(product))

}
export const addToCompareUnsafe = (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});
export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});


// Filters
export const filterBrand = (brand) => ({
    type: types.FILTER_BRAND,
    brand
});
export const filterColor = (color) => ({
    type: types.FILTER_COLOR,
    color
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});


// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});

