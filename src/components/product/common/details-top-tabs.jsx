import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import {Link} from 'react-router-dom'
import {BEAUTY_PRODUCT, COMPUTER_PRODUCT, FASHION_PRODUCT, PHONE_PRODUCT} from "../../../constants/ActionTypes";

class DetailsTopTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            nav1: null,
            nav2: null,
            showGenericView:true,
            showComputerCategoryView:false,
            showPhoneCategoryView:false
        };
    }

    componentWillMount(){
        const {categoryName} = this.props;
        switch (categoryName) {
            case COMPUTER_PRODUCT:
                this.setState({
                    showComputerCategoryView:true,
                    showPhoneCategoryView:false,
                    showGenericView:false
                });
                break;
            case PHONE_PRODUCT:
                this.setState({
                    showComputerCategoryView:false,
                    showPhoneCategoryView:true,
                    showGenericView:false
                });
                break;
            default:
                this.setState({
                    showComputerCategoryView:false,
                    showPhoneCategoryView:false,
                    showGenericView:true
                });
                break;
        }
    }

    render (){
        const {showGenericView,showComputerCategoryView,showPhoneCategoryView} = this.state;
        const{item,categoryName} = this.props;

        return (
            <section className="tab-product m-0">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        <i className="icofont icofont-ui-home"></i>Description</span>
                                    <div className="material-border"></div>
                                </Tab>
                                {/*<Tab className="nav-item">*/}
                                    {/*<span className="nav-link" >*/}
                                        {/*<i className="icofont icofont-contacts"></i>Video</span>*/}
                                    {/*<div className="material-border"></div>*/}
                                {/*</Tab>*/}
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        <i className="icofont icofont-contacts"></i>Reviews</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>

                            {showGenericView &&
                                <TabPanel>
                                    <p className="mt-4 p-0">
                                        {item.name}

                                    </p>
                                </TabPanel>
                            }
                            <TabPanel>
                                <div className="mt-4">
                                    <h3>No Reviews Yet</h3>
                                    <h5>Be the First to review</h5>
                                </div>
                            </TabPanel>

                            {/* todo Add Support for video
                            <TabPanel>*/}
                            {/*<div className="mt-4 text-center">*/}
                                    {/*<div className="embed-responsive embed-responsive-16by9">*/}
                                        {/*<iframe*/}
                                            {/*src="https://www.youtube.com/embed/BUWzX78Ye_8"*/}
                                            {/*allow="autoplay; encrypted-media"*/}
                                            {/*allowFullScreen>*/}
                                        {/*</iframe>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</TabPanel>*/}
                            {/*todo add support to review product*/}
                            {/*<TabPanel>*/}
                                {/*<form className="theme-form mt-4">*/}
                                    {/*<div className="form-row">*/}
                                        {/*<div className="col-md-12 ">*/}
                                            {/*<div className="media m-0">*/}
                                                {/*<label>Rating</label>*/}
                                                {/*<div className="media-body ml-3">*/}
                                                    {/*<div className="rating three-star">*/}
                                                        {/*<i className="fa fa-star"></i>*/}
                                                        {/*<i className="fa fa-star"></i>*/}
                                                        {/*<i className="fa fa-star"></i>*/}
                                                        {/*<i className="fa fa-star"></i>*/}
                                                        {/*<i className="fa fa-star"></i>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label htmlFor="name">Name</label>*/}
                                            {/*<input type="text" className="form-control" id="name" placeholder="Enter Your name" required />*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label htmlFor="email">Email</label>*/}
                                            {/*<input type="text" className="form-control" id="email" placeholder="Email" required />*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-12">*/}
                                            {/*<label htmlFor="review">Review Title</label>*/}
                                            {/*<input type="text" className="form-control" id="review" placeholder="Enter your Review Subjects" required />*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-12">*/}
                                            {/*<label htmlFor="review">Review Title</label>*/}
                                            {/*<textarea className="form-control" placeholder="Wrire Your Testimonial Here" id="exampleFormControlTextarea1" rows="6"></textarea>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-12">*/}
                                            {/*<button className="btn btn-solid" type="submit">Submit YOur Review</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</form>*/}
                            {/*</TabPanel>*/}
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

export default DetailsTopTabs;
