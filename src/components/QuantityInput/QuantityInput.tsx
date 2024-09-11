import React, { useEffect, useState } from "react";
import { ProductsArray } from "../../data/DataType";
import "./QuantityInput.css"
import { useCartContext } from "../../context/CartContext";

const QuantityInput:React.FC<{product:ProductsArray}> = ({product}) => {
    if(!product.quantity){
        product.quantity = 1;  
    }
    const [count, setCount] = useState(product)
    const { cart, totalPrice, clearCart, deleteFromCart,increaseQuantity,  decreaseQuantity,  setTotalPrice, getQuantity} = useCartContext();
    const handleIncrementQuantity = () =>{
        setCount((prev) => {
            const newQuantity = (prev.quantity ?? 0) + 1;
            const newTotalPrice = newQuantity * product.price;
            return {
                ...prev,
                quantity: newQuantity,
                totalProductPrice: newTotalPrice
            };
        });
        if(window.location.pathname.includes('/cart')){
            increaseQuantity(count)
        }
    }
    const handleDecrementQuantity = () =>{
        if(count.quantity == 0 || count.quantity == 1){
            return;
        }
        setCount((prev) => {
            const newQuantity = (prev.quantity ?? 0) - 1;
            const newTotalPrice = newQuantity * product.price;
            return {
                ...prev,
                quantity: newQuantity,
                totalPrice: newTotalPrice
            };
        });
        if(window.location.pathname.includes('/cart')){
            decreaseQuantity(count)
        }
    }
    const handleOnChangeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        let qtyValue = e.target.value || "1";
        if (qtyValue === "" || qtyValue === undefined) {
            qtyValue = "1";
        }
        const newValue = parseInt(qtyValue);
        setCount((prev) => {
            const newQuantity = newValue;
            const newTotalPrice = newQuantity * product.price;
            
            return {
                ...prev,
                quantity: newQuantity,
                totalPrice: newTotalPrice
            };
        });
        if(window.location.pathname.includes('/cart')){
            getQuantity(count,newValue)
        }
        // setCount((prevCount) => ({ ...prevCount, quantity: newValue }));
        
    };
    
    return (
        <>
            <label>Quantity : </label>
            <div className="product-qty-wraper">
                <button className="button-minus" onClick={handleDecrementQuantity}>-</button>
                    <div className="qty_text"><input type="number" name="quantity" aria-label="Quantity" value={count.quantity} onChange={handleOnChangeQty}></input></div>
                <button className="button-plus" onClick={handleIncrementQuantity}>+</button>
            </div>
        </>
    )
}

export default QuantityInput;