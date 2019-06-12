import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Breadcrumb from "../common/breadcrumb";
import {removeFromWishlist} from '../../actions'
import {getCartTotal} from "../../services";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {checkOutCart, externalRefreshCart} from "../../actions/cartActions";
import {updateUserInfo} from "../../actions/authActions";
import {CHECKOUT_SUCCESS, E_PAYMENT, PAY_ON_DELIVERY} from "../../constants/ActionTypes";
import axios from "axios";
import {verifyTransactionStatus} from "../../constants/endpoints";

class checkOut extends Component {

    constructor(props) {
        super(props);

        const {userInfo, total, cartItems} = this.props;


        this.state = {
            paymentType: PAY_ON_DELIVERY,
            userId: userInfo.id,
            name: userInfo.firstname + ' ' + userInfo.lastname,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            phoneNumber: userInfo.phoneNumber,
            email: userInfo.email,
            billingAddress1: userInfo.billingAddress1,
            billingAddress2: userInfo.billingAddress2,
            paymentID: '',
            userCart: cartItems,
            total: total,
            isLoading: false
        };
        this.validator = new SimpleReactValidator();
    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    };

    componentDidMount() {
        this.loadScript((message) => {
            console.log(message);
        });
    }

    setStateFromCheckbox = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.checked;
        this.setState(obj);

