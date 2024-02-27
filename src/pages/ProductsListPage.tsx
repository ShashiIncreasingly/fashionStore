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
    // const getCategoryProducts = (products: ProductsArray[], param: string | null) => {
    //     return products.filter(activeproducts => activeproducts.category === param);
    // }
    useEffect(() => {
        setLoading(true)
        getAllProducts();
    }, [URL])
    if(loading){
        return(
            <>
                <Loader />
            </>
        )
    }
    return (
        <div className="product-listing">
            <div className="product-list-container">
            { 
                activeproducts.map((product) => {
                    return (
                        <div key={product.id} className="product-list-item">
                            <ProductCard key={product.id} product={product} />
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default ProductListPage;