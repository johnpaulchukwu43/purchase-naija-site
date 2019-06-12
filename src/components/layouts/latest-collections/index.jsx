import React, { Component } from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux'

import LatestProductItem from './latest-product-item'
import PropTypes from "prop-types";
import {getProductsInSpecifiedCategory} from "../../../services";
import { addToWishlist, addToCompare} from '../../../actions'
import {addToCartWithoutSpecifyingQuantity} from "../../../actions/cartActions";


class LatestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {categoryName:props.categoryName};

    }
    render (){
        var settings = {
            infinite: true,
            dots: false,
            speed: 3000,
            slidesToShow: 5,
            slidesToScroll: 5,
            autoplay: false,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow:2,
                        slidesToScroll: 2
                    }
                }
            ]
        };

        const {symbol, addToCart, addToWishlist, addToCompare,categoryNameFriendly,categoryName,all_categories} = this.props;

        let {products} = getProductsInSpecifiedCategory(categoryName,all_categories);
        return (
            <div>
                {/*Paragraph*/}
                <div className="title1  section-t-space">

                    <h2 className="title-inner1">Featured {categoryNameFriendly} Products </h2>
                </div>
                {/*Paragraph End*/}
                <section className="section-b-space p-t-0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <Slider {...settings} className="product-4 product-m no-arrow">
                                    { products.map((product, index ) =>
                                        <div key={index}>
                                            <LatestProductItem categoryName={categoryName} product={product} symbol={symbol}
                                                               onAddToCompareClicked={addToCompare}
                                                               onAddToWishlistClicked={addToWishlist}
                                                               onAddToCartClicked={addToCart} key={index} />
                                        </div>)
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    symbol: state.data.symbol,
    all_categories:state.categories
});

LatestComponent.propTypes = {
    categoryName:PropTypes.string.isRequired,
    categoryNameFriendly:PropTypes.string.isRequired

};

export default connect(mapStateToProps, {addToCart:addToCartWithoutSpecifyingQuantity, addToWishlist, addToCompare}) (LatestComponent);
