import * as types from "../../constants/ActionTypes";

const setPaginationFor = (prefix,response) => {
        return {
            type: prefix + types.SET_CATEGORY_TYPE,
            payload: response
        };
};

export default setPaginationFor;
