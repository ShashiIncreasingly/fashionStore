import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetApiCategory from "../../utilities/GetCategoryCall";
import { useMediaQuery } from "@react-hook/media-query";
import "../../components/Nav/NavBars.css"
import { useCartContext } from "../../context/CartContext";

const NavBars: React.FC = () => {
    const [categoryArray, setCategoryArray] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('Home');
    const { cart, totalPrice, clearCart, deleteFromCart,increaseQuantity,  decreaseQuantity,  setTotalPrice, } = useCartContext();
    let cartCount=cart.length??0
    const [showCart, setShowCart] = useState(false)
    const isTabletOrMobile: boolean = useMediaQuery('(max-width: 900px)');

    const CategoryData = async () => {
        const respcategory = await GetApiCategory('https://fakestoreapi.com/products/categories')
        setCategoryArray(respcategory)
    }
    useEffect(() =>{
        CategoryData()
    }, [])
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
        document.querySelector('.nav-bar--category-ul')?.classList.remove('active')
        document.querySelector('.navbar')?.classList.remove('active')
        document.querySelector('body')?.classList.remove('menu-open')
    }
    const onMouseEnter = ()=> {
        document.querySelector('.nav-bar--category-ul')?.classList.add('active')
    }
    const onMouseLeave = ()=> {
        document.querySelector('.nav-bar--category-ul')?.classList.remove('active')
    }
    const handlemenuClick = () => {
        document.querySelector('.navbar')?.classList.toggle('active')
        document.querySelector('body')?.classList.toggle('menu-open')
    }
    const handleCloseMenu = () => {
        document.querySelector('.navbar')?.classList.remove('active')
        document.querySelector('body')?.classList.remove('menu-open')
    }
    return (
        <header>
        
            <nav className="navbar nav-bar-conatainer navbar-expand-lg">
                    <div className="navbar-brand">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" onClick={handlemenuClick}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link className={activeCategory === 'brand' ? 'brand nav-link active' : 'brand nav-link'} to={'/'} onClick={() => handleCategoryClick('brand')}></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        
                        <div className="navbar-nav">
                            <div className="close-menu" onClick={handleCloseMenu}></div>
                            <Link className={activeCategory === 'Home' ? 'nav-link home active' : 'nav-link home'} aria-current="page" to={'/'} onClick={() => handleCategoryClick('Home')}>Home</Link>
                            <div className="category-nav-bar-wrap">
                                <div className="nav-bar-category" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>Category</div>
                                <ul className="nav-bar--category-ul" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                                    <li className="nav-bar--category-li">
                                        <Link className={activeCategory === 'all-category' ? 'nav-link active' : 'nav-link'} aria-current="page" to={{ pathname: '/product-listing', search:'param=all-category' }} onClick={() => handleCategoryClick('all-category')}>All Categories</Link>
                                    </li>
                                    {
                                        categoryArray.map((catg, index) => {
                                            return (
                                                <li key={index} className="nav-bar--category-li">
                                                    <Link className={activeCategory === catg ? 'nav-link active' : 'nav-link'} aria-current="page" to={{ pathname: '/product-listing', search: `param=${catg}` }} onClick={() => handleCategoryClick(catg)}>{catg}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="cart-nav-header">
                            <Link className={activeCategory === 'Cart' ? 'nav-link cart-btn active' : 'nav-link cart-btn'} to={'/cart'} onClick={() => handleCategoryClick('Cart')}>Cart<span className="cart-container"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg><span className="cart-value">{cartCount}</span></span></Link>
                        </div>
                    </div>
                </nav>
        </header>
    )
} 

export default NavBars;