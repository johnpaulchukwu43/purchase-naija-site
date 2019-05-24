import React, {Component} from 'react';
import Slider from 'react-slick';
import '../common/index.scss';
import {connect} from "react-redux";

// import custom Components
import Service from "./common/service";
import {addToCartWithoutSpecifyingQuantity} from '../../actions/cartActions'
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./categories/fashion-details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import {addToCartUnsafe, addToWishlist } from '../../actions'
import ImageZoom from './common/product/image-zoom'
import PropTypes from "prop-types";
import {getProductsInSpecifiedCategory} from "../../services";
import NewProduct from "../common/new-product";



class SingleProduct extends Component {

    constructor() {
        super();
        this.state = {
            open:false,
            nav1: null,
            nav2: null
        };
    }

    // document.getElementById('idOfElement').classList.add('newClassName');


    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    filterClick() {
        document.getElementById("filter").style.left = "-15px";
    }
    backClick() {
        document.getElementById("filter").style.left = "-365px";
    }

    switchPriceDetailsComponent = (productCategory,symbol,item,navOne,addToCart,addToCartUnsafe,addToWishlist)=>{
        return <DetailsWithPrice symbol={symbol} item={item} navOne={navOne} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} addToWishlistClicked={addToWishlist}/>
    };

    render(){
        const {symbol, all, addToCart, addToCartUnsafe, addToWishlist,categoryType,productId} = this.props;

        //Hacky Stuff, dont try this at home :(
        const products = getProductsInSpecifiedCategory(categoryType,all).products;
        var item = products.find(product => product._id === productId);

        var productsSetting = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            fade: true
        };
        var productsnav = {
            slidesToShow: 3,
            swipeToSlide:true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };
        return (
            <div>
                {item && <Breadcrumb  title={'Product / '+item.name} />}

                {/*Section Start*/}
                {(item)?
                    <section className="section-b-space">
                        <div className="collection-wrapper">
                            <div className="container">
                                <div className="row">

                                    <div className="col-sm-3 collection-filter" id="filter">
                                        <div  className="collection-mobile-back pl-5">
                                        <span onClick={this.backClick}  className="filter-back">
                                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                                        </span>
                                        </div>

                                        {/* <BrandBlock/> */}
                                        <Service/>
                                        {/*side-bar single product slider start*/}
                                        <NewProduct categoryName={categoryType}/>
                                        {/*side-bar single product slider end*/}
                                    </div>
                                    <div className="col-lg-9 col-sm-12 col-xs-12">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div className="filter-main-btn mb-2">
                                                    <span onClick={this.filterClick}  className="filter-btn" >
                                                        <i className="fa fa-filter" aria-hidden="true"></i> filter</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 product-thumbnail">
                                                    <Slider {...productsSetting} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-slick">
                                                        {item.imageUrls.map((vari, index) =>
                                                            <div key={index}>
                                                                <ImageZoom image={vari} />
                                                            </div>
                                                        )}
                                                    </Slider>
                                                    {/*<SmallImages item={item} settings={productsnav} navOne={this.state.nav1} />*/}
                                                </div>

                                                {this.switchPriceDetailsComponent(categoryType,symbol,item,this.state.nav1,addToCart,addToCartUnsafe,addToWishlist)}

                                            </div>
                                        </div>
                                            <DetailsTopTabs categoryName={categoryType} item={item} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : ''}
                {/*Section End*/}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let productId = ownProps.match.params.id;
    return {
        all: state.categories,
        productId : ownProps.match.params.id,
        symbol: state.data.symbol
    }
};

SingleProduct.propTypes = {
    categoryType:PropTypes.string.isRequired
};

export default connect(mapStateToProps, {addToCart:addToCartWithoutSpecifyingQuantity, addToCartUnsafe, addToWishlist}) (SingleProduct);
