import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'


import Breadcrumb from '../common/breadcrumb';
import {addToCartAndRemoveWishlist, removeFromWishlist} from '../../actions'

class wishList extends Component {


    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){

        const {Items, symbol,cartInfo} = this.props;

        return (
            <div>
                <Breadcrumb title={'Wishlist'} />
                {Items.length>0 ?
                <section className="wishlist-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                    <tr className="table-head">
                                        <th scope="col">image</th>
                                        <th scope="col">product name</th>
                                        <th scope="col">price</th>
                                        <th scope="col">Add to Cart</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                    </thead>
                                    {Items.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                            <tr>
                                                <td>
                                                    {/*todo make link clickable*/}
                                                    <Link to={`${process.env.PUBLIC_URL}${item.routeToProductView}/${item._id}`}>
                                                        <img src={`${item.imageUrls[0]}`} alt="" />
                                                    </Link>
                                                </td>
                                                <td><Link to={`${process.env.PUBLIC_URL}${item.routeToProductView}/${item._id}`}>{item.name}</Link>
                                                    <div className="mobile-cart-content row">
                                                        <div className="col-xs-3">
                                                            <h2 className="money">{symbol}{(item.price)}</h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <a href="#" className="cart" onClick={() => this.props.addToCartAndRemoveWishlist(cartInfo,item, 1)}>
                                                                    <i className="fa fa-shopping-cart"></i>
                                                                </a>
                                                            </h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">
                                                                <a href="#" className="icon" onClick={() => this.props.removeFromWishlist(item)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><h2>{symbol}{item.price}</h2></td>
                                                <td>
                                                    <a href="#" className="cart" onClick={() => this.props.addToCartAndRemoveWishlist(cartInfo,item, 1)}>
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="icon" onClick={() => this.props.removeFromWishlist(item)}>
                                                        <i className="fa fa-times"></i>
                                                    </a>

                                                </td>
                                            </tr>
                                            </tbody> )
                                    })}
                                </table>
                            </div>
                        </div>
                        <div className="row wishlist-buttons">
                            <div className="col-12">
                                <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">continue shopping</Link>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <section className="cart-section section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/empty-wishlist.png`} className="img-fluid mb-4" alt="" />
                                        <h3>
                                            <strong>WhishList is Empty</strong>
                                        </h3>
                                        <h4>Explore more shortlist some items.</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    Items: state.wishlist.list,
    symbol: state.data.symbol,
    cartInfo: state.cartList,

})

export default connect(
    mapStateToProps,
    {addToCartAndRemoveWishlist, removeFromWishlist}
)(wishList)
