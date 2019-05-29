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
