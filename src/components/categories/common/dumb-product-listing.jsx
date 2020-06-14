import React, {Component} from 'react';
import {connect} from 'react-redux'
import { addToWishlist, addToCompare} from '../../../actions'
import ProductListItem from "./product-item";
import {addToCartWithoutSpecifyingQuantity} from "../../../actions/cartActions";
import {determineCategoryOfProductFromApiResult} from "../../../services";



class DumbProductListing extends Component {

    constructor(props) {
        super(props);
        this.state = {limit: 10, hasMoreItems: true, page_num: 1, page_size: 8};

    }

    getCategoryName = (product)=>{
        return determineCategoryOfProductFromApiResult(product._source.productCategory);
    };

    normalizeData = (product)=>{
        //add id to product
        console.log(JSON.stringify({...product._source, _id:product._id}));
        return {...product._source, _id:product._id}
    };
    render() {
        const centerStuff =
         {
          display:'inline-block',
             textAlign:"center",
         };
        let content ;

        let {
            addToCart,
            symbol,
            addToWishlist,
            addToCompare,
            products,
            errorMessage
        } = this.props;

        if(errorMessage){
            content= <div className="row">
                <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg` } alt="Product"
                         className="img-fluid mb-4"/>
                    <h3>Sorry! Couldn't Fetch Products!!! </h3>
                    <p>{errorMessage.friendly}</p>
                    <button className="btn btn-solid">Try Again</button>
                </div>
            </div>
        }
        else if(products.length>0){

            content= <div>
                <div className="row">
                    {products.slice(0, this.state.limit).map((product, index) =>
                        <ProductListItem categoryName={this.getCategoryName(product)} product={this.normalizeData(product)} symbol={symbol}
                                         onAddToCompareClicked={addToCompare}
                                         onAddToWishlistClicked={addToWishlist}
                                         onAddToCartClicked={addToCart} key={index}/>)
                    }
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
                <div className="product-wrapper-grid">
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
    symbol: state.data.symbol
});

export default connect(mapStateToProps,{addToCart:addToCartWithoutSpecifyingQuantity, addToWishlist, addToCompare})(DumbProductListing)
