"use client";

import { useEffect, useState } from "react";
import SideBarView from "@/components/products/sidebar_view";
import BasicInfo from "@/components/products/basic_info";
import ImagesTab from "@/components/products/Images_tab";
import Meassure from "@/components/products/measure";
import Price_Avaliabilty from "@/components/products/price_avali";
import Header from "@/components/products/header";
import { api } from "@/lib/api"

// Available sizes (38 to 50, increment by 2)


type Props = {
  initialData: any;
  onSubmit: any;
  isEditMode?: boolean;
  loading: boolean;
  productId?: string | null;
};

export default function ProductForm({ initialData, onSubmit, isEditMode = false, loading, productId = null }: Props) {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState(initialData);
  const [categories, setCategories] = useState<{ id: string; name: string, image: string }[]>([]);

  const tabs = [
    { id: "basic", label: "المعلومات الأساسية", icon: "📝" },
    { id: "images", label: "الصور", icon: "🖼️" },
    { id: "sizes", label: "المقاسات", icon: "📏" },
    { id: "pricing", label: "التسعير والطلب ", icon: "💰" },
  ];
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <Header
        isEditMode={isEditMode}
        onSubmit={() => onSubmit(formData)}
        loading={loading}
        productId={productId}
        formData={formData}
        setFormData={setFormData}
      />
      {/* Tabs */}
      <div className="bg-white rounded-xl p-2 border border-border/50 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${activeTab === tab.id
                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-md"
                : "text-muted-foreground hover:bg-accent/50"
                }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Tab */}
          <BasicInfo formData={formData} CATEGORIES={categories} activeTab={activeTab} setFormData={setFormData} />

          {/* Images Tab */}
          <ImagesTab formData={formData} activeTab={activeTab} setFormData={setFormData} />

          {/* Sizes Tab */}
          <Meassure activeTab={activeTab} formData={formData} setFormData={setFormData} />

          {/* Pricing & Stock Tab */}
          <Price_Avaliabilty activeTab={activeTab} formData={formData} setFormData={setFormData} />
        </div>

        {/* Sidebar - Preview */}
        <SideBarView formData={formData} />
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
