import React, {Component} from 'react';
import PropTypes from "prop-types";
import {SEARCH_ROUTE} from "../../../../constants/app-routes";
class   Search extends Component {

    constructor (props) {
        super (props)
        this.state = {
            searchTerm:''
        }

    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    };

    doSearch = ()=>{
        let {searchTerm} = this.state;
        this.context.router.history.push({
            pathname:SEARCH_ROUTE,
            state: {searchTerm}
        });
    };

    render (){
        const searchContainer ={
            width:"100%"
        };

        return (
            <div style={searchContainer}>
                {/*Search section*/}
                <form className="">
                    <div className="input-group">

                        <input type="text" className="form-control"
                               name="searchTerm"
                               aria-label="Amount (to the nearest Naira)"
                               value={this.state.searchTerm}
                               onChange={this.setStateFromInput}
                               placeholder="Search For Products" />
                        <div className="input-group-btn">
                            {/*<button type="button" className="dropdown-toggle search-categories"*/}
                                    {/*data-toggle="dropdown">All Categories <span className="caret"></span></button>*/}
                            {/*<ul className="dropdown-menu">*/}
                                {/*<li><a href="#">Action</a></li>*/}
                                {/*<li><a href="#">Another action</a></li>*/}
                                {/*<li className="divider"></li>*/}
                                {/*<li><a href="#">Separated link</a></li>*/}
                            {/*</ul>*/}
                        </div>
                        <div className="input-group-append">
                            <a className="btn btn-solid" onClick={this.doSearch}>
                                <i className="fa fa-lg fa-search"></i>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

Search.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Search
