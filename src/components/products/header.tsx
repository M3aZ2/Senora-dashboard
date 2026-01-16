'use client'

import { useRouter } from "next/navigation";

type Props = {
    isEditMode: boolean
    loading: boolean
    onSubmit: any
    formData?: any
    setFormData?: any
}

export default function Header({ isEditMode, onSubmit, loading, formData, setFormData }: Props) {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-4 bg-white rounded-xl p-6 border border-border/50 shadow-sm">
            {/* Header Top Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm group"
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

            {/* Status Toggle Section */}
            {formData && setFormData && (
                <div className="pt-4 border-t border-border/30">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <span className="text-xl">📦</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground">حالة المنتج</h3>
                                <p className="text-xs text-muted-foreground">تحديد توفر المنتج للعملاء</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, status: true })}
                                className={`flex-1 sm:flex-none px-5 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                                    formData.status === true
                                        ? "border-green-500 bg-green-50 shadow-md shadow-green-500/20"
                                        : "border-border hover:border-green-500/50 bg-white"
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                    formData.status === true ? "bg-green-500 scale-110" : "bg-accent"
                                }`}>
                                    <span className="text-lg">✅</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-foreground text-sm">متوفر</div>
                                    <div className="text-xs text-muted-foreground hidden sm:block">متاح للشراء</div>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, status: false })}
                                className={`flex-1 sm:flex-none px-5 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                                    formData.status === false
                                        ? "border-red-500 bg-red-50 shadow-md shadow-red-500/20"
                                        : "border-border hover:border-red-500/50 bg-white"
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                    formData.status === false ? "bg-red-500 scale-110" : "bg-accent"
                                }`}>
                                    <span className="text-lg">❌</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-foreground text-sm">غير متوفر</div>
                                    <div className="text-xs text-muted-foreground hidden sm:block">غير متاح حالياً</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}