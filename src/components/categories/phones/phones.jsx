import React, {Component} from 'react';
import Slider from 'react-slick';
import '../../common/index.scss';
import {connect} from "react-redux";

// import custom Components
import NewProduct from "../../common/new-product";
import Breadcrumb from "../../common/breadcrumb";
import StickyBox from "react-sticky-box";
import FilterBar from "./filter-bar";
import ProductListing from "./product-listing";
import EmptyProductList from "../../common/empty-products-list";



class PhonesCategory extends Component {

    openFilter = () => {
        document.querySelector(".collection-filter").style = "left: -15px";
    }

    render() {
        return (
            <div>

                <Breadcrumb title={'Phone Collection'}/>

                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3 collection-filter">

                                    {/*<StickyBox offsetTop={20} offsetBottom={20}>*/}
                                        {/*<div>*/}
                                            {/*<Filter/>*/}
                                            {/*<div className="collection-sidebar-banner">*/}
                                                {/*<a href="#">*/}
                                                    {/*<img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`}*/}
                                                         {/*className="img-fluid" alt=""/>*/}
                                                {/*</a>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</StickyBox>*/}
                                    {/*side-bar banner end here*/}
                                </div>
                                <div className="collection-content col">
                                    <div className="page-main-content ">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="top-banner-wrapper">
                                                        {/*<a href="#"><img*/}
                                                            {/*src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/2.jpg`}*/}
                                                            {/*className="img-fluid" alt=""/></a>*/}
                                                        <div className="top-banner-content small-section">
                                                            <h4>Phones & Tablets</h4>
                                                            <h5>Shop the latest electronics and gadgets from our list of trusted local suppliers. Be the
                                                                first to own the coolest tech gadgets that will go the distance.</h5>
                                                        </div>
                                                    </div>
                                                    <EmptyProductList/>
                                                    {/*<div className="collection-product-wrapper">*/}
                                                        {/*<div className="product-top-filter">*/}
                                                            {/*<div className="container-fluid p-0">*/}
                                                                {/*<div className="row">*/}
                                                                    {/*<div className="col-xl-12">*/}
                                                                        {/*<div className="filter-main-btn">*/}
                                                                            {/*<span onClick={this.openFilter}*/}
                                                                                  {/*className="filter-btn btn btn-theme"><i*/}
                                                                                {/*className="fa fa-filter"*/}
                                                                                {/*aria-hidden="true"></i> Filter</span>*/}
                                                                        {/*</div>*/}
                                                                    {/*</div>*/}
                                                                {/*</div>*/}
                                                                {/*<div className="row">*/}
                                                                    {/*<div className="col-12">*/}
                                                                        {/*<FilterBar/>*/}
                                                                    {/*</div>*/}
                                                                {/*</div>*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}

                                                        {/*<ProductListing/>*/}

                                                    {/*</div>*/}
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
export default PhonesCategory
