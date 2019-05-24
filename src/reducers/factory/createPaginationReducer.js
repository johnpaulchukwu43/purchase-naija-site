import * as types from "../../constants/ActionTypes";
import {FAILED_TO_FETCH_ERROR} from "../../constants/ActionTypes";

const initialPaginationState = {
    data:[],
    symbol: '₦',
    product_details: []
};
const paginationReducerFor = (prefix) => {
    const paginationReducer = (state = initialPaginationState, action) => {
        const { type, payload } = action;
        switch (type) {
            case prefix + types.SET_CATEGORY_TYPE:
                return Object.assign({}, state, {
                    data:payload.data.docs,
                    total:payload.data.total,
                    current_page:payload.data.page,
                    page_size:payload.data.limit,
                    num_of_pages:payload.data.pages,
                    error_message:null

                });
            case FAILED_TO_FETCH_ERROR:
                return {
                    ...state,
                    error_message:action.payload
                };
            default:
                return state;
        }
    };
    return paginationReducer;
};

export default paginationReducerFor
