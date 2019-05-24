import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import {toast} from "react-toastify";
import {logout, updateUserInfo, updateUserPassword} from "../../../actions/authActions";
import connect from "react-redux/es/connect/connect";
import Notify from "../../../utils/notification";
import PropTypes from "prop-types";


class AddressBook extends Component{


    constructor(props) {
        super(props);
        const {userInfo} = this.props;
        this.validator = new SimpleReactValidator();
        this.state = {
            userId: userInfo.userId,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            phoneNumber: userInfo.phoneNumber || '',
            email: userInfo.email || '',
            billingAddress1: userInfo.billingAddress1 || '',
            billingAddress2: userInfo.billingAddress2 || '',
            isLoading: false,
        };
    }


    showLoader = () => {
        this.setState({
            isLoading: true,
        });
    };

    hideLoader = () => {
        this.setState({
            isLoading: false,
        });
    };

    changeBillingInfoAction = () => {
        const notify = new Notify();
        const body = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            billingAddress1: this.state.billingAddress1,
            billingAddress2: this.state.billingAddress2,
            phoneNumber: this.state.phoneNumber,
        };
        this.showLoader();
        const {updateUserInfo} = this.props;
        updateUserInfo(data => {
            this.hideLoader();
            console.log(JSON.stringify(data));
            if (data.success === false) {
                notify.error("Could not Update User Info");
            } else {
                notify.success("Updated Billing Address Information");
            }
        }, this.state.userId, body);

    };

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    };

    render(){
        return (
            <div className="checkout-page">
                <h3>Update Billing Address Information</h3>
                <div className="checkout-form">
                    <form>
                        <div className="checkout row">
                            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                <div className="field-label"> Billing Address 1</div>
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
                            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                <button type="button" disabled={this.state.isLoading}
                                        className="btn-outline float-right"
                                        onClick={() => this.changeBillingInfoAction()}>Update Info
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

AddressBook.propTypes = {
    userInfo: PropTypes.object.isRequired,
    updateUserInfo: PropTypes.func.isRequired
};

export default connect(null, {updateUserInfo})(AddressBook);
