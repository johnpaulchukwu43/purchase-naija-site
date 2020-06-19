/**
 * Mocking client-server processing
 */
import _products from './data.json'
import {
    BEAUTY_PRODUCT,
    COMPUTER_PRODUCT,
    ELECTRONICS_PRODUCT,
    FASHION_PRODUCT,
    MANUFACTURING_PRODUCT, PHONE_PRODUCT,
    RAW_MATERIALS_PRODUCT
} from "../constants/ActionTypes";
import {
    BEAUTY_PRODUCT_ENDPOINT,
    CART_ENDPOINT,
    COMPUTER_PRODUCT_ENDPOINT,
    ELECTRONICS_PRODUCT_ENDPOINT,
    FASHION_PRODUCTS_ENDPOINT,
    GET_ALL_PRODUCTS_ENDPOINT,
    getCartEndpoint, getEndpointForAvailableBrandsForGivenProductType,
    getEndpointForAvailableColorsForGivenProductType, getEndpointForProductCategory,
    MANUFACTURING_PRODUCT_ENDPOINT,
    PHONE_PRODUCT_ENDPOINT,
    RAW_MATERIAL_PRODUCT_ENDPOINT,
    searchAllProductsEndpoint,
    updateCartEndpoint,
    updateCartTypeAndOwnerEndpoint
} from "../constants/endpoints";
import queryStringBuilder from "query-string-builder";

import  {axiosInstance,catcher} from './requestHandler'

const TIMEOUT = 0;

let paginatedEndpointForProductCategory = null;
let page = null;
let size = null;
let category = null;
let queryOptions = null;
let filterOptions = null;
//cart api
const addToCart = (cb=()=>{},requestBody)=>{
    axiosInstance.post(CART_ENDPOINT,requestBody)
        .then(res=>{
            cb(catcher(res));
        });
};

const fetchCart = (cb=()=>{},userId,cartType)=>{
    const endpoint = getCartEndpoint(userId,cartType);
    axiosInstance.get(endpoint)
        .then(res=>{
            cb(catcher(res));
        });
};

const updateProductInCart = (cb=()=>{}, userId, category, productId, newQuantity,adjustmentType)=>{
    const endpoint= updateCartEndpoint(userId,category,productId);
    console.log(endpoint);
    const body = {
        quantity:newQuantity,
        crementType:adjustmentType
    };
    axiosInstance.put(endpoint,body)
        .then(res=>{
            cb(catcher(res));
        });
};

const updateCartTypeAndOwner = (cb=()=>{},oldUserId,body)=>{
    const endpoint =updateCartTypeAndOwnerEndpoint(oldUserId);

    axiosInstance.put(endpoint,body)
        .then(res=>{
            cb(catcher(res));
        });
};


const deleteProductFromCart = (cb=()=>{}, userId, category, productId)=>{
    const endpoint= updateCartEndpoint(userId,category,productId);
    axiosInstance.delete(endpoint)
        .then(res=>{
            cb(catcher(res));
        });
};


const getProductsByCategory = (product_category,pageNumber,pageSize,cb= () => {})=>{
    page = pageNumber;
    size = pageSize;
    /*
    this is done in order to know when we re re-querying for the same category type
    if they re the same we use the existing queryOptions variable else set it to null
     */
    if(category === null){
        category = product_category;
    }else{
        if(category !== product_category){
            queryOptions = null;
            filterOptions = null;
            category = product_category;
        }
    }
    let endpointForProductCategory = getEndpointForProductCategory(product_category);
    if(endpointForProductCategory === null){
        return cb({client_error_message:`Unable to fetch available products for ${product_category}. Please contact Site Admin.`});
    }
    paginatedEndpointForProductCategory = appendBasePageParam(endpointForProductCategory,pageNumber,pageSize)+"&"+queryOptions+"&"+filterOptions;
    console.log("getProductsByCategory: "+paginatedEndpointForProductCategory);
    axiosInstance.get(paginatedEndpointForProductCategory)
        .then((response)=>{
            cb(catcher(response));
        });
};



const getAvailableColorsForProductInCategory = (product_category, cb =() =>{}) =>{
    let endpointForAvailableColorsForGivenProductType = getEndpointForAvailableColorsForGivenProductType(product_category);
    if(endpointForAvailableColorsForGivenProductType === null){
        return cb({client_error_message:`Unable to fetch available colors for ${product_category}`});
    }
    axiosInstance.get(endpointForAvailableColorsForGivenProductType)
        .then((response)=>{
            cb(catcher(response));
        });
};

