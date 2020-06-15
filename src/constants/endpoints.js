import {
    BEAUTY_PRODUCT,
    COMPUTER_PRODUCT,
    ELECTRONICS_PRODUCT,
    FASHION_PRODUCT,
    MANUFACTURING_PRODUCT, PHONE_PRODUCT,
    RAW_MATERIALS_PRODUCT
} from "./ActionTypes";

export const BASE_PATH = "/api/v1";
export const LOGIN_USER_ENDPOINT = `${BASE_PATH}/user/login`;
export const REGISTER_USER_ENDPOINT = `${BASE_PATH}/user/signup`;
export const LOGIN_SERVICE_PR0_ENDPOINT = `${BASE_PATH}/serviceProvider/login`;
export const REGISTER_SERVICE_PR0_ENDPOINT =`${BASE_PATH}/serviceProvider/signup` ;
export const GET_GUEST_TOKEN_ENDPOINT =`${BASE_PATH}/guest/getToken` ;

export const searchAllProductsEndpoint =(searchTerm)=>{
    return `${BASE_PATH}/product/search/?searchTerm=${searchTerm}`
};

export const updateUserInfoEndpoint = (userId)=>{
    return `${BASE_PATH}/user/update/${userId}`;
};

export const updateUserPasswordEndpoint = (userId)=>{
    return `${BASE_PATH}/user/update-password/${userId}`;
};
//cart
export const CART_ENDPOINT = `${BASE_PATH}/userCart`;

export const updateCartEndpoint = (userId,category,productId)=>{
    return `${CART_ENDPOINT}/${userId}/${category}/${productId}`;
};


export const updateCartTypeAndOwnerEndpoint = (oldUserId)=>{
    return `${BASE_PATH}/userCartType/${oldUserId}/`;
}

export const getCartEndpoint = (userId,cartType)=>{
    return `${CART_ENDPOINT}/${userId}/${cartType}`;
};

export const userOrderEndpoint = (userId)=>{
    return `${BASE_PATH}/order/${userId}`;
};

export const verifyTransactionStatus = (reference)=>{
    return `${BASE_PATH}/payment/${reference}`;
};

export const FASHION_PRODUCTS_ENDPOINT = `${BASE_PATH}/products/fashion`;
export const RAW_MATERIAL_PRODUCT_ENDPOINT = `${BASE_PATH}/products/rawmaterial`;
export const ELECTRONICS_PRODUCT_ENDPOINT = `${BASE_PATH}/products/electronics`;
export const BEAUTY_PRODUCT_ENDPOINT = `${BASE_PATH}/products/beauty`;
export const MANUFACTURING_PRODUCT_ENDPOINT = `${BASE_PATH}/products/manufacturing`;
export const PHONE_PRODUCT_ENDPOINT = `${BASE_PATH}/products/phone`;
export const COMPUTER_PRODUCT_ENDPOINT = `${BASE_PATH}/products/computer`;
export const GET_ALL_PRODUCTS_ENDPOINT = `${BASE_PATH}/getallproducts`;

export const getEndpointForAvailableColorsForGivenProductType  = (CATEGORY_TYPE)=>{
    let endpoint;
    let getAllColorsPath='getAllColors/';
    switch (CATEGORY_TYPE) {
        case FASHION_PRODUCT:
            endpoint = `${FASHION_PRODUCTS_ENDPOINT}/${getAllColorsPath}`;
            break;
        case RAW_MATERIALS_PRODUCT:
            endpoint = `${RAW_MATERIAL_PRODUCT_ENDPOINT}/${getAllColorsPath}`;
            break;
        case ELECTRONICS_PRODUCT:
            endpoint = `${ELECTRONICS_PRODUCT_ENDPOINT}/${getAllColorsPath}`;
            break;
        case MANUFACTURING_PRODUCT:
            endpoint = `${MANUFACTURING_PRODUCT_ENDPOINT}/${getAllColorsPath}`;
            break;
        case COMPUTER_PRODUCT:
            endpoint = `${COMPUTER_PRODUCT_ENDPOINT}/${getAllColorsPath}`;
            break;
        case BEAUTY_PRODUCT:
            endpoint = `${BEAUTY_PRODUCT_ENDPOINT}/${getAllColorsPath}`;
            break;
        case PHONE_PRODUCT:
            endpoint = `${PHONE_PRODUCT_ENDPOINT}/${getAllColorsPath}`;
            break;
        default:
            endpoint = null
    }
    return endpoint;
};

export const getEndpointForProductCategory = (CATEGORY_TYPE)=>{
    let endpoint;
    switch (CATEGORY_TYPE) {
        case FASHION_PRODUCT:
            endpoint = FASHION_PRODUCTS_ENDPOINT;
            break;
        case RAW_MATERIALS_PRODUCT:
            endpoint = RAW_MATERIAL_PRODUCT_ENDPOINT;
            break;
        case ELECTRONICS_PRODUCT:
            endpoint = ELECTRONICS_PRODUCT_ENDPOINT;
            break;
        case MANUFACTURING_PRODUCT:
            endpoint = MANUFACTURING_PRODUCT_ENDPOINT;
            break;
        case COMPUTER_PRODUCT:
            endpoint = COMPUTER_PRODUCT_ENDPOINT;
            break;
        case BEAUTY_PRODUCT:
            endpoint = BEAUTY_PRODUCT_ENDPOINT;
            break;
        case PHONE_PRODUCT:
            endpoint = PHONE_PRODUCT_ENDPOINT;
            break;
        default:
            endpoint = null
    }
    return endpoint;
};
