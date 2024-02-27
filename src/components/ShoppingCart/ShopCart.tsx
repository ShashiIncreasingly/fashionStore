import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";

export const ShopCart = () => {
    const { cart, totalPrice, clearCart, deleteFromCart,increaseQuantity,  decreaseQuantity,  setTotalPrice, } = useCartContext();
    const [showCart, setShowCart] = useState(false)
    
}