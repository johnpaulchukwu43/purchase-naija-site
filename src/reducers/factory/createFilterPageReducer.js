const initialState = {
    value: { min: 100, max: 100000 }
};
const createFilterPageReducerFor = (prefix) => {

    const filterPageReducer = (state = initialState, action) => {
        const { type, payload } = action;
        switch (type) {
            case "FILTER_BY_"+prefix:
                return Object.assign({}, state,payload);
            default:
                return state;
        }
    };
    return filterPageReducer;
};


export default createFilterPageReducerFor;
