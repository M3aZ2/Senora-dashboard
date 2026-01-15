'use client'
import { useState } from 'react'

type FormData={
    images:string[]
    name:string
    price:number
    description:string
    status:string
    orders:number
    availableSizes:number[]
    availableColors:string[]
    customSizeAvailable:boolean
    category:string
}

type Props={
    activeTab:string
    formData:FormData
    setFormData:any
}

const AVAILABLE_SIZES = Array.from({ length: 11 }, (_, i) => 30 + i * 2);

export default function Meassure({activeTab,formData,setFormData}:Props) {
    const [colorInput, setColorInput] = useState('');

    const toggleSize = (size:number) => {
        setFormData(prev => ({
            ...prev,
            availableSizes: prev.availableSizes.includes(size)
                ? prev.availableSizes.filter(s => s !== size)
                : [...prev.availableSizes, size].sort((a, b) => a - b)
        }));
    };

    const addColor = () => {
        if (colorInput.trim() && !formData.availableColors?.includes(colorInput.trim())) {
            setFormData(prev => ({
                ...prev,
                availableColors: [...(prev.availableColors || []), colorInput.trim()]
            }));
            setColorInput('');
        }
    };

    const removeColor = (color: string) => {
        setFormData(prev => ({
            ...prev,
            availableColors: prev.availableColors.filter(c => c !== color)
        }));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addColor();
        }
    };

    return (
        <>
            {activeTab === "sizes" && (
                <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm space-y-6 animate-fade-in">
                    <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-xl">📏</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">المقاسات والألوان</h3>
                            <p className="text-xs text-muted-foreground">حدد المقاسات والألوان المتاحة للطلب</p>
                        </div>
                    </div>

                    {/* Available Colors */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🎨</span>
                            <label className="block text-sm font-semibold text-foreground">الألوان المتوفرة</label>
                        </div>

                        {/* Color Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={colorInput}
                                onChange={(e) => setColorInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="اكتب اسم اللون (مثال: أحمر، أزرق، بيج...)"
                                className="flex-1 px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-white"
                            />
                            <button
                                type="button"
                                onClick={addColor}
                                disabled={!colorInput.trim()}
                                className="px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 disabled:bg-border disabled:cursor-not-allowed transition-all"
                            >
                                إضافة +
                            </button>
                        </div>

                        {/* Colors List */}
                        {formData.availableColors?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.availableColors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="group inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border-2 border-secondary/20 rounded-xl hover:border-secondary/40 transition-all"
                                    >
                                        <span className="font-medium text-secondary">{color}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeColor(color)}
                                            className="w-5 h-5 rounded-full bg-secondary/20 hover:bg-secondary text-secondary hover:text-white flex items-center justify-center transition-all"
                                        >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {(!formData.availableColors || formData.availableColors.length === 0) && (
                            <div className="text-center py-6 px-4 bg-accent/20 rounded-xl border-2 border-dashed border-border">
                                <span className="text-3xl block mb-2">🎨</span>
                                <p className="text-sm text-muted-foreground">لم يتم إضافة أي ألوان بعد</p>
                                <p className="text-xs text-muted-foreground mt-1">اكتب اسم اللون واضغط إضافة أو Enter</p>
                            </div>
                        )}
                    </div>

                    {/* Standard Sizes */}
                    <div className="space-y-4 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📐</span>
                            <label className="block text-sm font-semibold text-foreground">المقاسات القياسية</label>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-3">
                            {AVAILABLE_SIZES.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => toggleSize(size)}
                                    className={`aspect-square rounded-xl border-2 font-bold transition-all hover:scale-105 ${formData.availableSizes.includes(size)
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

                    {/* Summary */}
                    <div className="bg-accent/30 rounded-xl p-4 border border-border/30">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">ℹ️</span>
                            <div className="flex-1 space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1">ملخص الألوان</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formData.availableColors?.length > 0 ? (
                                            <>الألوان المتوفرة: {formData.availableColors.join("، ")}</>
                                        ) : (
                                            "لم يتم تحديد أي ألوان بعد"
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1">ملخص المقاسات</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formData.availableSizes.length > 0 ? (
                                            <>المقاسات المتوفرة: {formData.availableSizes.join("، ")}</>
                                        ) : (
                                            "لم يتم تحديد أي مقاسات بعد"
                                        )}
                                        {formData.customSizeAvailable && " + مقاس تفصيلي"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}