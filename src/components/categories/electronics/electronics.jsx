import React, {Component} from 'react';
import '../../common/index.scss';

// import custom Components
import NewProduct from "../../common/new-product";
import Breadcrumb from "../../common/breadcrumb";
import FilterBar from "../common/filter-bar";
import {ELECTRONICS_PRODUCT} from "../../../constants/ActionTypes";
import StickyBox from "react-sticky-box";
import SortBar from "../common/sort-bar";
import ProductListing from "../common/product-listing";



class ElectronicsCategory extends Component {

    openFilter = () => {
        document.querySelector(".collection-filter").style = "left: -15px";
    }

    render() {
        return (
            <div>

                <Breadcrumb title={'Electronics Collection'}/>

                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3 collection-filter">

                                    <StickyBox offsetTop={20} offsetBottom={20}>
                                        <div>
                                            <FilterBar categoryName = {ELECTRONICS_PRODUCT}/>
                                            <div className="collection-sidebar-banner">
                                                <a href="#">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`}
                                                         className="img-fluid" alt=""/>
                                                </a>
                                            </div>
                                        </div>
                                    </StickyBox>
                                    {/*side-bar banner end here*/}
                                </div>
                                <div className="collection-content col">
                                    <div className="page-main-content ">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="top-banner-wrapper">
                                                        <a href="#"><img
                                                            src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/2.jpg`}
                                                            className="img-fluid" alt=""/></a>
                                                        <div className="top-banner-content small-section">
                                                            <h4>Electronics & Appliances</h4>
                                                            <h5>If you are on the look-out for quality brands in electronics from best local
                                                                manufacturers, Purchase Naija is your Go-To place for trusted products, ranging
                                                                from televisions to home appliances.</h5>
                                                        </div>
                                                    </div>
                                                    {/*<EmptyProductList/>*/}
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
                                                                        <SortBar categoryName = {ELECTRONICS_PRODUCT} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/*/!*Products Listing Component*!/*/}
                                                        <ProductListing categoryName = {ELECTRONICS_PRODUCT}/>

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
export default ElectronicsCategory
