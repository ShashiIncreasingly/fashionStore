import React from "react";
import { Rating } from "../../data/DataType";
import '../../components/Rating/Rating.css'; 


export const RatingComponent : React.FC<{ rating: Rating }> = ({rating}) => {

    return (
        <>
            {rating && rating.rate && rating.count && (
            <>
                <div><div className={`product_ratings_block rating_${rating.rate.toString().replace('.', '-')}`}><span className="rating_count">({rating.count})</span><span className="rating_stars"></span></div></div>
            </>
            )}
        </>
    )
}