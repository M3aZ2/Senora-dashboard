import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";

type Props = {
    isEditMode: boolean
    loading: boolean
    onSubmit: any
    formData?: any
    setFormData?: any
    productId?: string | null
}

export default function Header({ isEditMode, onSubmit, loading, formData, setFormData, productId }: Props) {
    const router = useRouter();
    const [statusLoading, setStatusLoading] = useState(false);
    // Use local state for immediate UI feedback, initialize from formData if available
    const [localStatus, setLocalStatus] = useState<boolean>(formData?.status ?? true);

    const handleStatusToggle = async () => {
        if (!productId) return;

        const newStatus = !localStatus;
        setLocalStatus(newStatus); // Optimistic update
        setStatusLoading(true);

        try {
            const token = localStorage.getItem("token",);
            const response =await api.post(`dashboard/product/${productId}/changeStatus`,{},{
                headers: { Authorization: `Bearer ${token}`, },
            });
            alert(response.data);
            if (setFormData && formData) {
                setFormData({ ...formData, status: newStatus });
            }
        } catch (error) {
            setLocalStatus(!newStatus); // Revert on error
            alert(error?.response?.data?.message ||"حدث خطأ");
        } finally {
            setStatusLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 bg-white rounded-xl p-6 border border-border/50 shadow-sm">
            {/* Header Top Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm group"
                    >
                        <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
                    {/* Status Toggle Switch - Only in Edit Mode */}
                    {isEditMode && productId && (
                        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border/50">
                            <span className={`text-sm font-medium ${localStatus ? "text-green-600" : "text-muted-foreground"}`}>
                                {localStatus ? "متوفر للعرض" : "غير متوفر"}
                            </span>
                            <button
                                onClick={handleStatusToggle}
                                disabled={statusLoading}
                                className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${localStatus ? "bg-green-500" : "bg-gray-200"
                                    }`}
                                aria-label="Toggle Product Status"
                            >
                                <span
                                    className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${localStatus ? "translate-x-6" : "translate-x-0"
                                        }`}
                                >
                                    {statusLoading ? (
                                        <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                    ) : (
                                        localStatus ? (
                                            <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )
                                    )}
                                </span>
                            </button>
                        </div>
                    )}


                    <button
                        type="button"
                        onClick={() => router.push('/')}
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
        </div>
    )
}