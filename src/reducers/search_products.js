import {SEARCH_ALL_PRODUCTS_FAILED, SEARCH_ALL_PRODUCTS_SUCCESS} from "../constants/ActionTypes";

const initialState = {
        products: []
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                fetchSearchResultError:null
            };
        case SEARCH_ALL_PRODUCTS_FAILED:
            return {
                ...state,
                fetchSearchResultError: {
                    actual: action.error.actual,
                    friendly: action.error.friendly
                }
            };

        default:
            return state;
    }
};
export default searchReducer;
