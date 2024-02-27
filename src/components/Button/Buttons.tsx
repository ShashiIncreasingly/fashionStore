import "../../components/Button/Button.css"
import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom"
import { ProductsArray } from "../../data/DataType"
import { useLocation,useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

export const Buttons:React.FC<{ product: ProductsArray }> = ({product}) => {
    const { addToCart } = useCartContext();
    let prodTitle= product.title.replace('-', ' ');
    const productArr : ProductsArray = product
    const navigate = useNavigate();
    const productid = product.id;
    const handleClick: MouseEventHandler<Element> = (event) => {
        navigate(`/product/${productid}`, { state: { product} });
    }
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        addToCart(product, product.quantity??1);
    };
    return (
        <>
            <button className="product_details_btn" onClick={handleAddToCart}>Add to Basket</button>
            <div className='new-product__button-wrapper'>
                <button className="product_details_btn view-more" onClick={handleClick}>View Product</button>
            </div>
        </>
    )
}