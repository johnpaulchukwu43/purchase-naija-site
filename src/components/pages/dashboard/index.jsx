import React, {Component} from 'react';
import Breadcrumb from "../../common/breadcrumb";
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {logout, updateUserInfo, updateUserPassword} from "../../../actions/authActions";
import {toast} from "react-toastify";
import {USER_LOGIN_ROUTE} from "../../../constants/app-routes";
import userOrder from "../../../api/orderRepository";
import AddressBook from "./addressBook";
import PasswordVault from "./passwordVault";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        const {userInfo} = this.props;
        this.validator = new SimpleReactValidator();

        this.state = {
            userId: userInfo.id,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            phoneNumber: userInfo.phoneNumber || '',
            email: userInfo.email || '',
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: '',
            billingAddress1: userInfo.billingAddress1 || '',
            billingAddress2: userInfo.billingAddress2 || '',
            isLoading: false,
            orderInfo: ''
        };

        this.currentView='';


        this.constants = {
            HOME: "homePage",
            ADDRESS: "addressPage",
            PASSWORD: "changePassword",
            ORDERS: "orders",
            PERSONAL_INFO: "personalInfo"
        };

    }

    componentWillMount() {
        userOrder.getUserOrders(data => {
            if (data.client_error_message) {
                toast.error(data.response.data);
            } else {
                this.setState({
                    orderInfo: data.data
                })
            }

        }, this.state.userId, 1, 10)
    }


    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    };

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

    validateChangePassword = () => {
        let isValid = false;
        if ((this.state.newPassword === '') || (this.state.oldPassword === '') || (this.state.newPasswordRepeat === '')) {
            toast.error("All Fields are Required")
        } else {
            if (this.state.newPassword !== this.state.newPasswordRepeat) {
                toast.error("New Password and Confirm Password do not match")
            } else {
                isValid = true;
            }
        }
        return isValid;
    };

    validateChangeBillingInfo = () => {
        let isValid = false;
        if ((this.state.billingAddress1 === '') || (this.state.billingAddress2 === '')) {
            toast.error("All Fields are Required")
        } else {
            isValid = true;
        }
        return isValid;
    };

    logoutAction = () => {
        const {logout, history} = this.props;
        logout();
        history.push(USER_LOGIN_ROUTE);
    };

    switchDashboardViews = (view) => {
        const {HOME, ADDRESS, PASSWORD, ORDERS, PERSONAL_INFO} = this.constants;
        let {homePage,orders,personalInfo} = this;
        switch (view) {
            case HOME:
                this.currentView =  homePage;
                break;
            case ADDRESS:
                this.currentView = <AddressBook userInfo={this.state}/>;
                break;
            case PASSWORD:
                this.currentView = <PasswordVault userId={this.state.userId} history={this.props.history}/>
                break;
            case ORDERS:
                this.currentView = orders;
                break;
            case PERSONAL_INFO:
                this.currentView = personalInfo;
                break;
            default:
                return homePage;
        }
    };

    changePasswordAction = () => {
        console.log(JSON.stringify(this.context));
        if (this.validateChangePassword()) {
            const {updateUserPassword} = this.props;
            this.showLoader();
            updateUserPassword(data => {
                console.log(JSON.stringify(data));
                if (data.success === true) {
                    this.hideLoader();
                    toast.success("Password Successfully Updated, Re-Login to Continue");
                    this.logoutAction();
                } else {
                    this.hideLoader();
                    toast.error(data.message);
                }
            }, this.state.userId, {newPassword: this.state.newPassword, oldPassword: this.state.oldPassword})
        }

    };

    changeBillingInfoAction = () => {
        const body = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            billingAddress1: this.state.billingAddress1,
            billingAddress2: this.state.billingAddress2,
            phoneNumber: this.state.phoneNumber,
        };
        const {updateUserInfo} = this.props;
        updateUserInfo(data => {
            console.log(JSON.stringify(data));
            if (data.success === false) {
                toast.error("Could not Update User Info");
            } else {
                toast.success("Updated Billing Address Information");
            }
        }, this.state.userId, body);

    };

    render() {
        const {HOME, ADDRESS, PASSWORD, ORDERS, PERSONAL_INFO} = this.constants;

        this.homePage = (
            <div className="dashboard">
                <div className="page-title">
                    <h2>My Dashboard</h2>
                </div>
                <div className="welcome-msg">
                    <p>Hello, {this.state.lastname} , {this.state.firstname} !</p>
                    <p>From your My Account Dashboard you have the ability to view a snapshot of
                        your recent account activity and update your account information. Select
                        a link below to view or edit information.</p>
                </div>
                <div className="box-account box-info">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="box">
                                <div className="box-title">
                                    <h3>Contact Information</h3>
                                    <a href="#">Edit</a>
                                </div>
                                <div className="box-content">
                                    <h6>{this.state.lastname} {this.state.firstname}</h6>
                                    <h6>{this.state.email}</h6>
                                    <h6><a href="#" onClick={() => this.switchDashboardViews(PASSWORD)}>Change
                                        Password</a></h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="box">
                                <div className="box-title">
                                    <h3>Orders</h3>
                                    <a href="#" onClick={() => this.props.history.push('/')}>Go Shopping</a>
                                </div>
                                <div className="box-content">
                                    {console.log("state:"+JSON.stringify(this.state.orderInfo))}
                                    {(this.state.orderInfo) ?
                                        (this.state.orderInfo.total > 0) ?
                                            <a href="#" onClick={() => this.switchDashboardViews(ORDERS)}>View
                                                Orders</a>
                                            :
                                            <p>
                                                No Orders Made Yet
                                            </p>
                                        :

                                        <p>
                                            No Orders Made Yet
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="box">
                            <div className="box-title">
                                <h3>Address Book</h3>
                                <a href="#" onClick={() => this.switchDashboardViews(ADDRESS)}>Manage Addresses</a>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <h5>Default Billing Address</h5>
                                    <address>
                                        {(this.state.billingAddress1) &&
                                        this.state.billingAddress1
                                        }

                                        {(!this.state.billingAddress1) &&
                                        <p> You have not set a default billing address.</p>
                                        }

                                    </address>
                                    <h5>Alternate Billing Address</h5>
                                    <address>
                                        {(this.state.billingAddress2) &&
                                        this.state.billingAddress2
                                        }

                                        {(!this.state.billingAddress2) &&
                                        <p> You have not set an Alternate billing address.</p>
                                        }


                                    </address>
                                </div>
                                {/*<div className="col-sm-6">*/}
                                {/*<h6>Default Shipping Address</h6>*/}
                                {/*<address>*/}
                                {/*You have not set a default shipping address.<br/>*/}
                                {/*<a href="#">Edit Address</a>*/}
                                {/*</address>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        this.addressBook = (
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
        );

        this.changePassword = (
            <div className="checkout-page">
                <h3>Change Password</h3>
                <div className="checkout-form">
                    <form>
                        <div className="checkout row">
                            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                <div className="field-label">Previous Password</div>
                                <input type="text" name="oldPassword"
                                       onChange={this.setStateFromInput}
                                       value={this.state.oldPassword}
                                       placeholder="Old Password"/>
                                {this.validator.message('OldPassword', this.state.oldPassword, 'required|min:8|max:120')}
                            </div>
                            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                <div className="field-label">New Password</div>
                                <input type="text" name="newPassword"
                                       onChange={this.setStateFromInput}
                                       value={this.state.newPassword}
                                       placeholder="New Password"/>
                                {this.validator.message('NewPassword', this.state.newPassword, 'required|min:8|max:120')}
                            </div>
                            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                <div className="field-label">Confirm New Password</div>
                                <input type="password" name="newPasswordRepeat"
                                       onChange={this.setStateFromInput}
                                       placeholder="Repeat Password"/>
                                {this.validator.message('RepeatedPassword', this.state.newPasswordRepeat, 'required|min:8|max:120')}
                            </div>
                            <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                <button type="button"
                                        className="btn btn-outline float-right"
                                        onClick={() => this.changePasswordAction()}>Update
                                    Password
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );

        this.personalInfo = (
            <div></div>
        );


        this.orders = (
            <div></div>
        );


        return (
            <div>
                <Breadcrumb title={'Dashboard'}/>
                {/*Dashboard section*/}
                <section className="section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="account-sidebar">
                                    <a className="popup-btn">
                                        my account
                                    </a>
                                </div>
                                <div className="dashboard-left">
                                    <div className="collection-mobile-back">
                                    <span className="filter-back">
                                        <i className="fa fa-angle-left" aria-hidden="true"></i> back
                                    </span>
                                    </div>
                                    <div className="block-content">
                                        <ul>
                                            <li className="active" onClick={() => this.switchDashboardViews(HOME)}><a
                                                href='#'>Home</a></li>
                                              <li onClick={() => this.switchDashboardViews(ADDRESS)}><a href="#">Address
                                                Book</a></li>
                                            {/*todo add view personal info*/}
                                            {/* <li onClick={() => this.switchDashboardViews(PERSONAL_INFO)}><a href="#">Account Info</a></li>*/}
                                            <li><a href="#">My Orders</a></li>
                                            {/*todo add view wishlist*/}
                                            {/*<li><a href="#">My Wishlist</a></li>*/}
                                            {/*todo add view newsletter sub */}
                                            {/*<li><a href="#">Newsletter</a></li>*/}
                                            <li onClick={() => this.switchDashboardViews(PASSWORD)}><a href="#">Change
                                                Password</a></li>
                                            <li className="last" onClick={() => this.logoutAction()}><a href="#">Log
                                                Out</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9">
                                <div className="dashboard-right">
                                    {this.currentView === ''?
                                        this.switchDashboardViews('')
                                        :
                                        this.currentView
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.auth.user_info
    };
};
export default connect(mapStateToProps, {updateUserPassword, updateUserInfo, logout})(Dashboard);
