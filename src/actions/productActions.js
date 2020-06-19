/*
 Created by Johnpaul Chukwu @ $
*/
import * as types from "../constants/ActionTypes";
import shop from "../api/shop";
import setPaginationFor from "./factory/createPaginationAction";
import {FAILED_TO_FETCH_ERROR} from "../constants/ActionTypes";
import {FASHION_PRODUCT} from "../constants/ActionTypes";
import {MANUFACTURING_PRODUCT} from "../constants/ActionTypes";
import {COMPUTER_PRODUCT} from "../constants/ActionTypes";
import {RAW_MATERIALS_PRODUCT} from "../constants/ActionTypes";
import {ELECTRONICS_PRODUCT} from "../constants/ActionTypes";
import {PHONE_PRODUCT} from "../constants/ActionTypes";
import {BEAUTY_PRODUCT} from "../constants/ActionTypes";
import Notify from "../utils/notification";
import {fetchAvailableBrandsInProductCategorySuccess} from "../constants/ActionTypes";
import {fetchAvailableColorsInProductCategorySuccess} from "../constants/ActionTypes";

const notify = new Notify();


export const fetchProductsBegin = () => ({
    type: types.FETCH_PRODUCTS_BEGIN
});

export const searchAllProductsBegin = () => ({
    type: types.SEARCH_ALL_PRODUCTS_BEGIN
});

export const searchAllProductsFailed = (error) => ({
    type: types.SEARCH_ALL_PRODUCTS_FAILED,
    error
});

export const searchAllProductsSuccess = (products) => ({
    type: types.SEARCH_ALL_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchAllProductsBegin = () => ({
    type: types.FETCH_ALL_PRODUCTS_BEGIN
});


export const fetchProductsByCategoryBegin = (CATEGORY) => ({
    type: `FETCH ${CATEGORY} BEGIN`
});

export const fetchAvailableColorsForProductsByCategoryBegin = (CATEGORY) => ({
    type: `FETCH COLORS IN ${CATEGORY} BEGIN`
});

export const fetchAvailableBrandsForProductsByCategoryBegin = (CATEGORY) => ({
    type: `FETCH BRANDS IN ${CATEGORY} BEGIN`
});

export const filterProductsBegin = (filter, option) => ({
    type: `FILTER_BY_${filter}`,
    payload: option
});


export const sortProductsResult = (product_category_name, filter, ...params) => dispatch => {
    dispatch(filterProductsBegin(filter, ...params));
    shop.sortProducts(
        data => {
            if (data.client_error_message) {
                throwError(
                    dispatch,
                    FAILED_TO_FETCH_ERROR,
                    data.client_error_message,
                    data.response.data,
                    true
                );
            } else {
                dispatch(setPaginationFor(product_category_name, {data: data.data}));
                return data.data;
            }
        }, ...params);
};

export const filterProductsResult = (product_category_name, filter, params) => dispatch => {
    dispatch(filterProductsBegin(filter, params));
    shop.filterProducts(
        data => {
            if (data.client_error_message) {
                throwError(
                    dispatch,
                    FAILED_TO_FETCH_ERROR,
                    data.client_error_message,
                    data.response.data,
                    true
                );
            } else {
                dispatch(setPaginationFor(product_category_name, {data: data.data}));
                return data.data;
            }
        }, params);
};


export const getProductsByCategory = (product_category_name, pageNumber, pageSize) => dispatch => {
    dispatch(fetchProductsByCategoryBegin(product_category_name));
    shop.getProductsByCategory(product_category_name, pageNumber, pageSize,
        data => {
            if (data.client_error_message) {
                throwError(
                    dispatch,
                    FAILED_TO_FETCH_ERROR,
                    data.client_error_message,
                    data.response.data,
                    true
                );
            } else {
                dispatch(setPaginationFor(product_category_name, {data: data.data}));
                return data.data;
            }

        });
};

export const getAvailableColorsForProductsByCategory = (product_category_name) => dispatch => {
    dispatch(fetchAvailableColorsForProductsByCategoryBegin(product_category_name));
    shop.getAvailableColorsForProductInCategory(product_category_name,
        data => {
            if (data.client_error_message) {
                const errorDispatchType = types.AVAILABLE_COLORS_IN + product_category_name;
                throwError(
                    dispatch,
                    errorDispatchType,
                    data.client_error_message,
                    data.client_error_message,
                    false
                );
            }
            else {
                dispatch({
                    type: fetchAvailableColorsInProductCategorySuccess(product_category_name),
                    payload: {colors: data.data.colors}
                });
            }
        });
};

export const getAvailableBrandsForProductsByCategory = (product_category_name) => dispatch => {
    dispatch(fetchAvailableBrandsForProductsByCategoryBegin(product_category_name));
    shop.getAvailableBrandsForProductInCategory(product_category_name,
        data => {
            if (data.client_error_message) {
                const errorDispatchType = types.AVAILABLE_BRANDS_IN + product_category_name;
                throwError(
                    dispatch,
                    errorDispatchType,
                    data.client_error_message,
                    data.client_error_message,
                    false
                );
            } else {
                dispatch({
                    type: fetchAvailableBrandsInProductCategorySuccess(product_category_name),
                    payload: {brands: data.data.brands}
                });
            }
        });
};


export const getAllProducts = (pageNumber, pageSize,) => dispatch => {
    dispatch(fetchAllProductsBegin());
    shop.getAllProductsPaginated(pageNumber, pageSize, data => {
        if (data.client_error_message) {
            throwError(dispatch, FAILED_TO_FETCH_ERROR, data.client_error_message, data.response.data, false);
        } else {
            //order is very important, product category been created must match the order in the api
            dispatch(setPaginationFor(FASHION_PRODUCT, {data: data.data.fashion}));
            dispatch(setPaginationFor(MANUFACTURING_PRODUCT, {data: data.data.manufacturing}));
            dispatch(setPaginationFor(COMPUTER_PRODUCT, {data: data.data.computer}));
            dispatch(setPaginationFor(RAW_MATERIALS_PRODUCT, {data: data.data.rawmaterial}));
            dispatch(setPaginationFor(ELECTRONICS_PRODUCT, {data: data.data.electronics}));
            dispatch(setPaginationFor(PHONE_PRODUCT, {data: data.data.phone}));
            dispatch(setPaginationFor(BEAUTY_PRODUCT, {data: data.data.beauty}));
            return data.data;
        }

    })
};


export const searchAllProducts = (searchTerm) => dispatch => {
    dispatch(searchAllProductsBegin());
    return shop.searchAllProducts(searchTerm);
};

// export const getAllProducts = () => dispatch => {
//     dispatch(fetchProductsBegin());
//     shop.getProducts(products => {
//         dispatch(receiveProducts(products));
//         return products;
//     })
// }
export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
});

const throwError = (dispatch, type, client_error_message, debug_message, showToastMessage) => {
    if (showToastMessage) {
        notify.error(client_error_message);
    }
    console.log(client_error_message);
    dispatch({
        type: FAILED_TO_FETCH_ERROR + type,
        payload: {error: client_error_message, debug_message: debug_message}
    });
};
