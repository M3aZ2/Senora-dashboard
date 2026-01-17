"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    category: number;
    description: string;
    status: boolean;
    availableSizes: number[];
    customSizeAvailable: boolean;
    images: ImageItem[];
    availableColors: string[];
    stock: string;
};

const INITIAL_DATA: ProductFormData = {
    name: "",
    price: 0,
    category: 2, // Default category ID, adjust as needed
    description: "",
    status: true,
    availableSizes: [],
    customSizeAvailable: false,
    images: [],
    availableColors: [],
    stock: "",
};

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: ProductFormData) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", String(data.price));
            formData.append("category_id", String(data.category));
            formData.append("description", data.description);
            formData.append("custom_tailoring", data.customSizeAvailable ? "1" : "0");

            // New products are usually created as active/available by default, 
            // but if the API expects status/is_active:
            // The user removed is_active from update, but might need it here?
            // "The user wants to implement the 'Create New Product' functionality ... linking it to the API endpoint shown in the provided Postman screenshot."
            // Postman screenshot does NOT show 'is_active' or 'status'. 
            // I will omit it unless required.

            // Arrays
            if (data.availableSizes && data.availableSizes.length > 0) {
                data.availableSizes.forEach(size => formData.append("sizes[]", String(size)));
            }
            if (data.availableColors && data.availableColors.length > 0) {
                data.availableColors.forEach(color => formData.append("colors[]", color));
            }

            // Images
            if (data.images && data.images.length > 0) {
                data.images.forEach((img, index) => {
                    // For new product, we expect files for all images
                    if (img.file) {
                        formData.append(`media[${index}]`, img.file);
                    }
                });
            }

            const token = localStorage.getItem("token");

            await api.post("/dashboard/product", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            alert("تم إضافة المنتج بنجاح!");
            router.push("/");
            router.refresh();
        } catch (err: any) {
            console.error("Failed to create product", err);
            const msg =
                err?.response?.data?.message ||
                (err?.response?.data?.errors ? Object.values(err.response.data.errors).flat()[0] : null) ||
                "فشل إضافة المنتج.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return <ProductForm initialData={INITIAL_DATA} onSubmit={handleSubmit} loading={loading} isEditMode={false} />;
}
