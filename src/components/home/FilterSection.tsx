import Link from "next/link";
import { useState } from "react";

interface Category {
    id: string;
    label: string;
    icon: string;
}

interface FilterSectionProps {
    categories: Category[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export default function FilterSection({
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
}: FilterSectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const activeCategory = categories.find(cat => cat.id === selectedCategory);

    return (
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-border/50 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                {/* Category Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary/5 to-primary-light/5 hover:from-primary/10 hover:to-primary-light/10 rounded-xl border border-primary/20 transition-all duration-300 min-w-[200px] group"
                    >
                        <span className="text-2xl">{activeCategory?.icon}</span>
                        <div className="flex-1 text-right">
                            <div className="text-xs text-foreground/50 font-medium">الفئة</div>
                            <div className="text-sm font-bold text-foreground">{activeCategory?.label}</div>
                        </div>
                        <div className="flex items-center gap-2">

                            <svg
                                className={`w-4 h-4 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsOpen(false)}
                            ></div>
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-border/50 shadow-xl z-20 overflow-hidden max-h-[280px] overflow-y-auto custom-scrollbar">
                                {categories.map((cat) => {
                                    const isActive = selectedCategory === cat.id;

                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                setSelectedCategory(cat.id);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-5 py-3 transition-all duration-200 ${isActive
                                                    ? "bg-primary-dark text-white"
                                                    : "hover:bg-secondary-light hover:text-brandGreen"


                                                }`}
                                        >
                                            <span className="text-xl">{cat.icon}</span>
                                            <span className="flex-1 text-right text-sm font-medium">{cat.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                {/* Search & Add */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 lg:w-64">
                        <input
                            type="text"
                            placeholder="بحث سريع..."
                            className="w-full pl-4 pr-10 py-2.5 bg-accent/50 rounded-lg border border-border/30 focus:border-[#0f5943] focus:bg-white focus:ring-2 focus:ring-[#0f5943]/20 outline-none transition-all text-sm hover:border-[#0f5943]/40 hover:shadow-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors peer-focus:text-[#0f5943]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <Link href="/products/new" className="bg-gradient-to-r from-[#0f5943] to-[#0f5943]/80 hover:from-[#0f5943]/90 hover:to-[#0f5943]/70 hover:shadow-xl hover:shadow-[#0f5943]/30 text-white px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap font-medium text-sm hover:-translate-y-0.5 hover:scale-105 group">
                        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">منتج جديد</span>
                    </Link>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar {
                    direction: rtl;
                }
                .custom-scrollbar > * {
                    direction: ltr;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #0f5943, #d4af37);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #0f5943;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}