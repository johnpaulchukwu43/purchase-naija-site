import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import protectedPage from './utils/requireAuth';
import './index.scss';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'


// Import custom components
import store from './store';
import translations from './constants/translations'
import {getAllProducts} from './actions/productActions'
import Index from './components/layouts/index';
import jwtDecode from 'jwt-decode';

//Category imports
import PhonesCategory from './components/categories/phones/phones'
import RawMaterialsCategory from './components/categories/raw_materials'
import ManufactruingCategory from './components/categories/manufacturing/manufacturing'
import FashionCategory from './components/categories/fashion/index'
import ElectronicsCategory from './components/categories/electronics/electronics'
import ComputerCategory from './components/categories/computer/computer'
import BeautyCategory from './components/categories/beauty/beauty'

// Product Page
import SingleProduct from "./components/product/single-product";

// Features
import Layout from './components/app'
import Cart from './components/cart'
import Compare from './components/compare/index'
import wishList from './components/wishlist'
import checkOut from './components/checkout'
import orderSuccess from './components/checkout/success-page'

// Pages
import aboutUs from './components/pages/about-us'
import PageNotFound from './components/pages/404'
import Login from './components/pages/login'
import QuickRegisterAndLogin from './components/pages/quick-register-before-checkout'
import Register from './components/pages/register'
import RegisterServiceProvider from './components/pages/register-service-provider'
import LoginServiceProvider from './components/pages/login-service-provider'
import ForgetPassword from './components/pages/forget-password'
import Contact from './components/pages/contact'
import Dashboard from './components/pages/dashboard/index'
import Faq from './components/pages/faq'
import {
    BEAUTY_SINGLE_PRODUCT_ROUTE, COMPUTER_SINGLE_PRODUCT_ROUTE, ELECTRONICS_SINGLE_PRODUCT_ROUTE,
    FASHION_SINGLE_PRODUCT_ROUTE,
    MANUFACTURING_SINGLE_PRODUCT_ROUTE, PHONE_SINGLE_PRODUCT_ROUTE, RAW_MATERIAL_SINGLE_PRODUCT_ROUTE, SEARCH_ROUTE,
    USER_DASHBOARD_ROUTE,
    USER_LOGIN_ROUTE
} from "./constants/app-routes";
import SearchResultContainer from "./components/layouts/search";
import {
    BEAUTY_PRODUCT,
    COMPUTER_PRODUCT, ELECTRONICS_PRODUCT, FASHION_PRODUCT,
    MANUFACTURING_PRODUCT,
    PHONE_PRODUCT,
    RAW_MATERIALS_PRODUCT
} from "./constants/ActionTypes";
import {checkUserType} from "./services/authorizationService"


class Root extends React.Component {

    fetchAllProducts = ()=>{
        // store.dispatch(getAllProducts(1,10));
    };


    render() {
        this.fetchAllProducts();
        checkUserType();
        return <Provider store={store}>
            <IntlProvider translations={translations} locale='en'>
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Layout>
                            <Switch>
                                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Index}/>
                                {/*Product Categories*/}
                                <Route path={`${process.env.PUBLIC_URL}/product/category/devices`}
                                       component={PhonesCategory}/>
                                <Route path={`${process.env.PUBLIC_URL}/product/category/manufacturing`}
                                       component={ManufactruingCategory}/>
                                <Route path={`${process.env.PUBLIC_URL}/product/category/fashion`}
                                       component={FashionCategory}/>
                                <Route path={`${process.env.PUBLIC_URL}/product/category/computers`}
                                       component={ComputerCategory}/>
                                <Route path={`${process.env.PUBLIC_URL}/product/category/raw_materials`}
                                       component={RawMaterialsCategory}/>
                                <Route path={`${process.env.PUBLIC_URL}/product/category/beauty_products`}
                                       component={BeautyCategory}/>
                                <Route path={`${process.env.PUBLIC_URL}/product/category/electronics`}
                                       component={ElectronicsCategory}/>

                                {/*Routes For Single Product*/}
                                <Route path={`${FASHION_SINGLE_PRODUCT_ROUTE}/:id`}
                                       render={(props) => <SingleProduct {...props} categoryType={FASHION_PRODUCT}/>}/>
                                <Route path={`${MANUFACTURING_SINGLE_PRODUCT_ROUTE}/:id`}
                                       render={(props) => <SingleProduct {...props}
                                                                         categoryType={MANUFACTURING_PRODUCT}/>}/>
                                <Route path={`${BEAUTY_SINGLE_PRODUCT_ROUTE}/:id`}
                                       render={(props) => <SingleProduct {...props} categoryType={BEAUTY_PRODUCT}/>}/>
                                <Route path={`${PHONE_SINGLE_PRODUCT_ROUTE}/:id`}
                                       render={(props) => <SingleProduct {...props} categoryType={PHONE_PRODUCT}/>}/>
                                <Route path={`${COMPUTER_SINGLE_PRODUCT_ROUTE}/:id`}
                                       render={(props) => <SingleProduct {...props} categoryType={COMPUTER_PRODUCT}/>}/>
                                <Route path={`${RAW_MATERIAL_SINGLE_PRODUCT_ROUTE}/:id`}
                                       render={(props) => <SingleProduct {...props}
                                                                         categoryType={RAW_MATERIALS_PRODUCT}/>}/>
                                <Route path={`${ELECTRONICS_SINGLE_PRODUCT_ROUTE}/:id`}
                                       render={(props) => <SingleProduct {...props}
                                                                         categoryType={ELECTRONICS_PRODUCT}/>}/>

                                {/*Routes For custom Features*/}
                                <Route path={`${process.env.PUBLIC_URL}/cart`} component={Cart}/>
                                <Route path={`${process.env.PUBLIC_URL}/wishlist`} component={wishList}/>
                                <Route path={`${process.env.PUBLIC_URL}/compare`} component={Compare}/>
                                <Route path={`${process.env.PUBLIC_URL}/checkout`}
                                       component={protectedPage(checkOut, QuickRegisterAndLogin, '/pages/user/login-checkout-process')}/>
                                <Route path={`${process.env.PUBLIC_URL}/order-success`} component={orderSuccess}/>

                                {/*Routes For Extra Pages*/}
                                <Route path={`${process.env.PUBLIC_URL}/pages/about-us`} component={aboutUs}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/404`} component={PageNotFound}/>
                                <Route path={`${process.env.PUBLIC_URL}${USER_LOGIN_ROUTE}`} component={Login}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/user/login-checkout-process`}
                                       component={QuickRegisterAndLogin}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/user/register`} component={Register}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/service-provider/register`}
                                       component={RegisterServiceProvider}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/service-provider/login`}
                                       component={LoginServiceProvider}/>
                                <Route path={`${process.env.PUBLIC_URL}${SEARCH_ROUTE}`}
                                       component={SearchResultContainer}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/forget-password`}
                                       component={ForgetPassword}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/contact`} component={Contact}/>
                                <Route path={`${process.env.PUBLIC_URL}${USER_DASHBOARD_ROUTE}`}
                                       component={protectedPage(Dashboard, Login, USER_LOGIN_ROUTE)}/>
                                <Route path={`${process.env.PUBLIC_URL}/pages/faq`} component={Faq}/>

                                {/*Blog Pages*/}
                                <Route component={PageNotFound}/>
                            </Switch>
                        </Layout>
                    </ScrollContext>
                </BrowserRouter>
            </IntlProvider>
        </Provider>
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


