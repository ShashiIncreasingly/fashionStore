import React, { MouseEventHandler, useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { ProductsArray } from "../../data/DataType";
import { ProductImage } from "../ProductImage/ProductImage";
import { ProductTitle } from "../ProductTitle/ProductTitle";
import QuantityInput from "../QuantityInput/QuantityInput";
import { Price } from "../Price/Price";
import '../ShopingCart/ShopingCart.css'
import { CurrencyFormatter } from "../../utilities/CurrencyFormater";
import { Link } from "react-router-dom";

interface Props {
    deleteProductCart: (item: ProductsArray) => void;
    item: ProductsArray;
}
export const ShopingCart = () => {
    const { cart, totalPrice, clearCart, deleteFromCart,increaseQuantity,  decreaseQuantity,  setTotalPrice} = useCartContext();
    
    const [showCart, setShowCart] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    let subTotalItem = 0;
    const getItemTotal = (price:number, quantity:number)=>{
        subTotalItem = price * quantity
    }
    const deleteProductCart = (item:ProductsArray) => {
        deleteFromCart(item)
    };
    const deleteAllAddedproduct = () => {
        clearCart()
    }
    const popupAlertforQty = () => {
        return (
            <div className="qty-remove-popup"><div className="popup-text">Are you sure want to remove this product</div><button className="yes-remove">Yes</button><button className="cancel-remove">Cancel</button></div>
        )
    }
    return (
        <>
            <div className="cart-item-list-conatiner">
                {cart.length > 0 &&
                    <div className="cart-item-header"><div className="cart-header-text">Item</div><div className="cart-header-text">Price</div><div className="cart-header-text">Quantity</div><div className="cart-header-text">Subtotal</div></div>
                }
                <div className="cart-item-list">
                    {cart && cart.map((item) => {
                        return (
                            <div className="cart-items" key={item.id}>
                                <div className="cart-image-title">
                                    <ProductImage product={item}/>
                                    <ProductTitle product={item}/>
                                </div>
                                <Price product={item}/>
                                <QuantityInput product={item}/>
                                <div className="cart-item-subtotal">{CurrencyFormatter(item.totalProductPrice ?? (item.price * (item.quantity ?? 1)))}</div>
                                <button type="button" className="remove-btn"  onClick={(e) => deleteProductCart(item)}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg></button>
                                {showCart && popupAlertforQty()}
                            </div>
                        );
                    })}
                    {cart.length === 0 &&
                        <div className="cart-empty-text"><h2>Your cart is empty</h2><Link to="/product-listing?param=all-category" className="btn">go to fill your cart</Link></div>
                    }
                </div>
                
            </div>
            {cart.length !== 0 && <> <div className="shop-btn-container"><Link to="/product-listing?param=all-category" className="link-btn">Continue shopping</Link><button className="clear-btn link-btn" onClick={deleteAllAddedproduct}>Clear Shopping Cart</button></div><div className="shopping-cart-subtotal"><div className="subtotal-container"><div className="subtotal-container-details"><div className="subtotal-price"><div className="price-text">Subtotal :</div><div className="sub-price">{CurrencyFormatter(totalPrice)}</div></div><div className="subtotal-shipping"><div className="subtotal-text">Shipping Fee:</div><div className="subtotal-value">FREE!</div></div><hr></hr><div className="order-price"><div className="price-text">Order Total :</div><div className="sub-price">{CurrencyFormatter(totalPrice)}</div></div></div><div className="subtotal-btn"><Link to="/checkout" className="btn">Proceed to Checkout</Link></div></div></div></>}

            
                
        </>
    )
}