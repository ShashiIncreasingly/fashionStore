import { ProductsArray } from "../data/DataType"
import { useLocation,useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import { CurrencyFormatter } from "../utilities/CurrencyFormater";



export const ProductPage:React.FC = () => {
    const location = useLocation();
    const products:ProductsArray = location.state.product
    const ProductDetailsHTML = () => {
        return (
            <div className="product-detail-container">
                <div className="product-quality">
                    <div className="about-details-text">About Product</div>
                    <div className="meta-info"><div className="meta-desc">100% Original Products</div></div>
                    <div className="meta-info"><div className="meta-desc">Pay on delivery might be available</div></div>
                    <div className="meta-info"><div className="meta-desc">Easy 10 days returns and exchanges</div></div>
                    <div className="meta-info"><div className="meta-desc">Try & Buy might be available</div></div>
                </div>
                <div className="best-offer">BEST OFFERS</div>
                <ul className="product-discount">
                    <li>Coupon Discount: 20% off <span>(Your total saving: Rs. 7120)</span></li>
                    <li>Applicable on: Orders above Rs. 700 <span>(only on first purchase)</span></li>
                    <li>Coupon code: <span>HELLO2024</span></li>
                </ul>
            </div>
        )
    }
    return (
        <>
            <div className="product-page-container">
                {
                    products.id && <ProductCard product={products} />
                } 
                <ProductDetailsHTML />
            </div>
            <div className="product-description-container">
                <div className="product-description-title">Description</div>
                <div className="product-description-text">{products.description}</div>
            </div>
        </>
    )
}