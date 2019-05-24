/*
 Created by Johnpaul Chukwu @ $
*/
import {combineReducers} from "redux";
import FilterFactory from './factory/createFilterPageReducer';
import {BRAND, COLOR, CREATED_AT, PRICE, PRICE_RANGE} from "../constants/ActionTypes";

const priceReducer = FilterFactory(PRICE);
const priceRangeReducer = FilterFactory(PRICE_RANGE);
const brandReducer = FilterFactory(BRAND);
const colorReducer = FilterFactory(COLOR);
const latestReducer = FilterFactory(CREATED_AT);

const filterReducer = combineReducers({
    priceReducer:priceReducer,
    brandReducer:brandReducer,
    colorReducer:colorReducer,
    latestReducer:latestReducer,
    priceRangeReducer:priceRangeReducer

});

export default filterReducer;
