import React, {Component} from 'react';

import Breadcrumb from "../common/breadcrumb";
import connect from "react-redux/es/connect/connect";
import {login, logout, userSignupRequest} from "../../actions/authActions";
import PropTypes from "prop-types";
import PasswordField from "../common/form/PasswordField";
import FormField from "../common/form/FormField";
import EmailField from "../common/form/EmailField";
import {changeGuestCartToCustomerCart} from "../../actions/cartActions";
import {CUSTOMER_CART} from "../../constants/ActionTypes";
import Notify from "../../utils/notification";
import {Link, Route} from "react-router-dom";
import {USER_LOGIN_ROUTE} from "../../constants/app-routes";
import TextFieldGroup from "../common/TextFieldGroup";
import validateInput from "../../utils/validations/login";

class QuickRegisterAndLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            email_value: '',
            password_value: '',
            firstName_value: '',
            lastName_value: '',
            isRegisterView: true,
            isLoading: false,
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        //todo potential beans if null ?
        const notify = new Notify();
        e.preventDefault();
        this.setState({isLoading: true});
        let requestBody = {
            "email": this.state.email_value,
            "password": this.state.password_value,
            "firstname": this.state.firstName_value,
            "lastname": this.state.lastName_value
        };
        let {userSignupRequest} = this.props;
        if(this.state.isRegisterView){
            //first we create the user
            userSignupRequest(requestBody).then(res => {
                this.setState({isLoading: false});
                let response = this.props.response;
                if (response.signUpError !== null) {
                    if(response.signUpError instanceof Object){
                        notify.error(response.signUpError.message);
                    }else{
                        notify.error("Unable to Connect Server. Please Try Again");
                    }
                } else if (response.isRegistered) {
                    notify.success("Account Successfully Created");
                    this.doLoginAction(requestBody,notify);
                }
            }).catch((err) => {
                this.setState({isLoading: false});
                let response = this.props.response;
                if (response.error) {
                    notify.error(response.error.message);
                }
            });
        }
        else{
            //if the user already has an account then its login next
                this.doLoginAction(requestBody,notify);
        }

    }

    onChange(e) {
        this.setState({
            value: {[e.target.name]: e.target.value}
        });
    }

    isValid() {

        const {errors, isValid} = validateInput(this.state);


        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    doLoginAction = (requestBody,notify)=>{
        //if the user is created successfully, we sign them in
        let {changeGuestCartToCustomerCart, logout, login} = this.props;
        const guestId = this.props.response.guest.guestId;
        login(requestBody).then(res => {
            this.setState({isLoading: false});
            let response = this.props.response;

            if(response.loginError !== null){
                //if login in fails and we re the ones that helped them login after registering  then redirect user to login in page
                if(this.state.isRegisterView){
                    this.context.router.history.push('/pages/user/login');
                }
                notify.error(response.loginError.message);
            }else {
                //After signing in, we change their guest cart to a customer cart, is just standard procedure :)
                const userId = response.user.userId;
                changeGuestCartToCustomerCart(result => {
                    if (result.success === true) {
                        let userInfo = response.user_info;
                        notify.success("You are Currently Signed In as" + userInfo.firstname + ' ' + userInfo.lastname);
                        this.context.router.history.push('/checkout');
                    } else {
                        //todo what to do??
                        //if updating cart status fails; sign user out and redirect to login page to
                        logout();
                        this.context.router.history.push('/pages/user/login');
                    }
                }, guestId, userId, CUSTOMER_CART);
            }
        });
    };

    switchToLoginView = () => {
        this.setState({
            isRegisterView: false
        })
    };
    // higher-order function that returns a state change watch function
    // sets the corresponding state property to true if the form field has no errors
    fieldStateChanged = field => state => this.setState({
        [field]: state.errors.length === 0,
        [field + "_value"]: state.value
    });

    // state change watch functions for each field
    emailChanged = this.fieldStateChanged('email');
    firstNameChanged = this.fieldStateChanged('firstName');
    lastNameChanged = this.fieldStateChanged('lastName');
    passwordChanged = this.fieldStateChanged('password');


    render() {

        const {email, password, firstName, lastName, isLoading, errors} = this.state;

        const formValidated = firstName && lastName && password && email;

        // validation function for the fullname
        // ensures that fullname contains at least two names separated with a space
        const validateFullname = value => {
            const regex = /^[a-z]{2,}$/i;
            if (!regex.test(value)) throw new Error('Name should be at least two characters');
        };
        return (

            <div>
                {this.state.isRegisterView ?
                    (
                        <div>
                            <Breadcrumb title={'create account'}/>
                            <section className="register-page section-b-space">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h3>Create Account to continue Checkout</h3>
                                            <h5><a href="#" onClick={this.switchToLoginView} className="primary-text-link">Already
                                                have an Account ? Click to Login <i className="fa fa-angle-right"></i></a>
                                            </h5>
                                            <div className="theme-card">
                                                <form className="theme-form" name="registerForm" id="registerForm" onSubmit={this.onSubmit}>
                                                    <div className="form-row">
                                                        <div className="col-md-6">
                                                            {/** Render the fullname form field passing the name validation fn **/}
                                                            <FormField type="text" fieldId="firstName"
                                                                       onChange={this.onChange}
                                                                       label="First Name" placeholder="Enter Fullname"
                                                                       validator={validateFullname}
                                                                       onStateChanged={this.firstNameChanged} required/>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <FormField type="text" fieldId="lastName" label="Last Name"
                                                                       placeholder="Enter Last Name"
                                                                       validator={validateFullname}
                                                                       onStateChanged={this.lastNameChanged} required/>
                                                        </div>

                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-6">
                                                            {/** Render the email field component **/}
                                                            <EmailField fieldId="email" label="Email"
                                                                        placeholder="Enter Email Address"
                                                                        onStateChanged={this.emailChanged} required/>
                                                        </div>

                                                        <div className="col-md-6">
                                                            {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
                                                            <PasswordField fieldId="password" label="Password"
                                                                           placeholder="Enter Password"
                                                                           onStateChanged={this.passwordChanged}
                                                                           thresholdLength={7}
                                                                           minStrength={3} required/>
                                                        </div>
                                                        {/** Show the form button only if all fields are valid **/}
                                                        <button type="button"
                                                                disabled={this.state.isLoading || !formValidated}
                                                                className="btn btn-solid" onClick={this.onSubmit}>create
                                                            Account
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    )
                    :
                    (
                        <div>
                            <Breadcrumb title={'Login'}/>
                            {/*Login section*/}
                            <section className="login-page section-b-space">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="theme-card">
                                                <form className="theme-form" name="loginForm" id="loginForm" onSubmit={this.onSubmit}>

                                                    <EmailField fieldId="email" label="Email"
                                                                placeholder="Enter Email Address"
                                                                onStateChanged={this.emailChanged} required/>
                                                    <FormField type="password" fieldId="password" label="Password"
                                                               placeholder="Enter Password"
                                                               onStateChanged={this.passwordChanged} required/>
                                                    <button className="btn btn-solid"
                                                            onClick={this.onSubmit}
                                                            disabled={isLoading}>
                                                        Login
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 right-login">
                                            <h3>New Customer</h3>
                                            <div className="theme-card authentication-right">
                                                <h6 className="title-font">Create A Account</h6>
                                                <p>Sign up for a free account at our store. Registration is quick and
                                                    easy. It
                                                    allows you to be able to order from our shop. To start shopping
                                                    click
                                                    register.</p>
                                                <Link className="btn btn-solid"
                                                      to={`${process.env.PUBLIC_URL}/pages/user/register`}>
                                                    Create an Account
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )
                }
            </div>
        )
    }
}

QuickRegisterAndLogin.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};
QuickRegisterAndLogin.contextTypes = {
    router: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    return {
        response: state.auth
    };
};


export default connect(mapStateToProps, {
    userSignupRequest,
    login,
    logout,
    changeGuestCartToCustomerCart
})(QuickRegisterAndLogin);
