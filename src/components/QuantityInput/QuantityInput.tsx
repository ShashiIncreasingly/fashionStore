import React, { useState } from "react";
import { ProductsArray } from "../../data/DataType";
import "./QuantityInput.css"

const QuantityInput:React.FC<{product:ProductsArray}> = ({product}) => {
    product.quantity = 1;
    const [count, setCount] = useState(product)

    const handleIncrementQuantity = () =>{
        setCount((prev) => {
            const prevQuantity = prev.quantity ?? 0;
            return {
                ...prev,
                quantity: prevQuantity + 1
            }
        })
    }
    const handleDecrementQuantity = () =>{
        setCount((prev) => {
            const prevQuantity = prev.quantity ?? 0;
            return {
                ...prev,
                quantity: prevQuantity - 1
            }
        })
    }
    const handleOnChangeQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        let qtyValue = e.target.value;
        if (qtyValue === "" || qtyValue === undefined) {
            qtyValue = "1";
        }
        const newValue = parseInt(qtyValue);
        setCount((prevCount) => ({ ...prevCount, quantity: newValue }));
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