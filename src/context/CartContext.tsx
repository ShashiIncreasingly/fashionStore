import React, { createContext, Reducer, useContext, useEffect, useReducer } from 'react';
import useLocalStorage from '../hook/useLocalStorage';
import { ICart, ProductsArray } from '../data/DataType';
import cartReducer from './CartReducer';
import coponData from '../data/copon.json';



const initialState: ICart = {
  totalPrice: 0,
  products: [],
};

const CartContext = createContext<any>(initialState);

interface IProps {
  children: React.ReactNode;
}
const CartContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispath] = useReducer<Reducer<ICart, any>>(cartReducer, initialState);
  const { getStorage, setStorage } = useLocalStorage();
  const cartStorageData = getStorage('SHOP_CART');
  console.log('state.products - ', state.products.length)
  if (cartStorageData && !state.products.length) {
    setStorage('SHOP_CART', cartStorageData);
    state.products = cartStorageData
  }
  const addToCart = (productData: ProductsArray, quantity: number = 1): void => {
    const { products } = state;
    // add count to the new product and set it to 1 as default
    if (products.find((product) => product.id === productData.id)) {
      const product: ProductsArray | undefined = products.find((product) => product.id === productData.id);
      if(product?.quantity){
          product!.quantity += quantity;
      }
      const newState = products.filter((newProduct) => newProduct.id !== product?.id);
      setStorage('SHOP_CART', [...newState, product]);
      dispath({ type: 'SET_CART', payload: [...newState, product] });
    } else {
      // if allready have count and added to cart, add one to count
      productData.quantity = quantity;
      const cartData = getStorage('SHOP_CART');
      setStorage('SHOP_CART', [...cartData, productData]);
      dispath({ type: 'ADD_TO_CART', payload: [...products, productData] });
    }
  };

  const deleteFromCart = (item: ProductsArray): void => {
    dispath({ type: 'REMOVE_FROM_CART', payload: item.id });
    // delete from local storage
    const cartCopy = { ...state };
    const filterdCart = cartCopy.products.filter((product) => product.id !== item.id);
    setStorage('SHOP_CART', filterdCart);
  };

  const increaseQuantity = (item: ProductsArray): void => {
    dispath({ type: 'INCRESE_COUNT', payload: item.id });
    const newProducts = state.products.map((productItem) => {
      if (productItem.id === item.id) {
        return { ...productItem, quantity: (item.quantity ?? 0) + 1 };
      }
      return productItem;
    });
    setStorage('SHOP_CART', newProducts);
};

  const decreaseQuantity = (item: ProductsArray): void => {
    dispath({ type: 'DECRESE_COUNT', payload: item.id });
    const newProducts = state.products.map((productItem) => {
      if (productItem.id === item.id) {
        return { ...productItem, quantity: (item.quantity ?? 0) - 1 };
      }
      return productItem;
    });
    setStorage('SHOP_CART', newProducts);
    if ((item.quantity ?? 0) <= 1) {
      deleteFromCart(item);
    }
  };

  const clearCart = () => {
    dispath({ type: 'CLEAR_CART' });
    setStorage('SHOP_CART', []);
  };
  const setTotalPrice = (price: number): void => {
    dispath({ type: 'SET_TOTAL_PRICE', payload: price });
  };
  useEffect(() => {
    const localCopon = getStorage('DISCOUNT_COPON');
    let totalPrice: any = state.products
      .reduce((prev, item) => (prev += (item.price - (item.price * (item.discountPercent ?? 0)) / 100) * (item.quantity ?? 0)), 0)
      .toFixed(2);
    if (localCopon.percent > 0) {
      for (const cop in coponData) {
        if (cop === localCopon.text) {
          const discount: any = ((totalPrice * localCopon.percent) / 100).toFixed(2);
          totalPrice = (+totalPrice - +discount).toFixed(2);
        }
      }
    }
    setTotalPrice(totalPrice);
  }, [state.products]);

  return (
    <CartContext.Provider
      value={{
        cart: state.products,
        totalPrice: state.totalPrice,
        dispath,
        clearCart,
        addToCart,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        setTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

interface IReducer {
  cart: ProductsArray[];
  totalPrice: number;
  dispath: ({ type, payload }: { type: string; payload: any }) => void;
  addToCart: (productData: ProductsArray, quantity: number) => void;
  deleteFromCart: (item: ProductsArray) => void;
  increaseQuantity: (item: ProductsArray) => void;
  decreaseQuantity: (item: ProductsArray) => void;
  setTotalPrice: (price: number) => void;
  clearCart: () => void;
}
const useCartContext = (): IReducer => useContext(CartContext);

export default CartContext;
export { CartContextProvider, useCartContext };
