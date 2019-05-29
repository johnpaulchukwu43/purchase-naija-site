/*
 Created by Johnpaul Chukwu @ $
*/
import React, {Component} from 'react';
import {FASHION_PRODUCT} from "../../../constants/ActionTypes";
import SortBar from "../../categories/common/sort-bar";
import DumbProductListing from "../../categories/common/dumb-product-listing";
import Breadcrumb from "../../common/breadcrumb";
import PropTypes from "prop-types";


class SearchResult extends Component{


    constructor(props) {
        super(props);
    }

    render(){

        let {searchInfo,searchTerm} = this.props;
        let {products, fetchSearchResultError} = searchInfo;
        return(
            <div>
                <Breadcrumb title={`Search Results - ${searchTerm}`}/>


                {/*Search section*/}
                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="collection-content col">
                                    <div className="page-main-content ">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="collection-product-wrapper">
                                                        <div className="product-top-filter">
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className="col-xl-12">
                                                                        <div className="filter-main-btn">
                                                                            <span onClick={this.openFilter}
                                                                                  className="filter-btn btn btn-theme"><i
                                                                                className="fa fa-filter"
                                                                                aria-hidden="true"></i> Filter</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <SortBar categoryName = {FASHION_PRODUCT} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/*Products Listing Component*/}
                                                        <DumbProductListing products = {products} errorMessage ={fetchSearchResultError} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}




SearchResult.propTypes = {
    searchTerm: PropTypes.string.isRequired
};

export default SearchResult;
