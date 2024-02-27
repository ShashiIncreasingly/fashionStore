import React, { MouseEventHandler, useState } from "react";
import { ProductsArray } from "../../data/DataType";
import { useNavigate } from "react-router-dom";
import "../ProductImage/ProductImage.css"
export const ProductImage:React.FC<{product:ProductsArray}> = ({product}) => {
    const navigate = useNavigate();
    const productid = product.id;
    const handleClick: MouseEventHandler<Element> = (event) => {
        navigate(`/product/${productid}`, { state: { product} });
    }
    return (
        <>
            <div className="product-image" onClick={handleClick}>
                <img src={product.image} alt={product.title}/>
            </div>
        </>
    )
}