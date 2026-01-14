"use client";

import { useState, useMemo } from "react";
import WelcomeBanner from "@/components/home/WelcomeBanner";
import StatsGrid from "@/components/home/StatsGrid";
import FilterSection from "@/components/home/FilterSection";
import ProductGrid from "@/components/home/ProductGrid";
import DeleteModal from "@/components/home/DeleteModal";

// Optimized Product Data
const INITIAL_PRODUCTS = [
  { id: 1, name: "فستان سهرة ملكي", price: 1200, category: "dresses", status: "متاح", stock: 12, sales: 45, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&h=500&fit=crop" },
  { id: 2, name: "فستان خطوبة ذهبي", price: 2500, category: "dresses", status: "مبيعات عالية", stock: 5, sales: 89, image: "https://images.unsplash.com/photo-1612833603922-5e6d4e41dad7?q=80&w=400&h=500&fit=crop" },
  { id: 3, name: "بنطال قماش أسود", price: 350, category: "pants", status: "متاح", stock: 25, sales: 32, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=400&h=500&fit=crop" },
  { id: 4, name: "بلوزة حريرية بيضاء", price: 450, category: "blouses", status: "متاح", stock: 18, sales: 28, image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=400&h=500&fit=crop" },
  { id: 5, name: "فستان سهرة أحمر", price: 1100, category: "dresses", status: "متاح", stock: 8, sales: 56, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=400&h=500&fit=crop" },
  { id: 6, name: "طقم رسمي نسائي", price: 1500, category: "suits", status: "متاح", stock: 10, sales: 41, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=400&h=500&fit=crop" },
  { id: 7, name: "بنطال جينز عصري", price: 250, category: "pants", status: "متاح", stock: 30, sales: 67, image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=400&h=500&fit=crop" },
  { id: 8, name: "كنزة صوفية كاكي", price: 300, category: "blouses", status: "نفد من المخزون", stock: 0, sales: 94, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400&h=500&fit=crop" },
  { id: 9, name: "فستان كاجوال أنيق", price: 650, category: "dresses", status: "متاح", stock: 15, sales: 38, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&h=500&fit=crop" },
  { id: 10, name: "جاكيت جلد فاخر", price: 1800, category: "suits", status: "متاح", stock: 7, sales: 22, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&h=500&fit=crop" },
  { id: 11, name: "تنورة كلاسيكية", price: 380, category: "pants", status: "متاح", stock: 20, sales: 51, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=400&h=500&fit=crop" },
  { id: 12, name: "بلوزة مطرزة فاخرة", price: 520, category: "blouses", status: "مبيعات عالية", stock: 9, sales: 73, image: "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?q=80&w=400&h=500&fit=crop" },
];

const CATEGORIES = [
  { id: 'all', label: 'الكل', icon: '📦' },
  { id: 'dresses', label: 'فساتين', icon: '👗' },
  { id: 'pants', label: 'بناطيل', icon: '👖' },
  { id: 'blouses', label: 'كنزات', icon: '👚' },
  { id: 'suits', label: 'أطقم', icon: '🎽' },
  { id: 'other', label: 'غير ذلك', icon: '🔹' },
];

export default function Home() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setShowDeleteModal(null);
  };

  // Memoized filtered products for performance
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Quick Stats
  const stats = useMemo(() => ({
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === "متاح").length,
    outOfStock: products.filter(p => p.status === "نفد من المخزون").length,
    totalSales: products.reduce((sum, p) => sum + p.sales, 0)
  }), [products]);

  return (
    <div className="space-y-6 pb-12">
      <WelcomeBanner />

      <StatsGrid stats={stats} />

      <FilterSection
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        products={products}
      />

      <ProductGrid
        products={filteredProducts}
        categories={CATEGORIES}
        setShowDeleteModal={setShowDeleteModal}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}