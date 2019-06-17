import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import CartPage from '../components/common/headers/common/cart-header'
import {removeFromCart} from '../actions/cartActions'
import {getCartTotal} from '../services'
import * as PropTypes from "prop-types";

class CartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCartDiv:false
        }
    }

    render() {
        let {cartList, total, symbol, removeFromCart, cartProducts,hideOtherViews} = this.props;
        return (

            <li id="cart" className="onhover-div mobile-cart" onClick={hideOtherViews}>
                <Link to={`${process.env.PUBLIC_URL}/cart`}>
                    <div className="cart-qty-cls">{cartProducts.length}</div>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/icon/cart.png`} className="img-fluid" alt=""/>
                    <i className="fa fa-shopping-cart"></i>
                </Link>
                <ul className="show-div shopping-cart ">
                    {cartProducts.map((item, index) => (
                        <CartPage key={index} item={item} total={total} symbol={symbol}
                                  removeFromCart={() => removeFromCart(cartList, item)}/>
                    ))}
                    {(cartProducts.length > 0) ?
                        <div>
                            <li>
                                <div className="total">
                                    <h5>subtotal : <span>{symbol}{total}</span></h5>
                                </div>
                            </li>
                            <li>
                                <div className="buttons">
                                    <Link to={`${process.env.PUBLIC_URL}/cart`} className="view-cart">view cart</Link>
                                    <Link to={`${process.env.PUBLIC_URL}/checkout`} className="checkout">checkout</Link>
                                </div>
                            </li>
                        </div>
                        :
                        <li><h5>Your cart is currently empty.</h5></li>}
                </ul>

            </li>
        );
    }
}

CartContainer.propTypes = {
    cartList: PropTypes.any,
    total: PropTypes.any,
    symbol: PropTypes.any,
    removeFromCart: PropTypes.any,
    cartProducts: PropTypes.any
}


function mapStateToProps(state) {
    return {
        cartProducts: state.cartList.cartInfo.products,
        cartList: state.cartList,
        total: getCartTotal(state.cartList.cartInfo.products),
        symbol: state.data.symbol
    }
}

export default connect(mapStateToProps, {removeFromCart})(CartContainer);
