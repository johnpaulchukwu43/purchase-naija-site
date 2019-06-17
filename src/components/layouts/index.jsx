import React from "react";
import {Link} from 'react-router-dom';
import Slider from 'react-slick';

import '../common/index.scss';
import LatestCollection from "./latest-collections/index";
import {
    BEAUTY_PRODUCT, ELECTRONICS_PRODUCT,
    FASHION_PRODUCT,
    RAW_MATERIALS_PRODUCT
} from "../../constants/ActionTypes";
import "react-responsive-carousel/lib/styles/carousel.css";
import {Carousel} from 'react-responsive-carousel';

const Content = () => {

    const sponsorImgStyle = {marginLeft: '0', marginRight:'0'};

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoPlay: true,
        autoplaySpeed: 500
    };

    const sponsorSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 7000,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            }
        ]

    };

    const listOfSponsors = [
        'logo-dangote.jpg',
        'logo-ivm.jpg',
        'logo-daviva.jpg',
        'logo-zaron.jpg',
        'logo-ezra-footwears.jpg',
        'logo-fmn.jpg',
        'logo-kene-rapu.jpg',
    ];
    return <div>

        <div className="flat-row">
            {/*<Carousel showArrows={true} infiniteLoop autoPlay>*/}
            {/*<div>*/}
            {/*<img src={`${process.env.PUBLIC_URL}/assets/images/home-banner/1.jpg`} />*/}
            {/*<p className="legend">Legend 1</p>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*<img src={`${process.env.PUBLIC_URL}/assets/images/home-banner/2.jpg`} />*/}
            {/*<p className="legend">Legend 2</p>*/}
            {/*</div>*/}
            {/*</Carousel>*/}
            <div className="container-fluid">
                <section className="p-0">
                    <Carousel showArrows={true} className="slide-1 home-slider"
                              autoPlay
                              interval={5000}
                              showThumbs={false}
                              showStatus={false}infiniteLoop>
                        <div className="home text-center img-fluid">
                            <picture>
                                <source
                                    data-srcset="https://res.cloudinary.com/jworks/image/upload/w_1200,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"
                                    media="(max-width: 1200px)"
                                    srcSet={"https://res.cloudinary.com/jworks/image/upload/w_1200,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"}/>
                                <source
                                    data-srcset="https://res.cloudinary.com/jworks/image/upload/w_800,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"
                                    media="(max-width: 800px)"
                                    srcSet={"https://res.cloudinary.com/jworks/image/upload/w_800,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"}/>
                                <source
                                    data-srcset="https://res.cloudinary.com/jworks/image/upload/w_600,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"
                                    media="(max-width: 600px)"
                                    srcSet={"https://res.cloudinary.com/jworks/image/upload/w_600,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"}/>
                                <source
                                    data-srcset="https://res.cloudinary.com/jworks/image/upload/w_400,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"
                                    media="(max-width: 400px)"
                                    srcSet={"https://res.cloudinary.com/jworks/image/upload/w_400,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"}/>
                                <source
                                    data-srcset="https://res.cloudinary.com/jworks/image/upload/w_300,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"
                                    media="(max-width: 300px)"
                                    srcSet={"https://res.cloudinary.com/jworks/image/upload/w_300,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"}/>

                                <img
                                    data-src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/J/W/118566_1541173916.jpg"
                                    alt="https://www-konga-com-res.cloudinary.com/media/catalog/product/J/W/118566_1541173916.jpg"
                                    src="https://res.cloudinary.com/jworks/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/a_0/v1560709925/purchasenaija/dev/1.jpg"/>
                            </picture>
                            {/*<div className="content">*/}
                                {/*<div className="container">*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col">*/}
                                            {/*<div className="slider-contain">*/}
                                                {/*<div>*/}
                                                    {/*<div>*/}
                                                        {/*<h4>welcome to fashion</h4>*/}
                                                        {/*<h1>men fashion</h1>*/}
                                                        {/*<Link to={`${process.env.PUBLIC_URL}/product/category/fashion`}*/}
                                                              {/*className="btn btn-outline"> shop now</Link>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="home text-center img-fluid">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-banner/2.jpg`}/>
                            {/*<div className="container">*/}
                            {/*<div className="row">*/}
                            {/*<div className="col">*/}
                            {/*<div className="slider-contain">*/}

                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </Carousel>
                </section>
            </div>
        </div>


        {/*Sponsors*/}
        <section className="container-fluid">
            <div className="row">
                <div className="col">
                    <Slider {...sponsorSettings} className="product-6 no-arrow">
                        {listOfSponsors.map((sponsor, index) =>
                            <div key={index}>
                                <div className="col-lg-12">
                                    <picture>
                                        <source

                                            data-srcset={`https://res.cloudinary.com/jworks/image/upload/w_100,f_auto,fl_lossy,dpr_auto,q_auto/v1560716848/purchasenaija/production/brand-logos/${sponsor}`}
                                            media="(min-width: 600px)"
                                            srcSet={`https://res.cloudinary.com/jworks/image/upload/w_100,f_auto,fl_lossy,dpr_auto,q_auto/v1560716848/purchasenaija/production/brand-logos/${sponsor}`}/>
                                        <source
                                            data-srcset={`https://res.cloudinary.com/jworks/image/upload/w_50,f_auto,fl_lossy,dpr_auto,q_auto/v1560716848/purchasenaija/production/brand-logos/${sponsor}`}
                                            media="(min-width:300px)"
                                            srcSet={`https://res.cloudinary.com/jworks/image/upload/w_50,f_auto,fl_lossy,dpr_auto,q_auto/v1560716848/purchasenaija/production/brand-logos/${sponsor}`}/>
                                        <source
                                            data-srcset={`https://res.cloudinary.com/jworks/image/upload/w_50,f_auto,fl_lossy,dpr_auto,q_auto/v1560716848/purchasenaija/production/brand-logos/${sponsor}`}
                                            media="(min-width: 300px)"
                                            srcSet={`https://res.cloudinary.com/jworks/image/upload/w_50,f_auto,fl_lossy,dpr_auto,q_auto/v1560716848/purchasenaija/production/brand-logos/${sponsor}`}/>
                                        <img
                                            src={`https://res.cloudinary.com/jworks/image/upload/w_150,f_auto,fl_lossy,dpr_auto,q_auto/v1560716848/purchasenaija/production/brand-logos/${sponsor}`}
                                            className="img-responsive"
                                            data-src={`https://res.cloudinary.com/jworks/image/upload/w_150,f_auto,fl_lossy,dpr_auto,q_auto/v1560716848/purchasenaija/production/brand-logos/${sponsor}`}
                                            style={sponsorImgStyle}
                                        />
                                    </picture>
                                </div>
                            </div>)
                        }
                    </Slider>
                </div>

            </div>
        </section>

        {/*sponsrs*/}

        {/*Categories*/}

        <section className="flat-row categories-view">
            <div className="container-fluid">
                <div className="title1  section-t-space">

                    <h2 className="title-inner1"> Product Categories</h2>
                </div>
                <div className="row gutter-10">
                    <div className="col-sm-6 col-md-4 product-category-wrapper">
                        <div className="flat-image-box style-1 data-effect div-h22 clearfix">
                            <div className="item data-effect-item">
                                <div className="inner">
                                    <div className="thumb h-large">
                                        <div id="carouselExampleSlidesOnly" className="carousel slide"
                                             data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active ">
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-gold.jpg`}
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-gold.jpg`}
                                                         alt="Second slide"/>
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-gold.jpg`}
                                                         alt="Third slide"/>
                                                </div>
                                            </div>
                                            <div>
                                                <Link to={`${process.env.PUBLIC_URL}/product/category/raw_materials`}>
                                                    <h4 className="product-category-text">RAW
                                                        MATERIALS</h4>
                                                </Link>
                                                <i className="fa fa-angle-down fa-2x"
                                                   style={{color: 'white', marginLeft: '80px', cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-4 product-category-wrapper">
                        <div className="flat-image-box style-1 row2 data-effect clearfix">
                            <div className="item data-effect-item">
                                <div className="inner">
                                    <div className="thumb h-small">
                                        <div id="carouselExampleSlidesOnly" className="carousel slide"
                                             data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-manufacturing.jpg`}
                                                         alt="Raw Materials"/>
                                                </div>
                                                <div className=" carousel-item" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-manufacturing.jpg`}
                                                         alt="Second slide"/>
                                                </div>
                                                <div className="carousel-item" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-manufacturing.jpg`}
                                                         alt="Third slide"/>
                                                </div>
                                            </div>
                                            <span className="manufacturing-text">
                                                <Link to={`${process.env.PUBLIC_URL}/product/category/manufacturing`}>
                                                    <h4>MANUFACTURING</h4>
                                                </Link>
                                                <i className="fa fa-angle-down fa-2x"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="item data-effect-item">
                                <div className="inner">
                                    <div className="thumb h-small">
                                        <div id="carouselExampleSlidesOnly" className="carousel slide"
                                             data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-products.jpg`}
                                                         alt="Raw Materials"/>
                                                </div>
                                                <div className=" carousel-item" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-products.jpg`}
                                                         alt="Second slide"/>
                                                </div>
                                                <div className="carousel-item" style={{height: "50%"}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-products.jpg`}
                                                         alt="Third slide"/>
                                                </div>
                                            </div>

                                        </div>
                                        <span className="fashion-text">
                                            <Link to={`${process.env.PUBLIC_URL}/product/category/fashion`}>
                                                <h4>FASHION & LIFESTYLE</h4>
                                            </Link>
                                            <i className="fa fa-angle-down fa-2x"></i>
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*col-md-4*/}
                    <div className="col-sm-12 col-md-4 product-category-wrapper">
                        <div className="flat-image-box style-1 data-effect div-h22 clearfix">
                            <div className="item data-effect-item">
                                <div className="inner">
                                    <div className="thumb h-large">
                                        <div id="carouselExampleSlidesOnly" className="carousel slide"
                                             data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active" style={{height: '60%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-services.jpg`}
                                                         alt="Raw Materials"/>
                                                </div>
                                                <div className=" carousel-item" style={{height: '60%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-services.jpg`}
                                                         alt="Second slide"/>
                                                </div>
                                                <div className="carousel-item" style={{height: '60%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-services.jpg`}
                                                         alt="Third slide"/>
                                                </div>
                                            </div>

                                        </div>


                                        <div>
                                            <Link to={`${process.env.PUBLIC_URL}/product/category/electronics`}>
                                                <h4 className="product-category-text">ELECTRONICS</h4>
                                            </Link>

                                            <i className="fa fa-angle-down fa-2x"
                                               style={{color: 'white', marginLeft: '40px', cursor: 'pointer'}}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*col-md-4*/}
                </div>
            </div>
        </section>
        {/*Categories*/}

        {/*Mobile-Categories-View*/}

        <section className="flat-row mobile-categories-view">
            <div className="container-fluid">
                <div className="title1  section-t-space">

                    <h2 className="title-inner1"> Product Categories</h2>
                </div>
                <div className="row gutter-10">
                    <div className="col-6 col-md-4 product-category-wrapper">
                        <div className="flat-image-box style-1 data-effect div-h22 clearfix">
                            <div className="item data-effect-item">
                                <div className="inner">
                                    <div className="thumb h-large">
                                        <div id="carouselExampleSlidesOnly" className="carousel slide"
                                             data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active ">
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-gold.jpg`}
                                                    />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-gold.jpg`}
                                                         alt="Second slide"/>
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-gold.jpg`}
                                                         alt="Third slide"/>
                                                </div>
                                            </div>
                                            <div>
                                                <Link to={`${process.env.PUBLIC_URL}/product/category/raw_materials`}>
                                                    <h4 className="product-category-text">RAW
                                                        MATERIALS</h4>
                                                </Link>
                                                <i className="fa fa-angle-down fa-2x"
                                                   style={{color: 'white', marginLeft: '80px', cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*col-md-4*/}
                    <div className="col-6 col-md-4 product-category-wrapper">
                        <div className="flat-image-box style-1 data-effect div-h22 clearfix">
                            <div className="item data-effect-item">
                                <div className="inner">
                                    <div className="thumb h-large">
                                        <div id="carouselExampleSlidesOnly" className="carousel slide"
                                             data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active" style={{height: '60%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-services.jpg`}
                                                         alt="Raw Materials"/>
                                                </div>
                                                <div className=" carousel-item" style={{height: '60%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-services.jpg`}
                                                         alt="Second slide"/>
                                                </div>
                                                <div className="carousel-item" style={{height: '60%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-services.jpg`}
                                                         alt="Third slide"/>
                                                </div>
                                            </div>

                                        </div>


                                        <div>
                                            <Link to={`${process.env.PUBLIC_URL}/product/category/electronics`}>
                                                <h4 className="product-category-text">ELECTRONICS</h4>
                                            </Link>

                                            <i className="fa fa-angle-down fa-2x"
                                               style={{color: 'white', marginLeft: '40px', cursor: 'pointer'}}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*col-md-4*/}

                    <div className="col-12 col-md-4 product-category-wrapper">
                        <div className="flat-image-box style-1 row2 data-effect clearfix">
                            <div className="item data-effect-item">
                                <div className="inner">
                                    <div className="thumb h-small">
                                        <div id="carouselExampleSlidesOnly" className="carousel slide"
                                             data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-manufacturing.jpg`}
                                                         alt="Raw Materials"/>
                                                </div>
                                                <div className=" carousel-item" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-manufacturing.jpg`}
                                                         alt="Second slide"/>
                                                </div>
                                                <div className="carousel-item" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-manufacturing.jpg`}
                                                         alt="Third slide"/>
                                                </div>
                                            </div>
                                            <span className="manufacturing-text">
                                                <Link to={`${process.env.PUBLIC_URL}/product/category/manufacturing`}>
                                                    <h4 className="product-category-text">MANUFACTURING</h4>
                                                </Link>
                                                <i className="fa fa-angle-down fa-2x"
                                                   style={{color: 'white', marginLeft: '80px', cursor: 'pointer'}}></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="item data-effect-item">
                                <div className="inner">
                                    <div className="thumb h-small">
                                        <div id="carouselExampleSlidesOnly" className="carousel slide"
                                             data-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-products.jpg`}
                                                         alt="Raw Materials"/>
                                                </div>
                                                <div className=" carousel-item" style={{height: '50%'}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-products.jpg`}
                                                         alt="Second slide"/>
                                                </div>
                                                <div className="carousel-item" style={{height: "50%"}}>
                                                    <img className="d-block w-100"
                                                         src={`${process.env.PUBLIC_URL}/assets/images/categories/hp-products.jpg`}
                                                         alt="Third slide"/>
                                                </div>
                                            </div>

                                        </div>
                                        <span className="fashion-text">
                                            <Link to={`${process.env.PUBLIC_URL}/product/category/fashion`}>
                                                <h4 className="product-category-text">FASHION &
                                                    LIFESTYLE</h4>
                                            </Link>
                                            <i className="fa fa-angle-down fa-2x"
                                               style={{color: 'white', marginLeft: '50px', cursor: 'pointer'}}></i>
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        {/*Mobile-Categories-View*/}


        {/*Latest Collection*/}
        <LatestCollection categoryName={FASHION_PRODUCT} categoryNameFriendly="Fashion"/>
        <LatestCollection categoryName={ELECTRONICS_PRODUCT} categoryNameFriendly="Electronics"/>
        <LatestCollection categoryName={BEAUTY_PRODUCT} categoryNameFriendly="Beauty"/>
        <LatestCollection categoryName={RAW_MATERIALS_PRODUCT} categoryNameFriendly="RAW MATERIALS"/>
        {/*Latest Collection End*/}


    </div>;
};

export default Content;
