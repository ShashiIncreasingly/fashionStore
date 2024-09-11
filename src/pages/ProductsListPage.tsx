import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ProductsArray } from "../data/DataType";
import GetProductsApi from "../utilities/GetProductsApi";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader/Loader";
const ProductListPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const param = searchParams.get('param');
    const [products, setProducts] = useState<ProductsArray[]>([]);
    const [activeproducts, setActiveProducts] = useState<ProductsArray[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [optionChange, setOptionChange] = useState<string>('')

    let URL = 'https://fakestoreapi.com/products/';
    if(param !== "all-category"){
        URL = `https://fakestoreapi.com/products/category/${param}`;
    }
    const getAllProducts = async () => {
        const data: ProductsArray[] = await GetProductsApi(URL)

        setProducts(data)
        setActiveProducts(data)
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        getAllProducts();
    }, [URL])

    const handleInputChange = debounce((value: string) => {
        // if (value.length > 3) {
            setSearchQuery(value);
            console.log('value', value);
            var productsarray=[]
            if(value !== ""){
                const productSearched = products.filter((product) => product.title.toLowerCase().includes(value.toLowerCase()));
                // productsarray.push(productSearched)
                if(productSearched.length !== 0){
                    setActiveProducts(productSearched)
                }else{
                    setActiveProducts([])
                }
            }else{
                setActiveProducts(products)
            }
        // }
    }, 300); // 300ms debounce delay

    function debounce(func: (value: string) => void, delay: number) {
        let timeoutId: NodeJS.Timeout;
        return (value: string) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(value);
            }, delay);
        };
    }

    // Usage
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e.target.value);
    };
    const sortPrice = (value: string) => {
        let productSort: ProductsArray[] = [];
        if(value === "default"){
            productSort = activeproducts.sort((a, b) => (a.id - b.id))
        }else if(value === "accending"){
            productSort = activeproducts.sort((a, b) => (a.price - b.price))
        }else if(value === "descending"){
            productSort = activeproducts.sort((a, b) => (b.price - a.price))
        }
        setActiveProducts(productSort)
        console.log('activeproducts -',activeproducts)
        setOptionChange(value)
    }
    // const getCategoryProducts = (products: ProductsArray[], param: string | null) => {
    //     return products.filter(activeproducts => activeproducts.category === param);
    // }
    
    if(loading){
        return(
            <>
                <Loader />
            </>
        )
    }
    return (
        <>
            <div className="filter-container"><div className="search-prod"><input className="search-input" type="text" placeholder="Search by Product mame ..." onChange={(e) => handleInputChange(e.target.value)} /></div><div className="sort-by-block"><select onChange={(e) => sortPrice(e.target.value)}><option value="default">Default</option><option value="accending">Low to High</option><option value="descending">High to Low</option></select></div></div>
            <div className="product-listing">
                <div className="product-list-container">
                {!activeproducts.length ? (
                    <div className="no-product-found">No Products Found</div>
                ) : (
                    activeproducts.map((product) => (
                        <div key={product.id} className="product-list-item">
                            <ProductCard key={product.id} product={product} />
                        </div>
                    ))
                )}
                </div>
            </div>
        </>
    )
}

export default ProductListPage;