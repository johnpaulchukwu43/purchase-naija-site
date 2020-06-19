import React, {Component} from 'react';
import { connect } from 'react-redux'
import 'react-input-range/lib/css/index.css';
import { SlideToggle } from 'react-slide-toggle';


import {
    getProductBrandsInSpecifiedCategory,
    getProductColorsInSpecifiedCategory
} from '../../../services';
import {filterBrand, filterColor, filterPrice} from '../../../actions'
import {filterProductsResult} from "../../../actions/productActions";
import {
    BEAUTY_PRODUCT, BRAND,
    COLOR, COMPUTER_PRODUCT,
    ELECTRONICS_PRODUCT,
    FASHION_PRODUCT, MANUFACTURING_PRODUCT, PHONE_PRODUCT,
    PRICE_RANGE,
    RAW_MATERIALS_PRODUCT
} from "../../../constants/ActionTypes";

class FilterBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openFilter: false,
            minPrice:'',
            maxPrice:'',
            showColorFilter:false,
            showBrandFilter:false,
            showPriceFilter:true,
            categoryName:props.categoryName,
            all_categories:props.all_categories,
            colors:[],
            brands:[],
            filteredBrands:[]
        };

    }

    componentWillMount(){
        this.filterBarsToShow(this.state.categoryName);
    }

    componentDidMount(){
        const {all_categories,categoryName} = this.state;
        let {colors} = getProductColorsInSpecifiedCategory(categoryName,all_categories);
        let {brands} = getProductBrandsInSpecifiedCategory(categoryName,all_categories);
        console.log("colors in filter"+JSON.stringify(colors));
        this.setState({
            colors:colors,
            brands:brands
        });
    }

    closeFilter = () => {
        document.querySelector(".collection-filter").style = "left: -365px";
    };

    clickBrandHandle(event, brands) {
        this.closeFilter();
        const index = brands.indexOf(event.target.value);
        if (index === -1 && event.target.checked)
            brands.push(event.target.value); // push in array checked value
        else if(index !== -1){
            brands.splice(index, 1); // removed in array unchecked value
        }
        this.props.filterProductsResult(this.state.categoryName,BRAND,{brands});
    }

    colorHandle(event, color){
        const elems = document.querySelectorAll(".color-selector ul li");
        [].forEach.call(elems, function(el) {
            el.classList.remove("active");
        });
        event.target.classList.add('active');
        this.props.filterProductsResult(this.state.categoryName,COLOR,{color});
    }




    handlePriceFilterAction = ()=>{

        const {minPrice,maxPrice} = this.state;
        let priceRange = {
            value:{
                min:minPrice,
                max:maxPrice,
            }
        };
        this.props.filterProductsResult(this.state.categoryName,PRICE_RANGE,priceRange);
        this.closeFilter();
    };

    onChange = (e)=> {
        this.setState({ [e.target.name]: e.target.value });
    };

    filterBarsToShow = (categoryName)=>{
        switch(categoryName){
            case FASHION_PRODUCT:
                console.log(categoryName);
                console.log(FASHION_PRODUCT);
                this.setState({
                    showColorFilter:true,
                    showBrandFilter:true,
                    showPriceFilter:true,
                });
                break;
            case RAW_MATERIALS_PRODUCT:
                this.setState({
                    showColorFilter:false,
                    showBrandFilter:false,
                    showPriceFilter:true,
                });
                break;
            case ELECTRONICS_PRODUCT:
                this.setState({
                    showColorFilter:true,
                    showBrandFilter:true,
                    showPriceFilter:true,
                });
                break;
            case PHONE_PRODUCT:
                this.setState({
                    showColorFilter:true,
                    showBrandFilter:true,
                    showPriceFilter:true,
                });
                break;
            case MANUFACTURING_PRODUCT:
                this.setState({
                    showColorFilter:false,
                    showBrandFilter:false,
                    showPriceFilter:true,
                });
                break;
            case COMPUTER_PRODUCT:
                this.setState({
                    showColorFilter:true,
                    showBrandFilter:true,
                    showPriceFilter:true,
                });
                break;
            case BEAUTY_PRODUCT:
                this.setState({
                    showColorFilter:true,
                    showBrandFilter:true,
                    showPriceFilter:true,
                });
                break;
            default:
                break;
        }
    };
    render (){
        const {showColorFilter,showBrandFilter,showPriceFilter,colors,brands,filteredBrands} = this.state;
        return (
                <div className="collection-filter-block">
                    <div className="collection-mobile-back">
                        <span className="filter-back" onClick={(e) => this.closeFilter(e)} >
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    {/*brand filter start*/}
                    { showBrandFilter &&
                    <SlideToggle>
                        {({onToggle, setCollapsibleElement}) => (
                            <div className="collection-collapse-block">
                                <h3 className="collapse-block-title" onClick={onToggle}>brand</h3>
                                <div className="collection-collapse-block-content"  ref={setCollapsibleElement}>
                                    <div className="collection-brand-filter">
                                        {brands.map((brand, index) => {
                                            return (
                                                <div className="custom-control custom-checkbox collection-filter-checkbox" key={index}>
                                                    <input type="checkbox"
                                                           onClick={(e) => this.clickBrandHandle(e,filteredBrands)}
                                                           value={brand}
                                                           // defaultChecked={filteredBrands.includes(brand)? true : false}
                                                           className="custom-control-input"
                                                           id={brand} />
                                                    <label className="custom-control-label"
                                                           htmlFor={brand}>{brand}</label>
                                                </div> )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </SlideToggle>
                    }

                    {/*color filter start here*/}
                    {showColorFilter &&

                        <SlideToggle>
                            {({onToggle, setCollapsibleElement}) => (
                                <div className="collection-collapse-block">
                                    <h3 className="collapse-block-title" onClick={onToggle}>colors</h3>
                                    <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                                        <div className="color-selector">
                                            <ul>
                                                {colors.map((color, index) => {
                                                    return (
                                                        <li className={color} title={color} onClick={(e) => this.colorHandle(e, color)} key={index}></li> )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SlideToggle>
                    }

                    {/*price filter start here */}
                    { showPriceFilter &&
                        <SlideToggle>
                            {({onToggle, setCollapsibleElement}) => (
                                <div className="collection-collapse-block open">
                                    <h3 className="collapse-block-title" onClick={onToggle}>Price Range</h3>
                                    <div className="collection-collapse-block-content block-price-content" ref={setCollapsibleElement}>
                                        <div className="collection-brand-filter">
                                            <div className="custom-checkbox collection-filter-checkbox">
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <input type="text" name="minPrice"
                                                           placeholder="Min Price"
                                                           value={this.state.minPrice}
                                                           onChange={this.onChange}
                                                           className="form-control"/>
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <input type="text" name="maxPrice"
                                                           placeholder="Max Price"
                                                           onChange={this.onChange}
                                                           value={this.state.maxPrice}
                                                           className="form-control"/>
                                                </div>
                                                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <button className="btn btn-outline" onClick={()=>this.handlePriceFilterAction()}>Go</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SlideToggle>
                    }

                </div>
        )
    }

}


const mapStateToProps = state => ({
    filters: state.filters,
    all_categories:state.categories,
    priceFilters:state.filter_temp.priceRangeReducer
});

export default connect(
    mapStateToProps,
    { filterBrand, filterColor, filterPrice,filterProductsResult }
)(FilterBar);
