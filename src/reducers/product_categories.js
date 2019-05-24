import PaginationFactory from './factory/createPaginationReducer';
import {combineReducers} from "redux";
import {
    BEAUTY_PRODUCT,
    COMPUTER_PRODUCT,
    ELECTRONICS_PRODUCT,
    FASHION_PRODUCT,
    MANUFACTURING_PRODUCT,
    PHONE_PRODUCT,
    RAW_MATERIALS_PRODUCT
} from "../constants/ActionTypes";

 const fashionReducer = PaginationFactory(FASHION_PRODUCT);
 const rawMaterialReducer = PaginationFactory(RAW_MATERIALS_PRODUCT);
 const electronicsReducer = PaginationFactory(ELECTRONICS_PRODUCT);
 const phoneReducer = PaginationFactory(PHONE_PRODUCT);
 const manufacturingReducer = PaginationFactory(MANUFACTURING_PRODUCT);
 const computerReducer = PaginationFactory(COMPUTER_PRODUCT);
 const beautyReducer =PaginationFactory(BEAUTY_PRODUCT);

 const productCategoriesReducer = combineReducers({
     fashionProducts:fashionReducer,
     rawMaterialProducts:rawMaterialReducer,
     electronicsProducts:electronicsReducer,
     phoneProducts:phoneReducer,
     manufacturingProducts:manufacturingReducer,
     computerProducts:computerReducer,
     beautyProducts:beautyReducer,
});

 export default productCategoriesReducer;

