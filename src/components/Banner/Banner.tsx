import { CurrencyFormatter } from "../../utilities/CurrencyFormater"
import '../../components/Banner/Banner.css'

export const Banner = () => {
    return (
        <div className="site-top-banner-container">
            <div className="banner-text-block">
                <div className="site-extra-text">10% EXTRA</div> <div className="light-banner-text">on any order of min {CurrencyFormatter(500)}</div> <div>Use promo code  </div><div className="promo-code">"NEW2024"</div><div className="light-banner-text"> Valid until 29 Dec.</div>
            </div>
        </div>
    )
}