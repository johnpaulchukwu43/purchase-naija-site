//Auth
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';
export const SET_GUEST_USER = 'SET_GUEST_USER';
export const GET_ERRORS  = 'GET_ERRORS';
export const GET_LOGIN_ERRORS  = 'GET_LOGIN_ERRORS';
export const GET_GUEST_TOKEN_ERROR  = 'GET_GUEST_TOKEN_ERROR';
export const GET_SIGNUP_ERRORS  = 'GET_SIGNUP_ERRORS';
export const GET_PROVIDER_SIGNUP_ERRORS  = 'GET_PROVIDER_SIGNUP_ERRORS';
export const CREATE_USER_SUCCESSFUL  = 'CREATE_USER_SUCCESSFUL';
export const CREATE_PROVIDER_SUCCESSFUL  = 'CREATE_PROVIDER_SUCCESSFUL';
export const UPDATE_USER_INFO_BEGIN  = 'UPDATE_USER_INFO_BEGIN';
export const UPDATE_USER_INFO_SUCCESSFUL  = 'UPDATE_USER_INFO_SUCCESSFUL';
export const UPDATE_USER_INFO_FAILED  = 'UPDATE_USER_INFO_FAILED';
export const UPDATE_USER_PASSWORD_BEGIN  = 'UPDATE_USER_PASSWORD_BEGIN';
export const UPDATE_USER_PASSWORD_SUCCESSFUL  = 'UPDATE_USER_PASSWORD_SUCCESSFUL';
export const UPDATE_USER_PASSWORD_FAILED  = 'UPDATE_USER_PASSWORD_FAILED';
export const USER_TOKEN  = 'UserToken';
export const GUEST_TOKEN  = 'GuestToken';


// Get Products
export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_ALL_PRODUCTS_BEGIN = 'FETCH_ALL_PRODUCTS_BEGIN';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT';
export const FAILED_TO_FETCH_ERROR = 'FAILED_TO_FETCH_ERROR';
export const fetchProductByCategorySuccess = (product_category) => 'FETCH '+product_category+' SUCCESS';
export const fetchAvailableBrandsInProductCategorySuccess = (product_category) => 'FETCH AVAILABLE_BRANDS_IN' + product_category +' SUCCESS';
export const fetchAvailableColorsInProductCategorySuccess = (product_category) => 'FETCH AVAILABLE_COLORS_IN' + product_category +' SUCCESS';
//search
export const SEARCH_ALL_PRODUCTS_BEGIN = 'SEARCH_ALL_PRODUCTS_BEGIN';
export const SEARCH_ALL_PRODUCTS_SUCCESS = 'SEARCH_ALL_PRODUCTS_SUCCESS';
export const SEARCH_ALL_PRODUCTS_FAILED = 'SEARCH_ALL_PRODUCTS_FAILED';

//
export const SET_CATEGORY_TYPE = 'CATEGORY_TYPE';
export const AVAILABLE_COLORS_IN = 'AVAILABLE_COLORS_IN';
export const AVAILABLE_BRANDS_IN = 'AVAILABLE_BRANDS_IN';
export const FILTER_TYPE = 'FILTER_TYPE';



// FILTERS
export const FILTER_BRAND = 'FILTER_BRAND';
export const FILTER_COLOR = 'FILTER_COLOR';
export const FILTER_PRICE = 'FILTER_PRICE';
export const SORT_BY = 'SORT_BY';

export const COLOR = 'COLOR';
export const BRAND = 'BRAND';
export const NAME = 'name';
export const PRICE= "price";
export const PRICE_RANGE= "PRICE_RANGE";
export const CREATED_AT= "createdAt";


export const ASC = "ASC";
export const DESC = "DESC";



export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';


// Cart
export const ADD_TO_CART = 'ADD_TO_CART';
export const CUSTOMER_CART = 'customer';
export const GUEST_CART = 'guest';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REMOVE_FROM_CART_BEGIN = 'REMOVE_FROM_CART_BEGIN';
export const ADD_TO_CART_BEGIN = 'ADD_TO_CART_BEGIN';
export const ADD_TO_CART_WITHOUT_GIVEN_QUANTITY_BEGIN = 'ADD_TO_CART_WITHOUT_GIVEN_QUANTITY_BEGIN';
export const FETCH_CART_BEGIN = 'FETCH_CART_BEGIN';
export const RECEIVE_CART = 'RECEIVE_CART';
export const FAILED_TO_ADD_TO_CART = 'FAILED_TO_ADD_TO_CART';
export const FAILED_TO_FETCH_CART = 'FAILED_TO_FETCH_CART';
export const INCREMENT_QTY = 'INCREMENT_QTY';
export const DECREMENT_QTY = 'DECREMENT_QTY';
export const DECREMENT_QTY_BEGIN = 'DECREMENT_QTY_BEGIN';
export const CREATE_GUEST_CART = 'CREATE_GUEST_CART';
export const CREATE_USER_CART = 'CREATE_USER_CART';
export const UPDATE_CART_TYPE_AND_OWNER_BEGIN = 'UPDATE_CART_TYPE_AND_OWNER_BEGIN';
export const UPDATE_CART_TYPE_AND_OWNER_FAILED = 'UPDATE_CART_TYPE_AND_OWNER_FAILED';
export const UPDATE_CART_TYPE_AND_OWNER_SUCCESS = 'UPDATE_CART_TYPE_AND_OWNER_SUCCESS';

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const PENDING = "PENDING";
export const DONE = "DONE";
export const E_PAYMENT = 'Online Payment';
export const PAY_ON_DELIVERY = 'Pay On Delivery';


// WishList
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';


// Compare
export const ADD_TO_COMPARE = 'ADD_TO_COMPARE'
export const REMOVE_FROM_COMPARE = 'REMOVE_FROM_COMPARE'

//errorMessage
export const API_SERVER_UNREACHABLE = 'Unable to get response from server, Try again.';
export const NO_PRODUCTS_FOUND = 'No Products found !';


// CheckOut Process
export const CHECKOUT_BEGIN = 'CHECKOUT_BEGIN';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

//category names as defined on backend
export const fashionCollection = 'fashions';
export const rawMaterialCollection = 'rawmaterials';
export const phoneCollection = 'phones';
export const electronicCollections = 'electronics';
export const manufacturingCollection = 'manufacturing';
export const beautyCollection = 'beauties';
export const computerCollection = 'computers';

//!! warning do not change these names, they re used in reducers, views to identify categories !!
export const FASHION_PRODUCT = "fashionProducts";
export const RAW_MATERIALS_PRODUCT = "rawMaterialProducts";
export const ELECTRONICS_PRODUCT = "electronicsProducts";
export const PHONE_PRODUCT = "phoneProducts";
export const MANUFACTURING_PRODUCT = "manufacturingProducts";
export const COMPUTER_PRODUCT = "computerProducts";
export const BEAUTY_PRODUCT = "beautyProducts";
// i repeat do not change
