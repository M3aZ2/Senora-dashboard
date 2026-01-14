"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";

const INITIAL_DATA = {
    name: "",
    price: "",
    category: "dresses",
    description: "",
    status: "available",
    availableSizes: [],
    customSizeAvailable: false,
    images: [],
    stock: "",
};

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("تم إضافة المنتج بنجاح!");
            router.push("/");
        }, 1500);
    };

    return <ProductForm initialData={INITIAL_DATA} onSubmit={handleSubmit} loading={loading} />;
}
