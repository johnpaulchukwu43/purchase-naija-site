import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {FASHION_SINGLE_PRODUCT_ROUTE} from "../../../../constants/app-routes";

const CartHeader  = ({item, total, symbol, removeFromCart}) => (
            <li >
                <div className="media">
                    <Link to={`${process.env.PUBLIC_URL}/${FASHION_SINGLE_PRODUCT_ROUTE}/${item.id}`}><img alt="" className="mr-3" src={`${item.productInfo.imageUrls[0]}`} /></Link>
                    <div className="media-body">
                        <Link to={`${process.env.PUBLIC_URL}/${FASHION_SINGLE_PRODUCT_ROUTE}/${item.productInfo.id}`}><h4>{item.productInfo.name}</h4></Link>
                        <h4><span>{item.productInfo.qty} x {symbol} {(item.productInfo.price)}</span></h4>
                    </div>
                </div>
                {/*<span>{cart}</span>*/}
                <div className="close-circle">
                    <a href={null} onClick={ removeFromCart}><i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
            </li>
        )



export default CartHeader;
