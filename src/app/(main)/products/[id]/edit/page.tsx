"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { api } from "@/lib/api";

type ImageItem = {
    id?: string | number;
    url: string;
    file?: File;
    isNew?: boolean;
};

type ProductFormData = {
    name: string;
    price: number;
    categories: number[];
    description: string;
    status: boolean;
    availableSizes: number[];
    customSizeAvailable: boolean;
    images: ImageItem[];
    availableColors: string[]
    ulid?: string;
    order_count?: number;
};

function normalizeProductToFormData(raw: any): ProductFormData {
    const p = raw?.data ?? raw;
    // Normalizing images to ensure they are objects with ID and URL
    const normalizedImages = Array.isArray(p?.images)
        ? p.images.map((img: any) => {
            const imageUrl = typeof img === 'string' ? img : (img.url || img.image || "");
            return {
                id: img.id,
                url: imageUrl,
                isNew: false
            };
        })
        : [];

    return {
        name: p?.name ?? "",
        price: Number(p?.price ?? 0),
        categories: Array.isArray(p?.categories)
            ? p.categories.map((c: any) => (typeof c === 'object' ? c.id : c))
            : (p?.category_id ? [p.category_id] : []),
        description: p?.description ?? "",
        status: p?.is_active ?? true,
        availableSizes: Array.isArray(p?.sizes)
            ? p.sizes.map((x: any) => Number(x))
            : Array.isArray(p?.sizes)
                ? p.sizes.map((x: any) => Number(x))
                : [],
        customSizeAvailable: Boolean(
            p?.custom_tailoring
        ),
        images: normalizedImages,
        availableColors: Array.isArray(p?.colors) ? p.colors : [],
        ulid: p?.ulid,
        order_count: p?.orders_count,
    };
}

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();

    const productId = useMemo(() => params?.id, [params]);

    const [initialData, setInitialData] = useState<ProductFormData | null>(null);
    const [pageLoading, setPageLoading] = useState(true);

    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            setPageLoading(true);
            setErrorMsg(null);

            try {
                const token = localStorage.getItem("token");
                const res = await api.get(`/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}`, },
                });
                setInitialData(normalizeProductToFormData(res.data));
            } catch (err: any) {
                const status = err.response?.status;
                if (status === 401) {
                    localStorage.removeItem("token");
                    setErrorMsg("انتهت الجلسة، يرجى تسجيل الدخول.");
                    router.replace("/login");
                    return;
                }
                setErrorMsg(String("تعذر تحميل بيانات المنتج. تأكد من المعرف."));
                setInitialData(null);
            } finally {
                setPageLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    // ✅ حفظ التعديلات (تحديث المنتج)
    const handleSubmit = async (data: ProductFormData) => {
        if (!productId) return;

        setSaving(true);
        setErrorMsg(null);

        try {
            const formData = new FormData();

            // Basic fields
            formData.append("name", data.name);
            formData.append("price", String(data.price));
            data.categories.forEach(id => formData.append("categories[]", String(id)));
            formData.append("description", data.description);
            // Status is handled separately now
            formData.append("custom_tailoring", data.customSizeAvailable ? "1" : "0");

            // Arrays
            data.availableSizes.forEach(size => formData.append("sizes[]", String(size)));
            data.availableColors.forEach(color => formData.append("colors[]", color));

            // Images Logic
            data.images.forEach((img) => {
                if (img.isNew && img.file) {
                    formData.append(`media[]`, img.file);
                } else if (img.id && !img.isNew) {
                    formData.append("wanted_media[]", String(img.id));
                }
            });

            const token = localStorage.getItem("token");
            await api.post(`dashboard/product/${productId}/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert("تم حفظ التغييرات بنجاح!");
            router.refresh();
        } catch (err: any) {
            const status = err.response?.status;
            if (status === 401) {
                localStorage.removeItem("token");
                setErrorMsg("انتهت الجلسة، يرجى تسجيل الدخول.");
                router.replace("/login");
                return;
            }
            const msg =
                err?.response?.data?.message || (err?.response?.data?.errors ? Object.values(err.response.data.errors).flat()[0] : null) ||
                "فشل حفظ التغييرات.";
            setErrorMsg(String(msg));
        } finally {
            setSaving(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="p-6">
                <div className="rounded-xl border border-border bg-white p-6">
                    <p className="text-muted-foreground">جاري تحميل بيانات المنتج...</p>
                </div>
            </div>
        );
    }

    if (errorMsg && !initialData) {
        return (
            <div className="p-6">
                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <p className="font-bold text-red-700">حدث خطأ</p>
                    <p className="text-red-700/90 mt-2">{errorMsg}</p>

                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={() => router.refresh()}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white"
                        >
                            إعادة المحاولة
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="px-4 py-2 rounded-lg border border-red-200 text-red-700"
                        >
                            رجوع
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {errorMsg && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-right">
                    <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
            )}
            {initialData && (
                <ProductForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    isEditMode={true}
                    loading={saving}
                    productId={productId}
                />
            )}
        </div>
    );
}
