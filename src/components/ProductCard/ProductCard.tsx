
import { Price } from "../Price/Price";
import { Buttons } from "../Button/Buttons";
import { RatingComponent } from "../Rating/Rating";
import { ProductsArray } from "../../data/DataType";
import "../../components/ProductCard/ProductCard.css"
import React, { MouseEventHandler, useState } from "react";
import QuantityInput from "../QuantityInput/QuantityInput";
import { ProductTitle } from "../ProductTitle/ProductTitle";
import { ProductImage } from "../ProductImage/ProductImage";
import { DeliveryBlock } from "../DeliveryBlock/DeliveryBlock";
import { Link, useNavigate, useNavigation} from "react-router-dom";
import { CurrencyFormatter } from "../../utilities/CurrencyFormater";

const ProductCard: React.FC<{ product: ProductsArray }> = ({ product }) => {
    return (
        <>
            <ProductImage product={product} />
            <div className="product-details">
                <ProductTitle product={product}/>
                <div className="product-rating"><RatingComponent rating={product.rating} /></div>
                <Price product={product} />
                <div className="product-qty-block">
                    <QuantityInput product={product} />
                    <Buttons product={product} />
                </div>
                <DeliveryBlock />
            </div>
        </>
    )
}
export default ProductCard;