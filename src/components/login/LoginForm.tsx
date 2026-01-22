"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

import { useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // reset error state
        setError(false);
        setErrorMessage("");

        setLoading(true);

        try {
            const res = await api.post("auth/login", {
                email,
                password,
            });
            const token = res?.data?.token;
            if (token) {
                localStorage.setItem("token", token);
            }
            router.push("/");
            router.refresh();
        } catch (err: any) {
            const msgFromApi =
                err?.response?.data?.errors && Object.values(err.response.data.errors)[0]|| err?.response?.data?.message
                "فشل تسجيل الدخول. تأكد من البريد وكلمة المرور.";

            setError(true);
            setErrorMessage(String(msgFromApi));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/3 pointer-events-none animate-pulse-slow"></div>
            <div
                className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 pointer-events-none"
                style={{
                    animation: "pulse-slow 4s ease-in-out infinite",
                    animationDelay: "1s",
                }}
            ></div>

            {/* Mobile Logo */}
            <div className="lg:hidden absolute top-8 right-8">
                <div className="group transform transition-all duration-300 hover:scale-105">
                    <div className="relative">
                        {/* Glow */}
                        <div className="absolute inset-0 bg-secondary/30 blur-lg rounded-full transition-all"></div>

                        {/* Logo container */}
                        <div className="relative w-16 h-16 bg-gradient-to-br from-secondary via-secondary-light to-secondary rounded-full overflow-hidden rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center shadow-xl border-2 border-secondary-light/30">
                            <Image
                                src="/favicon.ico"
                                alt="Senora Logo"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-md space-y-8 z-10 animate-fade-in-up">
                {/* Header */}
                <div className="text-center lg:text-right space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                        تسجيل الدخول
                    </h2>
                    <p className="text-muted-foreground">أهلاً بك مجدداً في لوحة التحكم</p>
                </div>

                {/* ✅ Form (صار form حقيقي ليدعم Enter) */}
                <form className="space-y-6" onSubmit={handleLogin}>
                    {/* ✅ Error Box */}
                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-right">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-red-600">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v4m0 4h.01M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
                                        />
                                    </svg>
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold text-red-700">تعذر تسجيل الدخول</p>
                                    <p className="text-sm text-red-700/90 mt-1">
                                        {errorMessage || "حدث خطأ غير متوقع."}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setError(false);
                                            setErrorMessage("");
                                        }}
                                        className="mt-2 text-xs font-medium text-red-700 hover:underline"
                                    >
                                        إخفاء الرسالة
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="space-y-2 group">
                        <label className="text-sm font-semibold text-primary flex items-center gap-2">
                            <span>البريد الإلكتروني</span>
                            <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-border bg-white hover:border-secondary/30 focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none text-foreground placeholder:text-muted-foreground"
                                placeholder="admin@alseniora.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2 group">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-primary flex items-center gap-2">
                                <span>كلمة المرور</span>
                                <span className="text-secondary">*</span>
                            </label>

                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-border bg-white hover:border-secondary/30 focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none text-foreground placeholder:text-muted-foreground"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors"
                            >
                                {showPassword ? (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full bg-gradient-to-l from-primary via-primary-light to-primary hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>جاري التحميل...</span>
                            </div>
                        ) : (
                            <>
                                <span className="relative z-10">تسجيل الدخول</span>
                                <svg
                                    className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
