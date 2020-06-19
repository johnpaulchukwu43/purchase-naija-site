import {fetchProductByCategorySuccess} from "../../constants/ActionTypes";

const setPaginationFor = (product_category,response) => {
        return {
            type: fetchProductByCategorySuccess(product_category),
            payload: response
        };
};

export default setPaginationFor;
