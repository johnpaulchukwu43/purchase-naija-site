import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Slider from 'react-slick';
import {connect} from "react-redux";


class DetailsWithPrice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            quantity: 1,
            stock: 'InStock',
            nav3: null
        }
    }

    onOpenModal = () => {
        this.setState({open: true});
    };

    onCloseModal = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        this.setState({
            nav3: this.slider3
        });
    }

    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({stock: 'InStock'})
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    plusQty = () => {
        if (this.props.item.quantity > this.state.quantity) {
            this.setState({quantity: this.state.quantity + 1})
        } else {
            this.setState({stock: 'Out of Stock !'})

        }
    }
    changeQty = (e) => {
        this.setState({quantity: parseInt(e.target.value)})
    }

    render() {
        const {symbol, item, addToCartClicked, BuynowClicked, addToWishlistClicked, cartList} = this.props;


        var colorsnav = {
            slidesToShow: 6,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };
        let textHeading ={
            fontSize:20,
            fontWeight:600
        };

        let textHeading2 ={
            ...textHeading,
            fontWeight:"lighter"
        };

        let infoContainer ={
            marginTop:10
        }

        return (
            <div className="col-lg-6 rtl-text">
                <div className="product-right">
                    <h2> {item.name} </h2>

                    <div style={infoContainer}>
                         <h3 style={textHeading2} className="money"> {symbol}{(item.price)}</h3>
                    </div>

                    <div style={infoContainer}>
                        <h5 style={textHeading}>Product Code:</h5> <h5 style={textHeading2}> {item.productCode}</h5>
                    </div>

                    {item.colors &&
                        <div style={infoContainer}>
                            <span style={textHeading}>Available Color(s):</span>
                            <ul>
                                <Slider {...colorsnav} asNavFor={this.props.navOne} ref={slider => (this.slider1 = slider)}
                                        className="color-variant">

                                    {item.colors.map((color, i) => {

                                        return (
                                            <li className={color} key={i} title={color}></li>)
                                    })}
                                </Slider>
                            </ul>
                        </div>
                    }
                    {item.brand &&
                        <div style={infoContainer}>
                            <h5 style={textHeading}>Brand:</h5> <h5 style={textHeading2}> {item.brand}</h5>
                        </div>

                    }
                    <div style={infoContainer}>
                        <h5 style={textHeading}>Sold By (Provider):</h5> <h5 style={textHeading2}> {item.provider}</h5>
                    </div>
                    <div className="product-description border-product">
                        <span className="instock-cls">{this.state.stock}</span>
                        <h5 className="product-title">quantity</h5>
                        <div className="qty-box">
                            <div className="input-group">
                                  <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                     <i className="fa fa-angle-left"></i>
                                    </button>
                                  </span>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeQty} className="form-control input-number" />
                                <span className="input-group-prepend">
                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                <i className="fa fa-angle-right"/>
                                </button>
                               </span>
                            </div>
                        </div>
                    </div>
                    {/*<div className="size-box">*/}
                    {/*<ul>*/}
                    {/*{item.size.map((size, i) => {*/}
                    {/*return <li key={i}><a href="#">{size}</a></li>*/}
                    {/*})}*/}
                    {/*</ul>*/}
                    {/*</div>*/}

                    <div style={infoContainer} className="product-buttons">
                        <a className="btn btn-solid"
                           onClick={() => addToCartClicked(cartList, item, this.state.quantity)}>add to cart</a>
                        <Link to={`${process.env.PUBLIC_URL}/checkout`} className="btn btn-solid"
                              onClick={() => BuynowClicked(cartList, item, this.state.quantity)}>buy now</Link>
                    </div>

                    <div className="border-product">
                        <h6 className="product-title">share it</h6>
                        <div className="product-icon">
                            <ul className="product-social">
                                <li><a href="https://www.facebook.com/" target="_blank"><i
                                    className="fa fa-facebook"></i></a></li>
                                <li><a href="https://plus.google.com/discover" target="_blank"><i
                                    className="fa fa-google-plus"></i></a></li>
                                <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="https://www.instagram.com/" target="_blank"><i
                                    className="fa fa-instagram"></i></a></li>
                            </ul>
                            <button className="wishlist-btn" onClick={() => addToWishlistClicked(item)}><i
                                className="fa fa-heart"></i><span
                                className="title-font">Add To WishList</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    product_length: state.categories.fashionProducts.total,
    cartList: state.cartList,
    cartItems: state.cartList.cartInfo.products,
    symbol: state.data.symbol,
});

export default connect(mapStateToProps, null)(DetailsWithPrice);
