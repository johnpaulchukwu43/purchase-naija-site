import React, {Component} from 'react';
import SimpleReactValidator from "simple-react-validator";
import {logout, updateUserPassword} from "../../../actions/authActions";
import connect from "react-redux/es/connect/connect";
import Notify from "../../../utils/notification";
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import {USER_LOGIN_ROUTE} from "../../../constants/app-routes";

class PasswordVault extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.state = {
            userId:props.userId,
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: '',
            notify:new Notify(),
            isLoading: false,
        };
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
        let {newPassword,oldPassword,newPasswordRepeat,notify} = this.state;
        if ((newPassword === '') || (oldPassword === '') || (newPasswordRepeat === '')) {
            notify.error("All Fields are Required")
        } else {
            if (this.state.newPassword !== this.state.newPasswordRepeat) {
                notify.error("New Password and Confirm Password do not match")
            } else {
                isValid = true;
            }
        }
        return isValid;
    };


    changePasswordAction = () => {
        console.log(JSON.stringify(this.context));
        if (this.validateChangePassword()) {
            const {updateUserPassword} = this.props;
            let {newPassword,oldPassword,notify,userId} = this.state;
            this.showLoader();
            updateUserPassword(data => {
                console.log(JSON.stringify(data));
                if (data.success === true) {
                    this.hideLoader();
                    notify.success("Password Successfully Updated, Re-Login to Continue");
                    this.logoutAction();
                } else {
                    this.hideLoader();
                    notify.error(data.message);
                }
            }, userId, {newPassword,oldPassword})
        }

    };

    logoutAction = () => {
        console.log(JSON.stringify(this.props));
        const {logout, history} = this.props;
        logout();
        history.push(USER_LOGIN_ROUTE);
    };

    render(){
        return(
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

        )
    }

}

PasswordVault.propTypes = {
    userId: PropTypes.string.isRequired,
    updateUserPassword: PropTypes.func.isRequired
};

export default connect(null, {updateUserPassword,logout})(PasswordVault);
