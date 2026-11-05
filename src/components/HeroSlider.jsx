"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function HeroSlider() {
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop",
            badge: "Cinematic Soundstages",
            title: "Produce Your Vision in World-Class Film Studios",
            subtext: "Book soundproof cyc walls, cinema gear setups, and high-ceiling stages across Bangladesh with instant approval.",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
            badge: "Acoustic Audio Lounges",
            title: "Crystal-Clear Sound for Music & Podcasting",
            subtext: "Explore acoustically calibrated vocal booths, podcast lounges with Shure setups, and master-level control rooms.",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=1600&auto=format&fit=crop",
            badge: "Daylight Photo Lofts",
            title: "Natural Daylight & Professional Strobes Combined",
            subtext: "Elevate your editorial, fashion, and commercial photography shoots in sun-drenched lofts with full studio amenities.",
        },
    ];

    return (
        <section className="relative w-full bg-black">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                effect="fade"
                speed={1000}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                loop={true}
                className="w-full h-[540px] md:h-[620px]"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            />
                            <div className="absolute inset-0 bg-black/65" />

                            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
                                <span className="badge badge-primary text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 px-3 py-3 border border-primary/40 bg-primary/20 text-amber-300">
                                    {slide.badge}
                                </span>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">
                                    {slide.title}
                                </h1>
                                <p className="text-sm md:text-lg text-gray-200 max-w-2xl leading-relaxed mb-8 drop-shadow-sm">
                                    {slide.subtext}
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <Link
                                        href="/studios"
                                        className="btn btn-primary px-8 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
                                    >
                                        Explore Studios
                                    </Link>
                                    <Link
                                        href="/studios"
                                        className="btn btn-outline border-white text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all"
                                    >
                                        Host Your Space
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}