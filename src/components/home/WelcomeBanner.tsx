"use client";

import { useState, useEffect } from "react";

const WELCOME_SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
        title: "أهلاً بك في لوحة التحكم",
        subtitle: "إدارة متجرك بكل سهولة وفخامة"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&auto=format&fit=crop",
        title: "السنيورة للأزياء",
        subtitle: "حيث الأناقة تلتقي بالابتكار"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1920&auto=format&fit=crop",
        title: "تجربة إدارة استثنائية",
        subtitle: "كل ما تحتاجه في مكان واحد"
    }
];

export default function WelcomeBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % WELCOME_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary via-primary-light to-primary-dark group">
            {WELCOME_SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/85 to-primary-dark/95"></div>

                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-32 h-32 border-2 border-secondary/30 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-20 h-20 bg-secondary/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>

                    <div className="relative h-full flex flex-col items-center justify-center text-center px-8 lg:px-12">
                        {/* Logo */}
                        <div className="mb-8 group-hover:scale-110 transition-transform duration-500">
                            <div className="relative">
                                <div className="absolute inset-0 bg-secondary/30 blur-2xl rounded-full"></div>
                                <div className="relative w-24 h-24 bg-gradient-to-br from-secondary via-secondary-light to-secondary rounded-2xl rotate-3 flex items-center justify-center shadow-2xl border-2 border-secondary-light/30 overflow-hidden">
                                    <img src="/favicon.ico" alt="Logo" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                                {slide.title}
                            </h2>

                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>

                            <p className="text-xl lg:text-2xl text-white/90 font-light">
                                {slide.subtitle}
                            </p>

                            {/* Decorative Quote */}
                            <div className="pt-6">
                                <p className="text-secondary/80 text-sm italic">
                                    "حيث الأناقة تصنع الفرق"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {WELCOME_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "bg-secondary w-8"
                            : "bg-white/30 w-1.5 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
