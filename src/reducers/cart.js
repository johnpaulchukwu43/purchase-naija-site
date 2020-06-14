import {
    ADD_TO_CART,
    CREATE_GUEST_CART,
    DECREMENT_QTY, RECEIVE_CART, CREATE_USER_CART
} from "../constants/ActionTypes";

const initialState = {
    userId:null,
    cartInfo:{
      products:[],
      cartType:null
    },
    cart:[],
};


export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_GUEST_CART:
            const guestId = action.guest.guestId;
            return {
                guestId:guestId,
                cartInfo:{
                    cartType:"guest",
                    products:[]
                },
            };
        case CREATE_USER_CART:
            return {
                userId:action.user.userId,
                cartInfo:{
                    cartType:"customer",
                    products:[...state.cartInfo.products]
                },
            };

        case RECEIVE_CART:
            let {cartInfo,userId} = action.payload;
            if(cartInfo.cartType ==="guest"){
                return {
                    guestId:userId,
                    cartInfo:{
                        cartType:cartInfo.cartType,
                        products:cartInfo.products
                    },
                };
            }else{
                return {
                    userId:userId,
                    cartInfo:{
                        cartType:cartInfo.cartType,
                        products:cartInfo.products
                    },
                    cart:state.cart
                };
            }

        case ADD_TO_CART:
            const productId = action.product.id;
            if (state.cart.findIndex(product => product.id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.id === productId) {
                        cartAcc.push({ ...product, qty: product.qty+1, sum: (product.price*product.discount/100)*(product.qty+1) }) // Increment qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, []);

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (action.product.price*action.product.discount/100)*action.qty }] }

        case DECREMENT_QTY:

            if (state.cart.findIndex(product => product.id === action.productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.id === action.productId && product.qty > 1) {
                        //console.log('price: '+product.price+'Qty: '+product.qty)
                        cartAcc.push({ ...product, qty: product.qty-1, sum: (product.price*product.discount/100)*(product.qty-1) }) // Decrement qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: action.product.price*action.qty }] }

        default:
    }
    return state;
}
