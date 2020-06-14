import React, {Component} from 'react';
import { connect } from 'react-redux';
import Breadcrumb from "../common/breadcrumb";
import TextFieldGroup from "../common/TextFieldGroup";
import {login} from "../../actions/authActions";
import validateInput from "../../utils/validations/login";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Notify from "../../utils/notification";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {

        const { errors, isValid } = validateInput(this.state);


        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        const notify = new Notify();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            let {auth, login} = this.props;
            let requestBody = {
                "email":this.state.email,
                "password":this.state.password,
                "guestId": auth.guest.guestId
            };
            login(requestBody).then(res=>{
                //todo handle proper routing after successful login
                this.setState({ isLoading: false});
                if (res.success === true) {
                    notify.info("Welcome");
                    this.context.router.history.push('/');
                }else{
                    notify.error(auth.loginError.message);
                }
            }).catch((data)=>{
                this.setState({ isLoading: false});
                notify.error(data.error.message);
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {

        const {errors, email, password, isLoading} = this.state;

        return (
            <div>
                <Breadcrumb title={'Login'}/>
                {/*Login section*/}

                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="theme-card">
                                    <form className="theme-form" onSubmit={this.onSubmit}>
                                        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                                        <TextFieldGroup
                                            field="email"
                                            label="Email Address"
                                            value={email}
                                            error={errors.email}
                                            onChange={this.onChange}
                                        />
                                        <TextFieldGroup
                                            field="password"
                                            label="Password"
                                            value={password}
                                            error={errors.password}
                                            onChange={this.onChange}
                                            type="password"
                                        />
                                        <button className="btn btn-solid" disabled={isLoading}>Login</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                        allows you to be able to order from our shop. To start shopping click
                                        register.</p>
                                    <Link className="btn btn-solid" to={`${process.env.PUBLIC_URL}/pages/user/register`}>
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
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};
Login.contextTypes = {
    router: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, { login })(Login);
