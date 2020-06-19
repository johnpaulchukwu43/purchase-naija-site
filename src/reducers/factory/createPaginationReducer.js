import * as types from "../../constants/ActionTypes";
import {FAILED_TO_FETCH_ERROR} from "../../constants/ActionTypes";
import {fetchProductByCategorySuccess} from "../../constants/ActionTypes";
import {fetchAvailableBrandsInProductCategorySuccess} from "../../constants/ActionTypes";
import {fetchAvailableColorsInProductCategorySuccess} from "../../constants/ActionTypes";

const initialPaginationState = {
    data: [],
    symbol: '₦',
    product_details: [],
    available_colors: {data: [], error_message: null},
    available_brands: {data: [], error_message: null}
};
const paginationReducerFor = (product_category) => {
    return (state = initialPaginationState, action) => {
        const {type, payload} = action;
        switch (type) {
            case fetchProductByCategorySuccess(product_category):
                return Object.assign({}, state, {
                    data: payload.data.docs,
                    total: payload.data.total,
                    current_page: payload.data.page,
                    page_size: payload.data.limit,
                    num_of_pages: payload.data.pages,
                    error_message: null

                });
            case FAILED_TO_FETCH_ERROR + FAILED_TO_FETCH_ERROR:
                return {
                    ...state,
                    error_message: action.payload
                };
            case fetchAvailableColorsInProductCategorySuccess(product_category):
                return {
                    ...state,
                    available_colors: {data: payload.colors, error_message: false}
                };
            case FAILED_TO_FETCH_ERROR + types.AVAILABLE_COLORS_IN + product_category:
                let temp_holder_available_colors = initialPaginationState.available_colors;
                temp_holder_available_colors.error_message = action.payload;
                return {
                    ...state,
                    available_colors: temp_holder_available_colors
                };
            case fetchAvailableBrandsInProductCategorySuccess(product_category):
                return {
                    ...state,
                    available_brands: {data: payload.brands, error_message: false}
                };
            case FAILED_TO_FETCH_ERROR + types.AVAILABLE_BRANDS_IN + product_category:
                let temp_holder_available_brands = initialPaginationState.available_brands;
                temp_holder_available_brands.error_message = action.payload;
                return {
                    ...state,
                    available_brands: temp_holder_available_brands
                };
            default:
                return state;
        }
    };
};

export default paginationReducerFor
