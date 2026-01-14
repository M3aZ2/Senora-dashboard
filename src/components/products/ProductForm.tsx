"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Available sizes (38 to 50, increment by 2)
const AVAILABLE_SIZES = Array.from({ length: 7 }, (_, i) => 38 + i * 2);

const CATEGORIES = [
    { id: "dresses", label: "فساتين سهرة", icon: "👗" },
    { id: "wedding", label: "فساتين زفاف", icon: "💍" },
    { id: "engagement", label: "فساتين خطوبة", icon: "💐" },
    { id: "casual", label: "فساتين كاجوال", icon: "👚" },
];

export default function ProductForm({ initialData, onSubmit, isEditMode = false, loading }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("basic");
    const [formData, setFormData] = useState(initialData);

    const toggleSize = (size) => {
        setFormData(prev => ({
            ...prev,
            availableSizes: prev.availableSizes.includes(size)
                ? prev.availableSizes.filter(s => s !== size)
                : [...prev.availableSizes, size].sort((a, b) => a - b)
        }));
    };

    const addImage = () => {
        const newImage = prompt("أدخل رابط الصورة:");
        if (newImage) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, newImage]
            }));
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const tabs = [
        { id: "basic", label: "المعلومات الأساسية", icon: "📝" },
        { id: "images", label: "الصور", icon: "🖼️" },
        { id: "sizes", label: "المقاسات", icon: "📏" },
        { id: "pricing", label: "التسعير والمخزون", icon: "💰" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-border/50 hover:bg-accent hover:border-secondary/30 transition-all shadow-sm group"
                    >
                        <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                            {isEditMode ? "تعديل المنتج" : "إضافة منتج جديد"}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {isEditMode ? "قم بتحديث معلومات المنتج وحفظ التغييرات" : "أضف قطعة جديدة إلى مجموعتك المميزة"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 rounded-xl border-2 border-border hover:bg-accent font-medium transition-all text-sm"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/30 text-white font-medium transition-all disabled:opacity-70 flex items-center gap-2 text-sm"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>{isEditMode ? "جاري الحفظ..." : "جاري النشر..."}</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isEditMode ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    )}
                                </svg>
                                <span>{isEditMode ? "حفظ التغييرات" : "نشر المنتج"}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl p-2 border border-border/50 shadow-sm">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${activeTab === tab.id
                                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-md"
                                : "text-muted-foreground hover:bg-accent/50"
                                }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Tab */}
                    {activeTab === "basic" && (
                        <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm space-y-6 animate-fade-in">
                            <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <span className="text-xl">📝</span>
                                </div>
                                <h3 className="text-lg font-bold text-foreground">المعلومات الأساسية</h3>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        اسم المنتج <span className="text-secondary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-white"
                                        placeholder="مثال: فستان سهرة ملكي"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        الوصف <span className="text-secondary">*</span>
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-white resize-none"
                                        placeholder="اكتب وصفاً تفصيلياً وجذاباً للمنتج..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        التصنيف <span className="text-secondary">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {CATEGORIES.map((cat) => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, category: cat.id })}
                                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${formData.category === cat.id
                                                    ? "border-secondary bg-secondary/5 shadow-sm"
                                                    : "border-border hover:border-secondary/30 hover:bg-accent/30"
                                                    }`}
                                            >
                                                <span className="text-2xl">{cat.icon}</span>
                                                <span className="font-medium text-sm">{cat.label}</span>
                                                {formData.category === cat.id && (
                                                    <svg className="w-5 h-5 text-secondary mr-auto" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Images Tab */}
                    {activeTab === "images" && (
                        <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm space-y-6 animate-fade-in">
                            <div className="flex items-center justify-between pb-4 border-b border-border/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <span className="text-xl">🖼️</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">صور المنتج</h3>
                                        <p className="text-xs text-muted-foreground">أضف صور عالية الجودة للمنتج</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addImage}
                                    className="px-4 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary font-medium transition-all text-sm flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    إضافة صورة
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-border hover:border-secondary/50 transition-all">
                                            <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Image Controls */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-xl flex items-center justify-center gap-2">
                                            {index === 0 && (
                                                <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
                                                    الرئيسية
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all flex items-center justify-center"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Add More Button */}
                                <button
                                    type="button"
                                    onClick={addImage}
                                    className="aspect-[3/4] rounded-xl border-2 border-dashed border-border hover:border-secondary/50 hover:bg-secondary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-secondary"
                                >
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="text-sm font-medium">إضافة صورة</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Sizes Tab */}
                    {activeTab === "sizes" && (
                        <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm space-y-6 animate-fade-in">
                            <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <span className="text-xl">📏</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">المقاسات المتوفرة</h3>
                                    <p className="text-xs text-muted-foreground">حدد المقاسات المتاحة للطلب</p>
                                </div>
                            </div>

                            {/* Standard Sizes */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-foreground">المقاسات القياسية</label>
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                                    {AVAILABLE_SIZES.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => toggleSize(size)}
                                            className={`aspect-square rounded-xl border-2 font-bold transition-all ${formData.availableSizes.includes(size)
                                                ? "border-secondary bg-secondary text-white shadow-md"
                                                : "border-border hover:border-secondary/50 text-foreground hover:bg-accent/30"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Size Option */}
                            <div className="pt-4 border-t border-border/30">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, customSizeAvailable: !formData.customSizeAvailable })}
                                    className="flex items-center justify-between w-full p-4 rounded-xl border-2 border-border hover:border-secondary/30 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${formData.customSizeAvailable ? "bg-secondary/10" : "bg-accent"
                                            }`}>
                                            <span className="text-2xl">✂️</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-foreground">مقاس تفصيلي (حسب الطلب)</div>
                                            <div className="text-xs text-muted-foreground">إمكانية تفصيل المنتج حسب مقاسات العميلة</div>
                                        </div>
                                    </div>
                                    <div className={`w-14 h-8 rounded-full transition-all relative ${formData.customSizeAvailable ? "bg-secondary" : "bg-border"
                                        }`}>
                                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${formData.customSizeAvailable ? "right-1" : "right-7"
                                            }`}></div>
                                    </div>
                                </button>
                            </div>

                            {/* Selected Sizes Summary */}
                            <div className="bg-accent/30 rounded-xl p-4 border border-border/30">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">ℹ️</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground mb-1">ملخص المقاسات</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formData.availableSizes.length > 0 ? (
                                                <>المقاسات المتوفرة: {formData.availableSizes.join(", ")}</>
                                            ) : (
                                                "لم يتم تحديد أي مقاسات بعد"
                                            )}
                                            {formData.customSizeAvailable && " + مقاس تفصيلي"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pricing & Stock Tab */}
                    {activeTab === "pricing" && (
                        <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm space-y-6 animate-fade-in">
                            <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <span className="text-xl">💰</span>
                                </div>
                                <h3 className="text-lg font-bold text-foreground">التسعير والمخزون</h3>
                            </div>

                            <div className="space-y-5">
                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        السعر <span className="text-secondary">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full px-4 py-3 pr-24 border-2 border-border rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-white"
                                            placeholder="0"
                                        />
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-accent px-3 py-1.5 rounded-lg border border-border/50">
                                            <span className="text-lg">🇸🇾</span>
                                            <span className="text-sm font-bold text-foreground">ل.س</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        السعر المعروض: {(Number(formData.price) || 0).toLocaleString('ar-SY')} ليرة سورية
                                    </p>
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-foreground">
                                        الكمية المتوفرة <span className="text-secondary">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-white"
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-semibold mb-3 text-foreground">
                                        حالة المنتج <span className="text-secondary">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, status: "available" })}
                                            className={`p-4 rounded-xl border-2 transition-all ${formData.status === "available"
                                                ? "border-green-500 bg-green-50"
                                                : "border-border hover:border-green-500/50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.status === "available" ? "bg-green-500" : "bg-accent"
                                                    }`}>
                                                    <span className="text-2xl">✅</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-foreground text-sm">متوفر</div>
                                                    <div className="text-xs text-muted-foreground">المنتج متاح للشراء</div>
                                                </div>
                                            </div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, status: "unavailable" })}
                                            className={`p-4 rounded-xl border-2 transition-all ${formData.status === "unavailable"
                                                ? "border-red-500 bg-red-50"
                                                : "border-border hover:border-red-500/50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.status === "unavailable" ? "bg-red-500" : "bg-accent"
                                                    }`}>
                                                    <span className="text-2xl">❌</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-foreground text-sm">غير متوفر</div>
                                                    <div className="text-xs text-muted-foreground">المنتج غير متاح حالياً</div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar - Preview */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm sticky top-6">
                        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border/30">
                            <span className="text-xl">👁️</span>
                            <h3 className="text-lg font-bold text-foreground">معاينة المنتج</h3>
                        </div>

                        {/* Main Image */}
                        <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 border-2 border-border bg-accent/20 flex items-center justify-center">
                            {formData.images.length > 0 ? (
                                <img
                                    src={formData.images[0]}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <span className="text-4xl block mb-2">📷</span>
                                    <span className="text-sm">لا توجد صورة</span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-lg text-foreground line-clamp-2">
                                {formData.name || "اسم المنتج..."}
                            </h4>

                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-secondary">
                                    {(Number(formData.price) || 0).toLocaleString('ar-SY')}
                                </span>
                                <span className="text-sm text-muted-foreground">ل.س</span>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {formData.description || "وصف المنتج سيظهر هنا..."}
                            </p>

                            <div className="pt-3 border-t border-border/30 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">الحالة:</span>
                                    <span className={`font-medium ${formData.status === "available" ? "text-green-600" : "text-red-600"
                                        }`}>
                                        {formData.status === "available" ? "✅ متوفر" : "❌ غير متوفر"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">المخزون:</span>
                                    <span className="font-medium">{formData.stock || 0} قطعة</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">المقاسات:</span>
                                    <span className="font-medium">{formData.availableSizes.length} مقاس</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">الصور:</span>
                                    <span className="font-medium">{formData.images.length} صورة</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
}
