
// Get Unique Brands from Json Data
import {
    BEAUTY_PRODUCT, beautyCollection,
    COMPUTER_PRODUCT, computerCollection, electronicCollections,
    ELECTRONICS_PRODUCT,
    FASHION_PRODUCT, fashionCollection,
    MANUFACTURING_PRODUCT, manufacturingCollection,
    PHONE_PRODUCT, phoneCollection,
    RAW_MATERIALS_PRODUCT, rawMaterialCollection
} from "../constants/ActionTypes";
import {
    BEAUTY_SINGLE_PRODUCT_ROUTE,
    COMPUTER_SINGLE_PRODUCT_ROUTE,
    ELECTRONICS_SINGLE_PRODUCT_ROUTE,
    FASHION_SINGLE_PRODUCT_ROUTE, MANUFACTURING_SINGLE_PRODUCT_ROUTE, PHONE_SINGLE_PRODUCT_ROUTE,
    RAW_MATERIAL_SINGLE_PRODUCT_ROUTE
} from "../constants/app-routes";

export const getBrands = (products) => {
    var uniqueBrands = [];
    products.map((product, index) =>
        product.tags.map((tag) =>
        {
            if(uniqueBrands.indexOf(tag) === -1){
                uniqueBrands.push(tag);
            }
        })
    )
    //console.log(uniqueBrands)
    return uniqueBrands;
}

// Get Unique Colors from Json Data
export const getColors = (products) => {
    var uniqueColors = [];
    products.map((product, index) =>
        product.colors.map((color) =>
        {
            if(uniqueColors.indexOf(color) === -1){
                uniqueColors.push(color);
            }
        })
    )
    //console.log(uniqueBrands)
    return uniqueColors;
};

// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products) => {
    let min = 100, max = 1000;

    products.map((product, index) => {
        let v = product.price;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
    })

    return {'min':min, 'max':max};
}

export const getVisibleproducts = (data, { brand, color, value, sortBy, startPrice, endPrice }) => {
    return data.products.filter(product => {

        const brandMatch = product.tags.some(tag => brand.includes(tag))

        let colorMatch;
        if(color) {
            colorMatch = product.colors.includes(color)
        }else{
            colorMatch = true;
        }
        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.price;
        const endPriceMatch = typeof value.max !== 'number' || product.price <= value.max;

        return brandMatch && colorMatch && startPriceMatch && endPriceMatch;
    }).sort((product1, product2) => {
        if (sortBy === 'HighToLow') {
            return product2.price < product1.price ? -1 : 1;
        } else if (sortBy === 'LowToHigh') {
            return product2.price > product1.price ? -1 : 1;
        } else if (sortBy === 'Newest') {
            return product2.id < product1.id ? -1 : 1;
        } else if (sortBy === 'AscOrder') {
            return product1.name.localeCompare(product2.name);
        } else if (sortBy === 'DescOrder') {
            return product2.name.localeCompare(product1.name);
        }
    });
}


export const getVisibleRawproducts = (data, { brand, color, value, sortBy, startPrice, endPrice }) => {
    return data.filter(product => {

        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.price;
        const endPriceMatch = typeof value.max !== 'number' || product.price <= value.max;

        return  startPriceMatch && endPriceMatch;
    }).sort((product1, product2) => {
        if (sortBy === 'HighToLow') {
            return product2.price < product1.price ? -1 : 1;
        } else if (sortBy === 'LowToHigh') {
            return product2.price > product1.price ? -1 : 1;
        } else if (sortBy === 'Newest') {
            return product2.id < product1.id ? -1 : 1;
        } else if (sortBy === 'AscOrder') {
            return product1.name.localeCompare(product2.name);
        } else if (sortBy === 'DescOrder') {
            return product2.name.localeCompare(product1.name);
        }
    });
}

export const getCartTotal = cartItems => {
    var total = 0;
    for(var i=0; i<cartItems.length; i++){
        total += parseInt(cartItems[i].quantity, 10)*parseInt((cartItems[i].productInfo.price), 10);
    }
    return total;
};

export const getPositionIncart = (products,id)=>{
    let pos = null;
    products.forEach((item,index)=>{
        if(item.productId === id){
            pos = index;
        }
    })
    return pos;
};


// Get TOP Collection
export const getTopCollection = products => {
    const items = products.filter(product => {
        return product.rating > 4;
    })
    return items.slice(0,8)
}

// Get Best Seller
export const getBestSeller = products => {
    const items = products.filter(product => {
        return product.sale === true;
    })

    return items.slice(0,8)
}

// Get Mens Wear
export const getMensWear = products => {
    const items = products.filter(product => {
        return product.category === 'men';
    })

    return items.slice(0,8)
}

// Get Womens Wear
export const getWomensWear = products => {
    const items = products.filter(product => {
        return product.category === 'women';
    })

    return items.slice(0,8)
};

export const getProductsInSpecifiedCategory = (specified_category,all_categories)=>{
    const allData = Object.entries(all_categories);
    let extractedInfo;
    let products;
    let product_length;

    for (const [category,values] of allData){
        if(category === specified_category){
            products = [...values.data];
            product_length = values.total;
            extractedInfo = values;
        }
    }
    return {products,extractedInfo,product_length};
};

export const determineRouteForSingleProductView = (categoryName)=>{
    switch(categoryName){
        case FASHION_PRODUCT:
            return FASHION_SINGLE_PRODUCT_ROUTE;
        case RAW_MATERIALS_PRODUCT:
           return RAW_MATERIAL_SINGLE_PRODUCT_ROUTE;
        case ELECTRONICS_PRODUCT:
           return ELECTRONICS_SINGLE_PRODUCT_ROUTE;
        case PHONE_PRODUCT:
            return PHONE_SINGLE_PRODUCT_ROUTE;
        case MANUFACTURING_PRODUCT:
            return MANUFACTURING_SINGLE_PRODUCT_ROUTE;
        case COMPUTER_PRODUCT:
            return COMPUTER_SINGLE_PRODUCT_ROUTE;
        case BEAUTY_PRODUCT:
            return BEAUTY_SINGLE_PRODUCT_ROUTE;
        default:
            break;
    }
};


export const determineCategoryFromProductFromApiResult = (categoryName)=>{
    switch(categoryName){
        case fashionCollection:
            return FASHION_PRODUCT;
        case rawMaterialCollection:
            return RAW_MATERIALS_PRODUCT;
        case electronicCollections:
            return ELECTRONICS_PRODUCT;
        case phoneCollection:
            return PHONE_PRODUCT;
        case manufacturingCollection:
            return MANUFACTURING_PRODUCT;
        case computerCollection:
            return MANUFACTURING_PRODUCT;
        case beautyCollection:
            return BEAUTY_PRODUCT;
        default:
            break;
    }
};


// Get Single Product
export const getSingleItem = (products, id) => {

    const items = products.find((element) => {
        return element.id === id;
    })
    return items;
}


