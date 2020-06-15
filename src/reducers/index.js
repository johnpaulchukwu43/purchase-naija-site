import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import custom components
import productReducer from './products';
import cartReducer from './cart';
import filtersReducer from './filters';
import wishlistReducer from './wishlist';
import authReducer from './auth'
import compareReducer from './compare';
import productCategoriesReducer from "./product_categories";
import filterReducer from "./filter_options";
import searchReducer from "./search_products";


const rootReducer = combineReducers({
    //warning !! do not change keys of object here.
    data: productReducer,
    cartList: cartReducer,
    auth:authReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    categories:productCategoriesReducer,
    searchResults:searchReducer,
    filter_temp:filterReducer,
    Intl
});

export default rootReducer;
