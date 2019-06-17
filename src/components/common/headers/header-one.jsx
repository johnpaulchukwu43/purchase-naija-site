import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {IntlActions} from 'react-redux-multilingual'
import Pace from 'react-pace-progress'

// Import custom components
import store from '../../../store';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "./../../../containers/CartContainer";
import TopBar from "./common/topbar";
import {changeCurrency} from '../../../actions'
import {connect} from "react-redux";
import SearchComponent from "./common/searchbar";
import {logout} from '../../../actions/authActions';
import PropTypes from "prop-types";
import {SEARCH_ROUTE, USER_DASHBOARD_ROUTE} from "../../../constants/app-routes";


class HeaderOne extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            showAccountDiv:false,
            showSettingsDiv:false,
            searchTerm:''
        }
    }

    componentWillMount() {

        this.unlisten = this.context.router.history.listen(() => this.hideOtherViews());
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.unlisten();
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.hideOtherViews();
        if (number >= 300) {
            document.getElementById("sticky").classList.add('fixed');
        } else {
            document.getElementById("sticky").classList.remove('fixed');
        }
    }

    changeLanguage(lang) {
        store.dispatch(IntlActions.setLocale(lang))
    }

    openNav = ()=> {
        var openmyslide = document.getElementById("mySidenav");
        if (openmyslide) {
            openmyslide.classList.add('open-side')
        }
        this.hideOtherViews();
    }

    openSearch() {
        document.getElementById("search-overlay").style.display = "block";
    }

    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
    }

    load = () => {
        this.setState({isLoading: true});
        fetch().then(() => {
            // deal with data fetched
            this.setState({isLoading: false})
        })
    };

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.context.router.history.push('/');
    }

    toggleAccountDiv = ()=>{
        //toggle the account view value
        let val = !this.state.showAccountDiv;
        //  set the settings div to  false, we want only one view per time
        this.setState({
           showAccountDiv:val,
           showSettingsDiv:false
       });
    };

    toggleSettingsDiv = ()=>{
        //toggle the setting s view value
        let settingVal = !this.state.showSettingsDiv;
        //  set the account div to  false, we want only one view per time
        this.setState({
            showSettingsDiv:settingVal,
            showAccountDiv:false
        });
    };

    hideOtherViews = ()=>{
        this.setState({
            showSettingsDiv:false,
            showAccountDiv:false
        });
    };

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    };

    searchAction = (e)=>{
        e.preventDefault();
        let {searchTerm} = this.state;
        this.doSearch(searchTerm);
        this.closeSearch();
    };

    doSearch = (searchTerm)=>{
        this.context.router.history.push({
            pathname:SEARCH_ROUTE,
            state: {searchTerm}
        });
    };

    render() {
        const {isAuthenticated} = this.props.auth;
        const {translate} = this.props;

        const guestLinks = (
            <li id="account-guest" className="onhover-div  mobile-account" onClick={this.toggleAccountDiv}>
                <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/auth.png`} width="25px" height="25px" className="img-fluid"
                          alt=""/>
                    <i className="fa fa-lg fa-user-circle" aria-hidden="true"></i>
                    <ul className={"show-div setting "+(this.state.showAccountDiv?"remove-div":null)}>
                        <li>
                            <h5><Link to={`${process.env.PUBLIC_URL}/pages/user/login`} data-lng="en" className="mobile-account-style">Login to Account</Link></h5>
                        </li>
                        <li className="divider h20"></li>
                        <li>
                            <h5><Link to={`${process.env.PUBLIC_URL}/pages/user/register`} data-lng="en" className="mobile-account-style">Create Account</Link></h5>
                        </li>
                    </ul>
                </div>
            </li>
        );

        const userLinks = (
            <li id="account-user"  className="onhover-div  mobile-account" onClick={this.toggleAccountDiv}>
                <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/auth.png`} width="25px" height="25px" className="img-fluid"
                          alt=""/>
                    <i className="fa fa-lg fa-user-circle" aria-hidden="true"></i>
                </div>
                <ul className={"show-div setting "+(this.state.showAccountDiv?"remove-div":null)}>
                    <li>
                       <h6><Link to={`${process.env.PUBLIC_URL}${USER_DASHBOARD_ROUTE}`} data-lng="en">DashBoard</Link></h6>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <h6><a href="#" onClick={this.logout.bind(this)}>Logout</a></h6>
                    </li>
                </ul>
            </li>
        );

        return (
            <header id="sticky" className="sticky">
                {this.state.isLoading ? <Pace color="#27ae60"/> : null}
                <div className="mobile-fix-option"></div>
                {/*Top Header Component*/}

                <TopBar hideOtherViews ={this.hideOtherViews}/>

                <div className="centralize-menu">
                    <div className="row">
                        <div className="col-sm-12">

                            <div className="main-menu">

                                <div className="menu-left">
                                    <div className="navbar">
                                    <a href="javascript:void(0)" onClick={this.openNav}>
                                    <div className="bar-style"> <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
                                    </a>
                                    {/*SideBar Navigation Component*/}
                                    <SideBar/>
                                    </div>
                                    <div className="brand-logo">
                                        <Link to={`${process.env.PUBLIC_URL}/`}>
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/icon/pnlogo.png`}
                                                 className="img-fluid" alt=""/>
                                        </Link>
                                    </div>
                                </div>
                                {/*<NavBar/>*/}
                                <div className="search-section">
                                    <SearchComponent doSearch = {this.doSearch}/>
                                </div>

                                <div className="menu-right pull-right">

                                    <div>
                                        <div className="icon-nav">
                                            <ul>
                                                {isAuthenticated ? userLinks : guestLinks}
                                                {/*mobile-search*/}
                                                <li className="onhover-div mobile-search">
                                                    <div><img
                                                        src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`}
                                                        onClick={this.openSearch} className="img-fluid" alt=""/>
                                                        {/*<i className="fa fa-search" onClick={this.openSearch}></i>*/}
                                                    </div>
                                                    <div id="search-overlay" className="search-overlay">
                                                        <div>
                                                            <span className="closebtn" onClick={this.closeSearch}
                                                                  title="Close Overlay">×</span>
                                                            <div className="overlay-content">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-xl-12">
                                                                            <form>
                                                                                <div className="form-group">
                                                                                    <input type="text"
                                                                                           className="form-control"
                                                                                           id="searchTerm"
                                                                                           name="searchTerm"
                                                                                           value={this.state.searchTerm}
                                                                                           onChange={this.setStateFromInput}
                                                                                           placeholder="Search a Product"/>
                                                                                </div>
                                                                                <button onClick={this.searchAction} className="btn btn-primary">
                                                                                    <i className="fa fa-search"></i>
                                                                                </button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <CartContainer hideOtherViews ={this.hideOtherViews}/>
                                                {/*settings*/}
                                                <li className="onhover-div mobile-setting" onClick={this.toggleSettingsDiv}>
                                                    <div><img
                                                        src={`${process.env.PUBLIC_URL}/assets/images/icon/setting.png`}
                                                        className="img-fluid" alt=""/>
                                                        <i className="fa fa-cog"></i></div>
                                                    <div id="settings" className={"show-div setting "+(this.state.showSettingsDiv?"remove-div":null)}>
                                                        <h6>language</h6>
                                                        <ul>
                                                            <li><a href={null}
                                                                   onClick={() => this.changeLanguage('en')}>English</a>
                                                            </li>
                                                            <li><a href={null}
                                                                   onClick={() => this.changeLanguage('fn')}>French</a>
                                                            </li>
                                                        </ul>
                                                        <h6>currency</h6>
                                                        <ul className="list-inline">
                                                            <li><a href={null}
                                                                   onClick={() => this.props.changeCurrency('€')}>euro</a>
                                                            </li>
                                                            <li><a href={null}
                                                                   onClick={() => this.props.changeCurrency('₹')}>rupees</a>
                                                            </li>
                                                            <li><a href={null}
                                                                   onClick={() => this.props.changeCurrency('£')}>pound</a>
                                                            </li>
                                                            <li><a href={null}
                                                                   onClick={() => this.props.changeCurrency('$')}>doller</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="mobile-home">
                                                    <Link to={`${process.env.PUBLIC_URL}/`}>
                                                        <i className="fa fa-home"></i>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

HeaderOne.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

HeaderOne.contextTypes = {
    router: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps,
    {changeCurrency, logout}
)(HeaderOne);
