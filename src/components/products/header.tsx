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
            const response = await api.post(`dashboard/product/${productId}/changeStatus`, {}, {
                headers: { Authorization: `Bearer ${token}`, },
            });
            alert(response.data);
            if (setFormData && formData) {
                setFormData({ ...formData, status: newStatus });
            }
        } catch (error: unknown) {
            const axiosError = error as { response?: { status?: number } };
            const status = axiosError?.response?.status;
            if (status === 401) {
                localStorage.removeItem("token");
                router.replace("/login");
            }
            setLocalStatus(!newStatus); // Revert on error
        } finally {
            setStatusLoading(false);
        }
    };

    return (
        <>
            {/* Header Top Section */}
            {/* Header Top Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3 lg:gap-4 w-full lg:w-auto">
                    <button
                        onClick={() => router.push('/')}
                        className="w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center rounded-xl bg-accent border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm group flex-shrink-0"
                    >
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                            {isEditMode ? "تعديل المنتج" : "إضافة منتج جديد"}
                        </h2>
                        <p className="text-xs lg:text-sm text-muted-foreground mt-1">
                            {isEditMode ? "قم بتحديث معلومات المنتج وحفظ التغييرات" : "أضف قطعة جديدة إلى مجموعتك المميزة"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto">
                    {/* Status Toggle Switch - Only in Edit Mode */}
                    {isEditMode && productId && (
                        <div className="flex items-center justify-between lg:justify-start gap-3 lg:ml-4 lg:pl-4 lg:border-l lg:border-border/50 p-3 lg:p-0 bg-accent/30 lg:bg-transparent rounded-lg lg:rounded-none order-2 lg:order-1">
                            <span className={`text-xs lg:text-sm font-medium ${localStatus ? "text-green-600" : "text-muted-foreground"}`}>
                                {localStatus ? "متوفر للعرض" : "غير متوفر"}
                            </span>
                            <button
                                onClick={handleStatusToggle}
                                disabled={statusLoading}
                                className={`relative w-12 h-7 lg:w-14 lg:h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex-shrink-0 ${localStatus ? "bg-green-500" : "bg-gray-200"
                                    }`}
                                aria-label="Toggle Product Status"
                            >
                                <span
                                    className={`absolute top-0.5 lg:top-1 left-0.5 lg:left-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${localStatus ? "translate-x-5 lg:translate-x-6" : "translate-x-0"
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

                    <div className="flex items-center gap-2 lg:gap-3 order-1 lg:order-2">
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="flex-1 lg:flex-none px-4 lg:px-5 py-2.5 rounded-xl border-2 border-border hover:bg-accent font-medium transition-all text-xs lg:text-sm"
                        >
                            إلغاء
                        </button>
                        <button
                            onClick={onSubmit}
                            disabled={loading}
                            className="flex-1 lg:flex-none px-5 lg:px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/30 text-white font-medium transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-xs lg:text-sm"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>{isEditMode ? "جاري الحفظ..." : "جاري النشر..."}</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </>
    )
}