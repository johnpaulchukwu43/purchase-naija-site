import React, {Component} from 'react';
import {Link} from "react-router-dom";


class orderSuccess extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        const {payment, items, symbol, orderTotal, orderInfo} = this.props.location.state;
        var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        var current = new Date();
        var next5days = new Date(Date.now() + 2 * 86400000);
        let CheckDate = current.toLocaleDateString("en-US", options).toString()
        let deliveryDate = next5days.toLocaleDateString("en-US", options).toString()

        return (
            (payment) ?
                <div>
                    <section className="section-b-space light-layout">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="success-text">
                                        <i className="fa fa-check-circle" aria-hidden="true"></i>
                                        <h2>Thank you,</h2>
                                        <p> Order has been Placed Successfully.</p>
                                        <p>Transaction Code: {orderInfo.orderCode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section-b-space">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="product-order">
                                        <h3>your order details</h3>
                                        {items.map((item, index) => {
                                            return <div className="row product-order-detail" key={index}>
                                                <div className="col-3">
                                                    <img src={`${item.productInfo.imageUrls[0]}`} alt=""
                                                         className="img-fluid"/>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>product name</h4>
                                                        <h5>{item.productInfo.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>quantity</h4>
                                                        <h5>{item.quantity}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-3 order_detail">
                                                    <div>
                                                        <h4>price</h4>
                                                        <h5>{symbol}{item.quantity * item.productInfo.price}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                        <div className="total-sec">
                                            <ul>
                                                <li>subtotal <span>{symbol}{orderTotal}</span></li>
                                                <li>Delivery <span>{symbol}0</span></li>
                                                <li>tax<span>{symbol}0</span></li>
                                            </ul>
                                        </div>
                                        <div className="final-total">
                                            <h3>total <span>{symbol}{orderTotal}</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row order-success-sec">
                                        <div className="col-sm-6">
                                            <h4>Summary</h4>
                                            <ul className="order-detail">
                                                <li>Ordered By: {orderInfo.name}</li>

                                                {(payment.paymentID)&&

                                                    <li>payment ID: {payment.paymentID}</li>
                                                }
                                                <li>Order Date: {CheckDate}</li>
                                                <li>Order Total: {symbol}{orderTotal}</li>
                                            </ul>
                                        </div>
                                        <div className="col-sm-6">
                                            <h4>Delivery Address</h4>
                                            <ul className="order-detail">
                                                <li>{payment.billingAddress1}</li>
                                            </ul>
                                        </div>

                                        <div className="col-sm-12 payment-mode">
                                            <h4>Payment Method</h4>
                                            <p>{payment.paymentType}</p>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="delivery-sec">
                                                <h3>Expected date of delivery</h3>
                                                <h2>{deliveryDate}</h2>
                                            </div>

                                        </div>
                                        <div className="col-md-12  mt-5">
                                            <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid float-right"> Continue Shopping</Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
                :
                <section className="p-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="error-section">
                                    <h1>404</h1>
                                    <h2>page not found</h2>
                                    <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid"> Shop now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}

export default orderSuccess
