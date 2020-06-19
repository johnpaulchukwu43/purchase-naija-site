import React, {Component} from 'react';
import {connect} from 'react-redux'
import { addToWishlist, addToCompare} from '../../../actions'
import {addToCartWithoutSpecifyingQuantity} from '../../../actions/cartActions'
import {
    getAvailableBrandsForProductsByCategory,
    getAvailableColorsForProductsByCategory,
    getProductsByCategory
} from '../../../actions/productActions'
import ProductListItem from "./product-item";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import {
    getProductCategoryInfo,
    getProductsInSpecifiedCategory
} from "../../../services";
import {API_SERVER_UNREACHABLE, NO_PRODUCTS_FOUND} from "../../../constants/ActionTypes";


class ProductListing extends Component {

    constructor(props) {
        super(props);
        this.state = {limit: 8,
            hasMoreItems: true,
            page_num: 1,
            page_size: 8,
            categoryName:props.categoryName,
            isMobileView : window.innerWidth <= 577,
        };

    }

    componentDidMount(){
        this.fetchProducts();
        let {all_categories, categoryName} = this.props;
        let productCategoryInfo = getProductCategoryInfo(categoryName,all_categories);
        if(productCategoryInfo !== null){
            this.fetchAvailableColorsForProductsByCategory(productCategoryInfo);
            this.fetchAvailableBrandsForProductsByCategory(productCategoryInfo);
        }
    }

    fetchProducts = () => {
        this.props.getProductsByCategory(this.state.categoryName,this.state.page_num, this.state.page_size);
    };

    fetchAvailableColorsForProductsByCategory = (productCategoryInfo) =>{
        let {categoryName} = this.props;
        //check if the available colors for product category have been fetched already, if it hasn't send dispatch to do fetching.
        let colors = productCategoryInfo.available_colors.data;
        let error_message = productCategoryInfo.available_colors.error_message;
        if(colors.length === 0 && error_message === null){
            this.props.getAvailableColorsForProductsByCategory(categoryName);
        }
    };

    fetchAvailableBrandsForProductsByCategory = (productCategoryInfo) =>{
        let {categoryName} = this.props;
        //check if the available brands for product category have been fetched already, if it hasn't send dispatch to do fetching.
        let brands = productCategoryInfo.available_brands.data;
        let error_message = productCategoryInfo.available_brands.error_message;
        if(brands.length === 0 && error_message === null){
            this.props.getAvailableBrandsForProductsByCategory(categoryName);
        }
    };

    handlePageChange = (pageNum) => {
        this.props.getProductsByCategory(this.state.categoryName,pageNum, this.state.page_size);
    };

    render() {
        const centerStuff =
            {
                display:'inline-block',
                textAlign:"center",
            };

        let {
            addToCart,
            symbol,
            addToWishlist,
            addToCompare,
            all_categories,
            categoryName
        } = this.props;

        //hacky stuff, trying to make product-listing generic, to show product list for different categories
        let {products,extractedInfo,product_length} = getProductsInSpecifiedCategory(categoryName,all_categories);
        let {
            error_message,
            page_size,
            current_page
        } = extractedInfo;
        let content;
        /*
            posssible failures
            1) 5**,4**, status codes from server , typically would have erro messages
            2) Empty data list fetched initially from server:meaning no products yet
            3)Empty data list after searching /filtering
         */
        if(error_message){
            content= <div className="row">
                <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`}
                         alt="emptysearch"
                         className="img-fluid mb-4"/>
                    <h3>Sorry! Couldn't Fetch {categoryName}!!! </h3>
                    <p>{error_message.error}</p>
                    <button className="btn btn-solid" onClick={this.fetchProducts}>Try Again</button>
                </div>
            </div>
        }
        else if(product_length <= 0){
            content= <div className="row">
                <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`}
                         alt="emptysearch"
                         className="img-fluid mb-4"/>
                    <h3>Sorry! Couldn't Fetch {categoryName}!!! </h3>
                    <p>{NO_PRODUCTS_FOUND}</p>
                    <button className="btn btn-solid" onClick={this.fetchProducts}>Try Again</button>
                </div>
            </div>
        }
        else if(product_length>0){

            content= <div>
                <div className="row">
                    {products.slice(0, this.state.limit).map((product, index) =>
                        <ProductListItem categoryName={this.state.categoryName} product={product} symbol={symbol}
                                         onAddToCompareClicked={addToCompare}
                                         onAddToWishlistClicked={addToWishlist}
                                         onAddToCartClicked={addToCart} key={index}/>)
                    }
                </div>
                <div className="row">
                    <Pagination
                        activePage={current_page}
                        itemsCountPerPage={page_size}
                        totalItemsCount={product_length}
                        pageRangeDisplayed={10}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        }else{
            content =
                <div className={centerStuff}>
                    <div className="alert custom-alert-warning" role="alert">
                        <i className="fa fa-5x fa-database"></i>
                    </div>
                    <h3>No Products Match Search Result! </h3>
                    <p>Try Searching again with different parameters</p>
                </div>
        }

        return (
            <div>
                <div className={"product-wrapper-grid "+ (this.state.isMobileView ? "list-view":"")}>
                    <div className="container-fluid">
                        <div className="paginated-component">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    symbol: state.data.symbol,
    all_categories:state.categories
});


ProductListing.propTypes = {
    getProductsByCategory: PropTypes.func.isRequired,
    getAvailableColorsForProductsByCategory: PropTypes.func.isRequired,
    getAvailableBrandsForProductsByCategory: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    {addToCart:addToCartWithoutSpecifyingQuantity,
        addToWishlist,
        addToCompare,
        getProductsByCategory,
        getAvailableColorsForProductsByCategory,
        getAvailableBrandsForProductsByCategory
    }
)(ProductListing)
