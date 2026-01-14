"use client";

import { useState } from "react";
import ProductForm from "@/components/products/ProductForm";

const MOCK_DATA = {
    name: "فستان سهرة ملكي",
    price: 450000,
    category: "dresses",
    description: "فستان سهرة طويل بتصميم ملكي فاخر، مصنوع من أجود أنواع الحرير والدانتيل.",
    status: "available",
    availableSizes: [38, 40, 42, 44],
    customSizeAvailable: true,
    images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&h=800&fit=crop",
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&h=800&fit=crop",
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600&h=800&fit=crop",
    ],
    stock: 15,
};

export default function EditProductPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("تم حفظ التغييرات بنجاح!");
        }, 1500);
    };

    return <ProductForm initialData={MOCK_DATA} onSubmit={handleSubmit} isEditMode={true} loading={loading} />;
}