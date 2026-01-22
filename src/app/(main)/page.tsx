"use client";

import { useState, useEffect } from "react";
import WelcomeBanner from "@/components/home/WelcomeBanner";
import FilterSection from "@/components/home/FilterSection";
import ProductGrid from "@/components/home/ProductGrid";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";


export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<{ id: string; label: string; icon: string }[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  // reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/categories", {
          headers: { Authorization: `Bearer ${token}`, },
        });
        const mappedCategories = response.data.data.map((cat: any) => ({
          id: cat.id,
          label: cat.name,
          icon: "🏷️",
        }));
        setCategories([{ id: "all", label: "الكل", icon: "🌟" }, ...mappedCategories]);
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        const status = axiosError?.response?.status;
        if (status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
        console.error("Failed to fetch categories", error);
        setCategories([{ id: "all", label: "الكل", icon: "🌟" }]);
      }
    };
    fetchCategories();
  }, []);

  // Search Function
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        if (searchTerm) {
          formData.append('search', searchTerm);
        }
        if (selectedCategory !== 'all') {
          formData.append('category', selectedCategory);
        }

        // Add pagination param
        const response = await api.post(`/search?page=${currentPage}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const rawProducts = response.data?.products?.data || [];
        const meta = response.data?.products?.meta;

        if (meta) {
          setTotalPages(meta.last_page);
        }

        const mappedProducts = rawProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.categories?.[0]?.id || "",
          status: p.is_active ? "متاح" : "غير متاح",
          stock: 10,
          sales: p.orders_count || 0,
          colors: p.colors || [],
          sizes: p.sizes || [],
          image: p.images?.[0]?.url || null,
          images: p.images?.map((img: any) => img.url) || []
        }));

        setProducts(mappedProducts);

      } catch (error: unknown) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, currentPage]);


  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 450, behavior: 'smooth' });
    }
  };

  const displayProducts = products;

  return (
    <div className="space-y-6 pb-12">
      <WelcomeBanner />

      <FilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {loading ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">جاري البحث...</p>
        </div>
      ) : (
        <>
          <ProductGrid
            products={displayProducts}
            categories={categories}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 dir-ltr">
              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                title="الصفحة الأولى"
              >
                <span className="text-lg">«</span>
              </button>

              {/* Previous Page */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                title="الصفحة السابقة"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-border/50 shadow-sm mx-2">
                <span className="text-sm font-medium text-muted-foreground">صفحة</span>
                <span className="text-lg font-bold text-primary min-w-[1.5rem] text-center">{currentPage}</span>
                <span className="text-sm font-medium text-muted-foreground">من</span>
                <span className="text-lg font-bold text-foreground min-w-[1.5rem] text-center">{totalPages}</span>
              </div>

              {/* Next Page */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Last Page */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                title="الصفحة الأخيرة"
              >
                <span className="text-lg">»</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}