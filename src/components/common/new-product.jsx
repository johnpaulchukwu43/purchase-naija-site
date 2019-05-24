import React, {Component} from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import {determineRouteForSingleProductView,getProductsInSpecifiedCategory} from "../../services";
import PropTypes from "prop-types";


class NewProduct extends Component {

    constructor(props){
        super(props);

        this.state = {
            categoryName:props.categoryName,
            routeForSingleProductView:'',
            page_num: 1,
            page_size: 10,
        }
    }
    componentWillMount(){
        // this.fetchProducts();

        this.setState({
            routeForSingleProductView:determineRouteForSingleProductView(this.state.categoryName)
        });
    }
    render (){

        const {all_categories,symbol} = this.props;
        const{routeForSingleProductView,categoryName} = this.state;

        //hacky stuff, trying to make product-listing generic, to show product list for different categories
        let products = getProductsInSpecifiedCategory(categoryName,all_categories).products;

        var arrays = [];
        while (products.length > 0) {
            arrays.push(products.splice(0, 5));
        }

        return (
            <div className="theme-card">
                <h5 className="title-border">new product</h5>
                <Slider className="offer-slider slide-1">
                    {arrays.map((products, index) =>
                        <div key={index}>
                            {products.map((product, i) =>
                                <div className="media" key={i}>
                                    <Link to={`${routeForSingleProductView}/${product._id}`} ><img
                                        src={`${this.state.image?this.state.image:product.imageUrls[0]}`}
                                        className="img-fluid"
                                        alt="" /></Link>
                                    <div className="media-body align-self-center">
                                        {/*<div className="rating">*/}
                                            {/*<i className="fa fa-star"></i>*/}
                                            {/*<i className="fa fa-star"></i>*/}
                                            {/*<i className="fa fa-star"></i>*/}
                                            {/*<i className="fa fa-star"></i>*/}
                                            {/*<i className="fa fa-star"></i>*/}
                                        {/*</div>*/}
                                        <Link to={`${routeForSingleProductView}/${product._id}`}><h6>{product.name}</h6></Link>
                                        <h4>{symbol}{product.price}
                                            <del><span className="money">{symbol}{product.price}</span></del></h4>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Slider>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        symbol: state.data.symbol,
        all_categories:state.categories
    }
}


NewProduct.propTypes = {
    categoryName:PropTypes.string.isRequired
};

export default connect(mapStateToProps,null)(NewProduct);
