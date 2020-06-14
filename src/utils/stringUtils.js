const makeString = (object) =>{
    if (object == null) return '';
    return '' + object;
};

export const isBlank = (str) =>{
    return (/^\s*$/).test(makeString(str));
};
