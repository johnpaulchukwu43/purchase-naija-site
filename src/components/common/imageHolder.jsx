import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ImageZoom from "../product/common/product/image-zoom";

class ImageHolder extends Component {
    render (){
        const {item} = this.props;
        return (
            <div className="col-lg-6 product-thumbnail">
                <div className="product-slick">
                    {item.imageUrls.map((vari, index) =>
                        <div key={index}>
                            <ImageZoom image={vari} />
                        </div>
                    )}
                </div>
            </div>

        )
    }
}

export default ImageHolder;
