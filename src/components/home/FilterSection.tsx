import Link from "next/link";
import { useState } from "react";

export default function FilterSection({
                                          categories,
                                          selectedCategory,
                                          setSelectedCategory,
                                          searchTerm,
                                          setSearchTerm,
                                          products
                                      }) {
    const [isOpen, setIsOpen] = useState(false);

    const activeCategory = categories.find(cat => cat.id === selectedCategory);
    const activeCount = selectedCategory === 'all'
        ? products.length
        : products.filter(p => p.category === selectedCategory).length;

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
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                                {activeCount}
                            </span>
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
                                    const count = cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length;
                                    const isActive = selectedCategory === cat.id;

                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                setSelectedCategory(cat.id);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-5 py-3 transition-all duration-200 ${
                                                isActive
                                                    ? "bg-gradient-to-r from-primary to-primary-light text-white"
                                                    : "hover:bg-accent/50 text-foreground"
                                            }`}
                                        >
                                            <span className="text-xl">{cat.icon}</span>
                                            <span className="flex-1 text-right text-sm font-medium">{cat.label}</span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                isActive
                                                    ? "bg-white/25 text-white"
                                                    : "bg-primary/10 text-primary"
                                            }`}>
                                                {count}
                                            </span>
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
                            className="w-full pl-4 pr-10 py-2.5 bg-accent/50 rounded-lg border border-border/30 focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <Link href="/products/new" className="bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/30 text-white px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap font-medium text-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    background: linear-gradient(to bottom, var(--primary), var(--primary-light));
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: var(--primary);
                }
            `}</style>
        </div>
    );
}