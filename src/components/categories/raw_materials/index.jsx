import React, {Component} from 'react';
import '../../common/index.scss';

// import custom Components
import Breadcrumb from "../../common/breadcrumb";
import { getProductsByCategory } from '../../../actions/productActions'
import PropTypes from "prop-types";
import ProductListing from "../common/product-listing";
import {RAW_MATERIALS_PRODUCT} from "../../../constants/ActionTypes";
import {connect} from "react-redux";
import SortBar from "../common/sort-bar";


class RawMaterialsCategory extends Component {
    render(){
        return (
            <div>
                <Breadcrumb title={'Raw Materials Corner'} />

                {/*Section Start*/}
                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="collection-content col">
                                    <div className="page-main-content">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="top-banner-wrapper">
                                                        <div className="top-banner-content small-section">
                                                            <h2>Raw Materials </h2>
                                                            <h5>Get good quality Raw Materials in bulk quantities for your all
                                                                different needs</h5>
                                                        </div>
                                                    </div>
                                                    <div className="collection-product-wrapper">
                                                        <div className="product-top-filter">
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <SortBar categoryName = {RAW_MATERIALS_PRODUCT} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="product-wrapper-grid">
                                                            <div className="container-fluid">
                                                                <div className="row">
                                                                    <ProductListing  categoryName = {RAW_MATERIALS_PRODUCT}/>
                                                                </div>
                                                            </div>
                                                        </div>
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
                {/*Section End*/}

            </div>
        )
    }
}
RawMaterialsCategory.propTypes = {
    getProductCategory: PropTypes.func.isRequired
}

export default connect(null,{getProductCategory: getProductsByCategory})(RawMaterialsCategory);
