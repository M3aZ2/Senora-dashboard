"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ResetPasswordModal({ isOpen, onClose }: Props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Visibility states
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("كلمة المرور الجديدة غير متطابقة");
            return;
        }

        if (newPassword.length < 8) {
            setError("يجب أن تكون كلمة المرور 8 أحرف على الأقل");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            await api.post("/auth/reset_password", {
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("تم تغيير كلمة المرور بنجاح");
            onClose();
            // Reset fields
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            localStorage.removeItem("token");
            router.push("/login");
        } catch (err: any) {
            const status = err?.response?.status;
            if (status === 401) {
                localStorage.removeItem("token");
                router.replace("/login");
            }
            const msg = err?.response?.data?.message ||
                (err?.response?.data?.errors ? Object.values(err.response.data.errors).flat()[0] : null) ||
                "فشل تغيير كلمة المرور. تأكد من كلمة المرور القديمة.";
            setError(String(msg));
        } finally {
            setLoading(false);
        }
    };

    const toggleIcon = (isVisible: boolean, onClick: () => void) => (
        <button
            type="button"
            onClick={onClick}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
        >
            {isVisible ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            )}
        </button>
    );

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center isolate">
            {/* Overlay - ensuring it covers everything */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="relative z-[10000] w-full max-w-md p-4 animate-scale-in">
                <div
                    className="bg-white rounded-2xl shadow-2xl border border-white/20 w-full max-h-[85vh] flex flex-col overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-border/50 flex items-center justify-between shrink-0">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                            إعادة تعيين كلمة المرور
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-6 overflow-y-auto custom-scrollbar">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-700 text-sm p-4 rounded-xl border border-red-100 flex items-center gap-3 animate-fade-in">
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/80">كلمة المرور القديمة</label>
                                <div className="relative">
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border/50 focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-accent/20 focus:bg-white text-right font-sans"
                                        placeholder="••••••••"
                                        dir="ltr"
                                    />
                                    {toggleIcon(showOldPassword, () => setShowOldPassword(!showOldPassword))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground/80">كلمة المرور الجديدة</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border/50 focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-accent/20 focus:bg-white text-right font-sans"
                                            placeholder="••••••••"
                                            dir="ltr"
                                        />
                                        {toggleIcon(showNewPassword, () => setShowNewPassword(!showNewPassword))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground/80">تأكيد كلمة المرور</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border/50 focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-accent/20 focus:bg-white text-right font-sans"
                                            placeholder="••••••••"
                                            dir="ltr"
                                        />
                                        {toggleIcon(showConfirmPassword, () => setShowConfirmPassword(!showConfirmPassword))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-border font-bold text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-300"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active:scale-95"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>جاري الحفظ...</span>
                                        </>
                                    ) : (
                                        "حفظ التغييرات"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