const getAvailableBrandsForProductInCategory = (product_category, cb =() =>{}) =>{
    let endpointForAvailableBrandsForGivenProductType = getEndpointForAvailableBrandsForGivenProductType(product_category);
    if(endpointForAvailableBrandsForGivenProductType === null){
        return cb({client_error_message:`Unable to fetch available brands for ${product_category}`});
    }
    axiosInstance.get(endpointForAvailableBrandsForGivenProductType)
        .then((response)=>{
            cb(catcher(response));
        });
};

const getAllProductsPaginated = (pageNumber,pageSize,cb= () => {})=>{
    paginatedEndpointForProductCategory = appendBasePageParam(GET_ALL_PRODUCTS_ENDPOINT,pageNumber,pageSize);
    axiosInstance.get(paginatedEndpointForProductCategory)
        .then((response)=>{
            cb(catcher(response));
        });
};


const searchAllProducts = (searchTerm)=>{
    return new Promise((resolve)=>{
        let endpoint = searchAllProductsEndpoint(searchTerm);
        axiosInstance.get(endpoint)
            .then((response)=>{
                resolve(catcher(response));
            });
    })
};

const sortProducts = (cb=()=>{},params)=>{
    if(paginatedEndpointForProductCategory!=null){
        //we remove all previous parameters appended on the url
        let tempEndpoint = removeAllParamFromUrl(paginatedEndpointForProductCategory);
        //after which we append our page Param
        tempEndpoint = appendBasePageParam(tempEndpoint,page,size);
        //append filter param if any
        if(filterOptions){
            tempEndpoint = tempEndpoint+"&"+filterOptions+"&";
        }else{
            tempEndpoint = tempEndpoint+"&";
        }
        let sortEndpoint = buildSortQueries(tempEndpoint,params);
        axiosInstance.get(sortEndpoint)
            .then((response)=>{
                cb(catcher(response));
            });
    }else{
        console.log("i am null");
    }

};

const filterProducts = (cb=()=>{},params)=>{
    if(paginatedEndpointForProductCategory!=null){
        //we remove all previous parameters appended on the url
        let tempEndpoint = removeAllParamFromUrl(paginatedEndpointForProductCategory);
        //after which we append our page Param
        tempEndpoint = appendBasePageParam(tempEndpoint,page,size);
        //append sort param if any
        if(queryOptions){
            tempEndpoint = tempEndpoint+"?"+queryOptions+"&";
        }else{
            tempEndpoint = tempEndpoint+"&";
        }
        //create filter parameters
        let filterEndpoint = buildFilterQueries(tempEndpoint,params);
        console.log(filterEndpoint);
        axiosInstance.get(filterEndpoint)
            .then((response)=>{
                cb(catcher(response));
            });
    }else{
        console.log("i am null");
    }

};

const buildSortQueries = (url, params)=>{
    let {sortOption,orderOption}= params;

    let builder = new queryStringBuilder({
        "sortOption": {
            "method": "set",
            "param": "sortBy"
        },
        "orderOption": {
            "method": "set",
            "param": "order"
        }
    });

    let customEndpoint = builder
        .sortOption(sortOption)
        .orderOption(orderOption)
        .toString();
    console.log(customEndpoint);
    queryOptions = customEndpoint;
    console.log(`sorted: ${url}${customEndpoint}`);
    return `${url}${customEndpoint}`;
};

const buildFilterQueries = (url, params)=>{
    let {color,brands,value}= params;
    let min,max;
    console.log(JSON.stringify(value));
    if(value){
        min = value.min;
        max = value.max;
    }

    let builder = new queryStringBuilder({
        "colors": {
            "method": "set",
            "param": "colors"
        },
        "brands": {
            "method": "set",
            "param": "brands"
        },
        "minPrice": {
            "method": "set",
            "param": "minPrice"
        },
        "maxPrice": {
            "method": "set",
            "param": "maxPrice"
        }
    });
    let customEndpoint = builder
        .colors(color)
        .brands(brands)
        .minPrice(min)
        .maxPrice(max)
        .toString();
    filterOptions = customEndpoint;
    console.log(`filtered: ${url}${customEndpoint}`);
    return `${url}${customEndpoint}`;
};

const appendBasePageParam = (url,pageNumber,pageSize) =>{
    return `${url}?pageNum=${pageNumber}&pageSize=${pageSize}`
};

const removeAllParamFromUrl = (url)=>{
    console.log("removed noise"+url.split("?")[0]);
    return url.split("?")[0];
};


export default {
    getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
    getProductsByCategory: getProductsByCategory,
    sortProducts: sortProducts,
    filterProducts:filterProducts,
    addTocart:addToCart,
    updateProductInCart:updateProductInCart,
    fetchCart:fetchCart,
    deleteProductFromCart:deleteProductFromCart,
    updateCartTypeAndOwner,
    searchAllProducts,
    getAllProductsPaginated,
    getAvailableColorsForProductInCategory,
    getAvailableBrandsForProductInCategory,
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
