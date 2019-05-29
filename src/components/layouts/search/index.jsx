/*
 Created by Johnpaul Chukwu @ $
*/
import React, {Component,lazy, Suspense} from 'react';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {searchAllProducts, searchAllProductsFailed, searchAllProductsSuccess} from "../../../actions/productActions";
import  SearchResult from "./searchResult";

class SearchResultContainer extends Component{


    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.fetchProducts();
    }

    fetchProducts = () => {
        let {searchAllProducts,searchAllProductsSuccess,searchAllProductsFailed} = this.props;
        let {searchTerm} = this.props.location.state;
        console.log(searchTerm);
        searchAllProducts(searchTerm).then(result=>{
            if(result.client_error_message){
                let error = {actual:result.response.data,friendly:result.client_error_message};
                searchAllProductsFailed(error);
            }else{
                searchAllProductsSuccess(result.data.result || []);
            }
        })
    };

    componentDidUpdate(prevProps) {
        let {searchTerm} = this.props.location.state;
        //if there has been a change in the searchTerm, lets fetch products again
        console.log("Previous Props: "+prevProps.location.state.searchTerm);
        console.log("New Props: "+searchTerm);
        if(searchTerm !== prevProps.location.state.searchTerm){
            console.log("not equal, fetching...");
            this.fetchProducts();
        }
    }

    render(){
        let {searchTerm} = this.props.location.state;
        let {searchInfo} = this.props;
        return(
               <SearchResult searchTerm = {searchTerm} searchInfo={searchInfo}/>
        )
    }
}

const mapStateToProps = (state) => ({
    searchInfo: state.searchResults
});

SearchResultContainer.propTypes = {
    searchAllProducts: PropTypes.func.isRequired,
    searchAllProductsSuccess: PropTypes.func.isRequired,
    searchAllProductsFailed: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,{searchAllProducts,searchAllProductsFailed,searchAllProductsSuccess})(SearchResultContainer);
