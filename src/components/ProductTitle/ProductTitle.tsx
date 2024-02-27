import React, { MouseEventHandler, useState } from "react";
import { ProductsArray } from "../../data/DataType";
import { useNavigate } from "react-router-dom";
import '../ProductTitle/ProductTitle.css';

export const ProductTitle:React.FC<{product:ProductsArray}> = ({product}) => {
    const navigate = useNavigate();
    const productid = product.id;
    const handleClick: MouseEventHandler<Element> = (event) => {
        navigate(`/product/${productid}`, { state: { product} });
    }
    return (
        <>
            <div className="product-name" onClick={handleClick}>{product.title}</div>
        </>
    )
}