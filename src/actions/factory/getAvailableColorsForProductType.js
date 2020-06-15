import * as types from "../../constants/ActionTypes";

const getAvailableColorsForProductInCategory = (productType,response) => {
        return {
            type: types.AVAILABLE_COLORS_IN + productType,
            payload: response
        };
};

export default getAvailableColorsForProductInCategory;
