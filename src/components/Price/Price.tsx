import React from "react";
import { CurrencyFormatter } from "../../utilities/CurrencyFormater";
import { ProductsArray } from "../../data/DataType";
import '../Price/Price.css';

export const Price:React.FC<{product:ProductsArray}> = ({product}) => {
    return (
        <>
            <div className="product-price">{CurrencyFormatter(product.price)}</div>
        </>
    )
}