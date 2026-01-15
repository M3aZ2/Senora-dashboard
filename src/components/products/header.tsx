'use client'

import {useRouter} from "next/navigation";
type Props={
    isEditMode: boolean
    loading: boolean
    onSubmit:any
}
export default function Header({isEditMode,onSubmit,loading}:Props)
{
    const router = useRouter();
    return (
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
    )
}