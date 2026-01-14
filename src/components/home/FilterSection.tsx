import Link from "next/link";

export default function FilterSection({
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    products
}) {
    return (
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-border/50 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat.id
                                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/30"
                                : "bg-accent/50 text-foreground hover:bg-accent"
                                }`}
                        >
                            <span className="text-lg">{cat.icon}</span>
                            <span>{cat.label}</span>
                            {selectedCategory === cat.id && (
                                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                    {cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length}
                                </span>
                            )}
                        </button>
                    ))}
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
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}
