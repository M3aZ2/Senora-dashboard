"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProductGrid({ products, categories }) {
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-gradient-to-br from-accent/20 to-accent/40 rounded-3xl border-2 border-dashed border-border/50">
                <div className="text-6xl mb-4 animate-bounce">📭</div>
                <h3 className="text-xl font-bold text-foreground mb-2">لا توجد منتجات</h3>
                <p className="text-muted-foreground">جرب تغيير الفلتر أو البحث</p>
            </div>
        );
    }

    // Handle image rotation on hover
    const handleMouseEnter = (productId, images) => {
        setHoveredProduct(productId);
        if (images && images.length > 1) {
            let index = 0;
            const interval = setInterval(() => {
                index = (index + 1) % images.length;
                setCurrentImageIndex(prev => ({ ...prev, [productId]: index }));
            }, 1500); // Change image every 1500ms

            // Store interval ID to clear later
            setCurrentImageIndex(prev => ({ ...prev, [`${productId}_interval`]: interval }));
        }
    };

    const handleMouseLeave = (productId) => {
        setHoveredProduct(null);
        // Clear interval
        const intervalId = currentImageIndex[`${productId}_interval`];
        if (intervalId) {
            clearInterval(intervalId);
        }
        // Reset to first image
        setCurrentImageIndex(prev => {
            const newState = { ...prev };
            delete newState[productId];
            delete newState[`${productId}_interval`];
            return newState;
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
                // Assume product has an images array, fallback to single image
                const images = product.images || [product.image];
                const currentIndex = currentImageIndex[product.id] || 0;

                return (
                    <Link
                        href={`/products/${product.id}/edit`}
                        key={product.id}
                        className="group relative bg-white rounded-2xl overflow-hidden border border-border/30 hover:border-[#0f5943]/30 hover:shadow-2xl hover:shadow-[#0f5943]/10 transition-all duration-500 hover:-translate-y-2 block cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(product.id, images)}
                        onMouseLeave={() => handleMouseLeave(product.id)}
                    >
                        {/* Image Section */}
                        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-accent/30 to-accent/10">
                            {/* Image Stack with Fade Transition */}
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${product.name} - ${idx + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                                        idx === currentIndex
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-105'
                                    } ${hoveredProduct === product.id ? 'group-hover:scale-110' : ''}`}
                                    loading="lazy"
                                    style={{
                                        transitionProperty: 'opacity, transform',
                                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                />
                            ))}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl shadow-lg transition-all duration-300 ${
                                    product.status === "متاح"
                                        ? "bg-emerald-500/90 text-white ring-2 ring-emerald-400/50"
                                        : product.status === "نفد من المخزون"
                                            ? "bg-red-500/90 text-white ring-2 ring-red-400/50"
                                            : "bg-amber-500/90 text-white ring-2 ring-amber-400/50"
                                }`}>
                                    {product.status}
                                </span>
                            </div>

                            {/* Image Counter - Show if multiple images */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex gap-1">
                                        {images.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`h-1 rounded-full transition-all duration-300 ${
                                                    idx === currentIndex
                                                        ? "w-6 bg-white"
                                                        : "w-1 bg-white/40"
                                                }`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Edit Icon - Appears on Hover */}
                            <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm text-[#0f5943] px-4 py-2.5 rounded-xl font-medium text-sm shadow-xl">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    تعديل
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 space-y-4">
                            {/* Product Name */}
                            <h3 className="font-bold text-lg text-foreground group-hover:text-[#0f5943] transition-colors line-clamp-2 min-h-[3.5rem]">
                                {product.name}
                            </h3>

                            {/* Price & Category Row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm text-muted-foreground font-medium">$</span>
                                    <span className="text-2xl font-extrabold bg-gradient-to-r from-[#0f5943] to-[#d4af37] bg-clip-text text-transparent">
                                        {product.price}
                                    </span>
                                </div>

                                <div className="text-xs font-medium text-[#0f5943] bg-[#0f5943]/10 px-2.5 py-1 rounded-lg">
                                    {categories.find(c => c.id === product.category)?.label || 'غير محدد'}
                                </div>
                            </div>

                            {/* Info Cards */}
                            <div className="flex items-center gap-2">
                                {/* Orders */}
                                <div className="flex-1 bg-gradient-to-br from-[#0f5943]/5 to-[#0f5943]/10 rounded-xl p-3 border border-[#0f5943]/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] text-[#0f5943] font-medium mb-0.5">الطلبات</div>
                                            <div className="text-lg font-extrabold text-[#0f5943]">{product.sales || 0}</div>
                                        </div>
                                        <div className="text-2xl">📦</div>
                                    </div>
                                </div>

                                {/* Colors */}
                                <div className="flex-1 bg-gradient-to-br from-[#d4af37]/5 to-[#d4af37]/10 rounded-xl p-3 border border-[#d4af37]/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] text-[#d4af37] font-medium mb-0.5">الألوان</div>
                                            <div className="text-lg font-extrabold text-[#d4af37]">{product.colors?.length || 3}</div>
                                        </div>
                                        <div className="text-2xl">🎨</div>
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div className="flex-1 bg-gradient-to-br from-[#0f5943]/5 to-[#0f5943]/10 rounded-xl p-3 border border-[#0f5943]/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] text-[#0f5943] font-medium mb-0.5">المقاسات</div>
                                            <div className="text-lg font-extrabold text-[#0f5943]">{product.sizes?.length || 6}</div>
                                        </div>
                                        <div className="text-2xl">📏</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </Link>
                );
            })}

            <style jsx global>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(-5%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }

                .animate-bounce {
                    animation: bounce 1s infinite;
                }
            `}</style>
        </div>
    );
}