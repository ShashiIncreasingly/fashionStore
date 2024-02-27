import React from "react";
import { Hero } from "../components/HomeBanner/Hero";
import { FeaturedProduct } from "../components/HomeBanner/FeaturedProduct";

export function HomePage() {
    return (
        <>
            <div className="hero-container">
                <Hero />
            </div>
            <div className="featured-container">
                <FeaturedProduct />
            </div>
        </>
    )
} 