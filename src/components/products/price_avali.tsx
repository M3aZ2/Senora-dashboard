'use client'
type Props={
    activeTab:string
    formData:FormData
    setFormData:any
}
export default function Price_Avaliabilty({activeTab,formData,setFormData}:Props) {
    return (
        <>
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
                                    <span className="text-sm font-bold text-foreground">$</span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                السعر المعروض: {(Number(formData.price) || 0).toLocaleString('en-US')} $
                            </p>
                        </div>

                        {/* Order Count (Read Only) */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-foreground">
                                عدد الطلبات <span className="text-muted-foreground">(للعرض فقط)</span>
                            </label>

                            <input
                                type="number"
                                value={formData.order_count ?? 0}
                                readOnly
                                disabled
                                className="w-full px-4 py-3 border-2 border-border rounded-xl bg-muted/50 text-muted-foreground cursor-not-allowed"
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
        </>
    )
}