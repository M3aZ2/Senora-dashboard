"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);
    const router = useRouter();
    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/categories", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(response.data.data);
        } catch (error: unknown) {
            const axiosError = error as { response?: { status?: number } };
            const status = axiosError?.response?.status;
            if (status === 401) {
                localStorage.removeItem("token");
                router.replace("/login");
                return;
            }
            console.error("Failed to fetch categories", error);
            alert("فشل في تحميل التصنيفات");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                        إدارة التصنيفات
                    </h1>
                    <p className="text-muted-foreground mt-1">عرض وتعديل تصنيفات المتجر</p>
                </div>

                <div className="flex gap-3">
                    <Link
                        href="/"
                        className="bg-white border border-border/50 text-foreground hover:bg-accent/50 hover:text-primary px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 font-medium"
                    >
                        <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span>العودة</span>
                    </Link>

                    <Link
                        href="/categories/new"
                        className="bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/30 text-white px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold"
                    >
                        <span className="text-xl">+</span>
                        <span>إضافة تصنيف</span>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <p className="text-muted-foreground animate-pulse">جاري التحميل...</p>
                </div>
            ) : categories.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-border">
                    <p className="text-muted-foreground text-lg">لا توجد تصنيفات حالياً</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categories.map((cat: any) => (
                        <Link
                            key={cat.id}
                            href={`/categories/${cat.id}/edit`}
                            className="group bg-white rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer w-full aspect-square relative"
                        >
                            {/* Image Area (Square) */}
                            <div className="absolute inset-0 bg-accent/30 overflow-hidden">
                                {cat.image ? (
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl">
                                        📦
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                    <div className="bg-white/90 backdrop-blur text-primary p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Bottom Name Bar */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                                    <h3 className="font-bold text-base text-white text-center drop-shadow line-clamp-2">
                                        {cat.name}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}