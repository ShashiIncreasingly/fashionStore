
import electronics from '../../img/electronics.jpg'
import ele from '../../img/ele.jpg'
import jwellery from '../../img/jwellery.jpg'
import fashion from '../../img/fashion.jpg'
import { Link } from 'react-router-dom'
import '../../components/HomeBanner/Hero.css'; 

export const Hero = ()=>{
    return (
        <>
            <div className="hero-text">
                <span className='hero-span'>high quality <p>product for your Loved ones</p> </span>
                <span className='hero-p'>Quality products imported from India, Japan, Europe and USA for boys and girls, also for Men's and Women's.</span>
                <button className='hero-shop-btn btn'><Link to={{ pathname: '/product-listing', search: 'param=all-category' }} className='hero-btn'>Shop Now</Link></button>
            </div>
            <div className="hero-image">
                <Link to={{ pathname: '/product-listing', search: 'param=all-category' }} >
                    <div className="hero-image-first">
                        <img src={fashion} alt='fashion'/>
                    </div>
                    <div className="hero-image-second">
                        <div className="hero-image-third">
                            <img src={electronics} alt='electronics'/>
                        </div>
                        <div className="hero-image-fourth">
                            <img src={ele} alt='electronics'/>
                        </div>
                        <div className="hero-image-fourth">
                            <img src={jwellery} alt='jwellery'/>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}
