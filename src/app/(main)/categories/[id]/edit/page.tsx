"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Params = Promise<{ id: string }>;

export default function EditCategoryPage(props: { params: Params }) {
    const params = use(props.params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/categories", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const category = response.data.data.find((c: any) => c.id == params.id || c.id == Number(params.id));

            if (category) {
                setName(category.name);
                setCurrentImage(category.image);
            } else {
                alert("التصنيف غير موجود");
                router.push("/categories");
            }
        } catch (error:any) {
            const status = error.response?.status;
            if (status === 401) {
                localStorage.removeItem("token");
                router.replace("/login");
                return;
            }
            console.error("Failed to fetch category", error);
            alert("فشل جلب بيانات التصنيف");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
                formData.append("name", name);

            if (image) {
                formData.append("image", image);
            }

            const token = localStorage.getItem("token");
            await api.post(`/dashboard/category/${params.id}/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            alert("تم تعديل التصنيف بنجاح!");
            router.push("/categories");
            router.refresh();
        } catch (err: any) {
            const status = err.response?.status;
            if (status === 401) {
                localStorage.removeItem("token");
                router.replace("/login");
                return;
            }
            console.error("Failed to update category", err);
            const msg =
                err?.response?.data?.message ||
                (err?.response?.data?.errors ? Object.values(err.response.data.errors).flat()[0] : null) ||
                "فشل تعديل التصنيف.";
            alert(msg);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-20">جاري التحميل...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    تعديل التصنيف
                </h1>
                <button
                    onClick={() => router.back()}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    إلغاء
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 space-y-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">اسم التصنيف</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-accent/30 border border-border/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all"
                    />
                </div>

                {/* Current Image Preview */}
                {currentImage && !image && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">الصورة الحالية</label>
                        <div className="w-32 h-32 rounded-xl overflow-hidden border border-border">
                            <img
                                src={currentImage.includes('localhost')
                                    ? currentImage.replace('http://localhost/', 'http://127.0.0.1:8000/')
                                    : currentImage}
                                alt="Current"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">تغيير الصورة</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer bg-accent/20 hover:bg-accent/40 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {image ? (
                                    <p className="text-sm text-secondary font-medium">{image.name}</p>
                                ) : (
                                    <>
                                        <svg className="w-8 h-8 mb-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-xs text-muted-foreground">اضغط لرفع صورة جديدة</p>
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />
                        </label>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {submitting ? "جاري الحفظ..." : "حفظ التعديلات"}
                </button>
            </form>
        </div>
    );
}
