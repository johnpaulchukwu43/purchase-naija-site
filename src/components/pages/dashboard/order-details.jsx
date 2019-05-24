import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import {toast} from "react-toastify";
import {logout, updateUserInfo, updateUserPassword} from "../../../actions/authActions";
import connect from "react-redux/es/connect/connect";
import Notify from "../../../utils/notification";
import PropTypes from "prop-types";

class OrderDetails extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
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

        )
    }
}
export default connect(null,{})(OrderDetails)
