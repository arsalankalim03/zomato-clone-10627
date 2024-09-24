import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import NutritionCarouselCard from "./NutritionCarouselCard";

const NutritionCarousel = () => {
    const [categories, setCategories] = useState([
        {
            image:
                "https://www.health.com/thmb/_DYgwq--vjqksw29Wyi4R3osi3c=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/dymatize-iso100-whey-protein-powder-edc7878460354c63bfc653eed9a6bfce.jpg?output-format=webp",
            title: "Protien & Fitness",
        },
        {
            image:
                "https://dote.zmtcdn.com/prod/data/admin_assets/images/de47fcc91ced4e33b354909e897456e8_1628243615.png?output-format=webp",
            title: "Sleep & stress",
        },
        {
            image:
                "https://dote.zmtcdn.com/prod/data/admin_assets/images/89fdc1246c12461db02d853a513ab616_1628243591.png?output-format=webp",
            title: "Digestion & Weight Loss",
        },
        {
            image:
                "https://inlifehealthcare.com/cdn/shop/files/inlife-fish-oil-omega-3-fatty-acids-supplement-500mg-60-capsules-748909.jpg",
            title: "Omegas & CoQ10",
        },
        {
            image:
                "https://5.imimg.com/data5/SELLER/Default/2022/8/LV/UO/TG/118668560/beauty-skin-care-products-500x500.jpg",
            title: "Beauty & Skin Care",
        },
        {
            image:
                "https://purenutrition.in/cdn/shop/products/VitaminD3K2Productimages_2.jpg?v=1685960728&width=1445",
            title: "Immunity & Bones",
        },
    ]);

    const slideConfig = {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
        },
        modules: [Navigation],
        className: "diningSwiper",
        navigation: true,
    };

    return (
        <>
            <div className="lg:hidden grid grid-cols-2 gap-2">
                {categories.map((each, index) => (
                    <NutritionCarouselCard key={index} {...each} />
                ))}
            </div>
            <div className="hidden lg:block">
                <Swiper {...slideConfig}>
                    {categories.map((each, index) => (
                        <SwiperSlide key={index}>
                            <NutritionCarouselCard {...each} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default NutritionCarousel;