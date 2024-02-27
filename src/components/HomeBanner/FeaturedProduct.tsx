
import { Link } from 'react-router-dom'
import GetApiCategory from '../../utilities/GetCategoryCall'
import { useEffect, useState } from 'react'
import { ProductsArray } from '../../data/DataType';
import Loader from '../Loader/Loader'
import GetProductsApi from '../../utilities/GetProductsApi';
import '../../components/HomeBanner/FeaturedProduct.css'; 
import ProductCard from '../ProductCard/ProductCard';
export const FeaturedProduct:React.FC = ()=>{
    const [products, setProducts] = useState<ProductsArray[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const getMinProducts = async () => {
        try {
            const response = await GetProductsApi('https://fakestoreapi.com/products?limit=3')
            const data: ProductsArray[] = await response;
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    useEffect(() => {
        setLoading(true);
        getMinProducts();
    }, []);
    if(loading){
        return(
            <>
                <Loader />
            </>
        )
    }
    return (
        <>
            <div className="featured-text">
                <h2>featured products</h2>
            </div>
            <div className="underline"></div>
            <div className="featured-prod-container">
                <div className="featured-prod-list">
                    {
                        products.map((product) => {
                        return ( 
                                <div className='product-card' key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='featured-all-prod'>
                <Link to={{ pathname: '/product-listing', search: 'param=all-category' }}><button className='featured-btn'>All Products</button></Link>
            </div>
        </>
    )
}
