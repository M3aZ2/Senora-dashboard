'use client'

type ImageItem = {
    id?: string | number;
    url: string;
    file?: File;
    isNew?: boolean;
};

type FormData = {
    images: (string | ImageItem)[]
    name: string
    price: number
    description: string
    status: string | boolean
    orders: number
    availableSizes: number[]
    availableColors: string[]
    customSizeAvailable: boolean
    category: string
}

export default function SideBarView({ formData }: { formData: FormData }) {
    // Helper to extract URL from image item (string or object)
    const getImageUrl = (img: string | ImageItem | undefined) => {
        if (!img) return "";
        return typeof img === 'string' ? img : (img.url || "");
    };

    const mainImage = getImageUrl(formData.images?.[0]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm sticky top-6">
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border/30">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">👁️</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">معاينة المنتج</h3>
                </div>

                {/* Main Image */}
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 border-2 border-border bg-accent/20 flex items-center justify-center relative group">
                    {mainImage ? (
                        <>
                            <img
                                src={mainImage}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            {formData.images.length > 1 && (
                                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                    +{formData.images.length - 1} صور
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <span className="text-4xl block mb-2">📷</span>
                            <span className="text-sm">لا توجد صورة</span>
                        </div>
                    )}
                </div>

                {/* Thumbnail Gallery */}
                {formData.images?.length > 1 && (
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        {formData.images.slice(0, 4).map((img, idx) => (
                            <div
                                key={idx}
                                className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-border hover:border-secondary transition-all"
                            >
                                <img
                                    src={getImageUrl(img)}
                                    alt={`صورة ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                        {formData.images.length > 4 && (
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-border bg-accent/50 flex items-center justify-center">
                                <span className="text-xs font-bold text-muted-foreground">
                                    +{formData.images.length - 4}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Info */}
                <div className="space-y-3">
                    <h4 className="font-bold text-lg text-foreground line-clamp-2">
                        {formData.name || "اسم المنتج..."}
                    </h4>

                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-secondary">
                            {(Number(formData.price) || 0).toLocaleString('en-US')}
                        </span>
                        <span className="text-sm text-muted-foreground">$</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {formData.description || "وصف المنتج سيظهر هنا..."}
                    </p>

                    <div className="pt-3 border-t border-border/30 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">الحالة:</span>
                            <span className={`font-medium px-3 py-1 rounded-full text-xs ${formData.status == true
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}>
                                {formData.status == true ? "✅ متوفر" : "❌ غير متوفر"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">الطلبات السابقة:</span>
                            <span className="font-medium text-foreground">{formData.orders || 0} قطعة</span>
                        </div>

                        {/* Available Colors */}
                        {formData.availableColors?.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">🎨 الألوان المتوفرة:</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {formData.availableColors.map((color, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1.5 bg-secondary/10 text-secondary font-medium text-xs rounded-lg border border-secondary/20"
                                        >
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Available Sizes */}
                        {formData.availableSizes?.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">📐 المقاسات المتوفرة:</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {formData.availableSizes.map((size) => (
                                        <span
                                            key={size}
                                            className="inline-flex items-center justify-center min-w-[2.5rem] px-2.5 py-1.5 bg-accent/50 text-foreground font-bold text-xs rounded-lg border border-border"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom Size Badge */}
                        {formData.customSizeAvailable && (
                            <div className="flex items-center gap-2 p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                                <span className="text-lg">✂️</span>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-secondary">مقاس تفصيلي متاح</p>
                                    <p className="text-xs text-muted-foreground">يمكن تفصيل المنتج حسب المقاس</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Preview */}
                <div className="mt-4 pt-4 border-t border-border/30 space-y-2">

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-accent/30 rounded-lg p-2">
                            <p className="text-xs text-muted-foreground">الألوان</p>
                            <p className="text-sm font-bold text-foreground">
                                {formData.availableColors?.length || 0}
                            </p>
                        </div>
                        <div className="bg-accent/30 rounded-lg p-2">
                            <p className="text-xs text-muted-foreground">المقاسات</p>
                            <p className="text-sm font-bold text-foreground">
                                {formData.availableSizes?.length || 0}
                                {formData.customSizeAvailable && '+'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}