        if (!this.validator.fieldValid(event.target.name)) {
            this.validator.showMessages();
        }
    }

    checkhandle(value) {
        this.setState({
            paymentType: value
        })
    }


    // TPA Integration
    onSuccess = (payment, order) => {
        const {symbol, total, cartItems} = this.props;
        this.props.history.push({
            pathname: '/order-success',
            state: {payment: payment, items: cartItems, orderTotal: total, symbol: symbol, orderInfo: order}
        })

    };

    //load external paystack script
    loadScript = (callback) => {
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        document.getElementsByTagName("head")[0].appendChild(script);
        if (script.readyState) {
            // IE
            script.onreadystatechange = () => {
                if (
                    script.readyState === "loaded" ||
                    script.readyState === "complete"
                ) {
                    script.onreadystatechange = null;
                    callback("loaded script");
                }
            };
        } else {
            // Others
            script.onload = () => {
                callback("failed to load");
            };
        }
    };


    payAsPayStack = (cb = () => {}) => {
        var handler = window.PaystackPop.setup({
            email: this.state.email,
            amount: this.state.total * 100,
            key: process.env.PAYSTACK_KEY,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            // label: "Optional string that replaces customer email"
            onClose: function () {
                const msg = 'The payment was cancelled!';
                cb({paymentSuccess: false});
                alert(msg);
            },
            callback: function (response) {
                const ref = response.reference;
                var message = 'Payment Initiated! Reference: ' + ref;
                axios.get(verifyTransactionStatus(response.reference)).then(result => {
                    if (result.data.data.status === 'success') {
                        message = 'Payment completed Successfully! Reference: ' + ref;
                        toast.info(message);
                        cb({paymentSuccess: true, ref: ref});
                    } else {
                        message = 'Payment is still being Processed, Check Dashboard for progress ';
                        toast.info(message);
                        cb({paymentSuccess: false});

                    }
                }).catch(err => {
                    var message = err.message;
                    toast.info(message);
                    cb({paymentSuccess: true});
                })
            }
        });

        handler.openIframe();
    };

    checkOutCartAction = (paymentId) => {
        if (paymentId) {
            this.setState({
                paymentID: paymentId
            });
        }
        const userId = this.state.userId;
        this.props.checkOutCart(userId, this.state).then(result => {
            this.showLoadBar(false);
            const orderDetails = result.orderInfo;
            this.props.externalRefreshCart(userId, CHECKOUT_SUCCESS, "customer");
            this.onSuccess(this.state, orderDetails);
        }).catch(err => {
            this.showLoadBar(false);
            toast.error("Could not Checkout Product, Try Again" + err.message);
        })
    };

    payOnDelivery = () => {
        this.checkOutCartAction();
    };

    updateUserInfo = (userId, data) => {
        return new Promise((resolve, reject) => {
            this.props.updateUserInfo(data => {
                if (data.success === false) {
                    reject("Could not Update User Info, Before Checkout");
                } else {
                    resolve(true);
                }
            }, userId, data);
        });
    };

    isValidInputs = () => {
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
            return false;
        }
        return true;
    };

    showLoadBar = (boolVal)=>{
        this.setState({
            isLoading:boolVal
        })
    };

    makePayment = () => {
        //check for validation errors
        if (this.isValidInputs()) {
            //ensure that cart is not empty
            if(this.props.cartItems.length !== 0){
                this.showLoadBar(true);
                const userId = this.state.userId;
                this.updateUserInfo(userId, this.state).then(valid => {
                    if (this.state.paymentType === E_PAYMENT) {
                        this.payAsPayStack(result => {
                            this.showLoadBar(false);
                            if (result.paymentSuccess) {
                                this.checkOutCartAction(result.ref);
                            }
                        });
                    }
                    else {
                        this.payOnDelivery();
                    }

                }).catch(err => {
                    toast.error("Could not update user info before checkout. Pls try again");
                })
            }else{
                toast.info("No Products in cart. Go Shopping");
            }

        } else {
            toast.error("Enter valid inputs for required fields");
        }
    };


    render() {
        const {cartItems, symbol, total} = this.props;

        return (
            <div>
                <Breadcrumb title={'Checkout'}/>

                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form">
                                <form>
                                    <div className="checkout row">
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-title">
                                                <h3>Billing Details</h3>
                                            </div>

                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">First Name</div>
                                                    <input type="text" name="firstname" value={this.state.firstname}
                                                           onChange={this.setStateFromInput}/>
                                                    {this.validator.message('first_name', this.state.firstname, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Last Name</div>
                                                    <input type="text" name="lastname" value={this.state.lastname}
                                                           onChange={this.setStateFromInput}/>
                                                    {this.validator.message('last_name', this.state.lastname, 'required|alpha')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Phone</div>
                                                    <input type="text" name="phoneNumber" value={this.state.phoneNumber}
                                                           onChange={this.setStateFromInput}/>
                                                    {this.validator.message('phoneNumber', this.state.phoneNumber, 'required')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Email Address</div>
                                                    <input type="text" name="email" value={this.state.email}
                                                           onChange={this.setStateFromInput}/>
                                                    {this.validator.message('email', this.state.email, 'required|email')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label"> Billing Address</div>
                                                    <input type="text" name="billingAddress1"
                                                           value={this.state.billingAddress1}
                                                           onChange={this.setStateFromInput}
                                                           placeholder="Street address"/>
                                                    {this.validator.message('address', this.state.billingAddress1, 'required|min:20|max:120')}
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label"> Billing Address 2</div>
                                                    <input type="text" name="billingAddress2"
                                                           value={this.state.billingAddress2}
                                                           onChange={this.setStateFromInput}
                                                           placeholder="Street address"/>
                                                    {this.validator.message('address 2', this.state.billingAddress2, 'required|min:20|max:120')}
                                                </div>
                                                {/*<div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">*/}
                                                {/*<input type="checkbox" name="create_account" id="account-option"*/}
                                                {/*checked={this.state.create_account}*/}
                                                {/*onChange={this.setStateFromCheckbox}/>*/}
                                                {/*/!*&ensp; <label htmlFor="account-option">Create An Account?</label>*!/*/}
                                                {/*/!*{this.validator.message('checkbox', this.state.create_account, 'create_account')}*!/*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-details">
                                                <div className="order-box">
                                                    <div className="title-box">
                                                        <div>Product <span> Total</span></div>
                                                    </div>
                                                    <ul className="qty">
                                                        {cartItems.map((item, index) => {
                                                            return <li
                                                                key={index}>{item.productInfo.name} × {item.quantity}
                                                                <span>{symbol} {item.productInfo.price * item.quantity} </span>
                                                            </li>
                                                        })
                                                        }
                                                    </ul>
                                                    <ul className="sub-total">
                                                        <li>Subtotal <span className="count">{symbol}{total}</span></li>
                                                        <li>Delivery Chareges

                                                            <span className="count">{symbol} 0</span>
                                                            {/*<div className="shopping-option">*/}
                                                            {/*<input type="checkbox" name="local-pickup"*/}
                                                            {/*id="local-pickup"/>*/}
                                                            {/*<label htmlFor="local-pickup">Local Pickup</label>*/}
                                                            {/*</div>*/}
                                                        </li>
                                                    </ul>

                                                    <ul className="total">
                                                        <li>Total <span className="count">{symbol}{total}</span></li>
                                                    </ul>
                                                </div>

                                                <div className="payment-box">
                                                    <div className="upper-box">
                                                        <div className="payment-options">
                                                            <ul>
                                                                <li>
                                                                    <div className="radio-option stripe">
                                                                        <input type="radio" name="payment-group"
                                                                               id="payment-2" defaultChecked={true}
                                                                               onClick={() => this.checkhandle(PAY_ON_DELIVERY)}/>
                                                                        <label htmlFor="payment-2">Pay On
                                                                            Delivery</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="radio-option paypal">
                                                                        <input type="radio" name="payment-group"
                                                                               id="payment-1"
                                                                               onClick={() => this.checkhandle(E_PAYMENT)}/>
                                                                        <label htmlFor="payment-1">Pay With Card<span
                                                                            className="image"><img
                                                                            src={`${process.env.PUBLIC_URL}/assets/images/paystack.png`}
                                                                            alt=""/></span></label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/*{(total !== 0)?*/}
                                                    <div className="text-right">
                                                        {this.state.isLoading ?
                                                        (<div className="lds-ring">
                                                                <div></div>
                                                                <div></div>
                                                                <div></div>
                                                                <div></div>
                                                            </div>
                                                        ) :
                                                            (
                                                            <button type="button" className="btn-solid btn"
                                                            onClick={() => this.makePayment()}>Place
                                                            Order
                                                            </button>
                                                            )
                                                        }


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cartList.cartInfo.products,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cartInfo.products),
    userInfo: state.auth.user_info
});

export default connect(
    mapStateToProps,
    {checkOutCart, updateUserInfo, externalRefreshCart, removeFromWishlist}
)(checkOut)
