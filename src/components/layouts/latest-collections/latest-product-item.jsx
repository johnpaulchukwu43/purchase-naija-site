import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {determineRouteForSingleProductView} from "../../../services";


class LatestProductItem extends Component {

    constructor(props){
        super(props)

        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: '',
            categoryName:props.categoryName,
            routeForSingleProductView:''
        }
    }

    componentWillMount(){
        this.setState({
            routeForSingleProductView:determineRouteForSingleProductView(this.state.categoryName)
        });
    }


    onClickHandle(img) {
        this.setState({ image : img} );
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    minusQty = () => {
        if(this.state.quantity > 1) {
            this.setState({stock: 'InStock'})
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    plusQty = () => {
        if(this.props.product.stock >= this.state.quantity) {
            this.setState({quantity: this.state.quantity+1})
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render() {
        const {product, symbol,cartInfo, onAddToCartClicked, onAddToWishlistClicked, onAddToCompareClicked} = this.props;
        const {open,routeForSingleProductView} = this.state;
        let RatingStars = [];
        for(var i = 0; i < 5; i++) {
            RatingStars.push(<i className="fa fa-star" key={i}></i>)
        }
        return (
                <div className="product-box">
                    <div className="img-wrapper">
                        <div className="lable-block">
                            <span className="lable3">new</span>
                        </div>
                        <div className="front">
                            <Link to={`${routeForSingleProductView}/${product._id}`} ><img
                                src={`${this.state.image?this.state.image:product.imageUrls[0]}`}
                                className="img-fluid"
                                alt="" /></Link>
                        </div>
                        <div className="cart-info cart-wrap">
                            <button title="Add to cart" onClick={() => onAddToCartClicked(cartInfo,product, 1)}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </button>
                            <a href="javascript:void(0)" title="Add to Wishlist" onClick={()=>onAddToWishlistClicked(product,routeForSingleProductView)} >
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <a href="#" data-toggle="modal"
                               data-target="#quick-view"
                               title="Quick View"
                               onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                            <Link to={`${process.env.PUBLIC_URL}/compare`} title="Compare" onClick={()=>onAddToCompareClicked(product,routeForSingleProductView)}>
                                <i className="fa fa-refresh" aria-hidden="true"></i></Link>
                        </div>
                        {/*todo color variant */}
                        {/*<ul className="product-thumb-list">*/}
                            {/*{product.variants.map((vari, i) =>*/}
                                {/*<li className={`grid_thumb_img ${(vari.images === this.state.image)?'active':''}`} key={i}>*/}
                                    {/*<a href="javascript:void(0)" title="Add to Wishlist">*/}
                                        {/*<img src={`${vari.images}`} onClick={() => this.onClickHandle(vari.images)} />*/}
                                    {/*</a>*/}
                                {/*</li>)*/}
                            {/*}*/}
                        {/*</ul>*/}

                    </div>
                    <div className="product-detail">
                        <div>
                            {/*todo ratings component*/}
                            {/*<div className="rating">*/}
                            {/*{RatingStars}*/}
                            {/*</div>*/}
                            <Link to={`${routeForSingleProductView}/${product.id}`}>
                                <h6>{product.name}</h6>
                            </Link>
                            <p>{product.shortDetails}</p>
                            {/*todo add discount feature*/}
                            {/*<h4>{symbol}{(product.price*product.discount/100)}*/}
                            {/*<del><span className="money">{symbol}{product.price}</span></del></h4>*/}
                            <h4>{symbol}{(product.price)}</h4>
                            {/* todo Add color variant feature */}
                            {/*<ul className="color-variant">*/}
                            {/*{product.variants.map((vari, i) => {*/}
                            {/*return (*/}
                            {/*<li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)*/}
                            {/*})}*/}
                            {/*</ul>*/}
                            <ul className="color-variant">
                                {product.colors &&
                                product.colors.map((color,i) => {
                                    return (
                                        <li className={color} key={i} title={color}></li>)
                                })
                                }
                            </ul>
                        </div>
                    </div>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-6  col-xs-12">
                                            <div className="quick-view-img">
                                                <img src={`${this.state.image?this.state.image:product.imageUrls[0]}`} alt="" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 rtl-text">
                                            <div className="product-right">
                                                <h2> {product.name} </h2>
                                                {/*todo discount feature */}
                                                {/*<h3>{symbol}{(product.price*product.discount/100)}*/}
                                                <h3>{symbol}{(product.price)}
                                                    <del><span className="money">{symbol}{product.price}</span></del>
                                                </h3>
                                                {/*color variant*/}
                                                {/*<ul className="color-variant">*/}
                                                {/*{product.variants.map((vari, i) =>*/}
                                                {/*<li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)*/}
                                                {/*}*/}
                                                {/*</ul>*/}
                                                <ul className="color-variant">
                                                    {product.colors.map((color,i) => {
                                                        return (
                                                            <li className={color} key={i} title={color}></li>)
                                                    })}
                                                </ul>
                                                <div className="border-product">
                                                    <h6 className="product-title">product details</h6>
                                                    <p>{product.description}</p>
                                                </div>
                                                <div className="product-description border-product">
                                                    <div className="size-box">
                                                        <ul>

                                                            {/*{product.size.map((size, i) => {*/}
                                                            {/*return <li key={i}><a href="#">{size}</a></li>*/}
                                                            {/*})}*/}
                                                            <li><a href="#">{product.size}</a></li>

                                                        </ul>
                                                    </div>
                                                    <h6 className="product-title">quantity</h6>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                              <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                                 <i className="fa fa-angle-left"></i>
                                                                </button>
                                                              </span>
                                                            <input type="text" name="quantity" value={this.state.quantity}  onChange={this.changeQty} className="form-control input-number" />
                                                            <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                                <i className="fa fa-angle-right"></i>
                                                                </button>
                                                               </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-buttons">
                                                    <button  className="btn btn-solid" onClick={() => onAddToCartClicked(product, this.state.quantity)} >add to cart</button>
                                                    <Link to={`${routeForSingleProductView}/${product.id}`} className="btn btn-solid">view detail</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cartInfo: state.cartList,
});

LatestProductItem.propTypes = {
    categoryName:PropTypes.string.isRequired,
    symbol:PropTypes.string.isRequired,
    product:PropTypes.object.isRequired,
    onAddToCompareClicked:PropTypes.func.isRequired,
    onAddToWishlistClicked:PropTypes.func.isRequired,
    onAddToCartClicked:PropTypes.func.isRequired,
};

export default connect(mapStateToProps,null)(LatestProductItem);

