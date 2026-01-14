import Link from "next/link";

export default function ProductGrid({ products, categories, setShowDeleteModal }) {
    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-accent/30 rounded-2xl border-2 border-dashed border-border">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-foreground mb-2">لا توجد منتجات</h3>
                <p className="text-muted-foreground">جرب تغيير الفلتر أو البحث</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group bg-white rounded-xl overflow-hidden border border-border/50 hover:border-secondary/30 hover:shadow-xl transition-all duration-300"
                >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-accent/30">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />

                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${product.status === "متاح"
                                ? "bg-green-500/90 text-white"
                                : product.status === "نفد من المخزون"
                                    ? "bg-red-500/90 text-white"
                                    : "bg-secondary/90 text-white"
                                }`}>
                                {product.status}
                            </span>
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-2">
                            <Link href={`/products/${product.id}/edit`} className="bg-white text-primary hover:bg-secondary hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 shadow-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                تعديل
                            </Link>

                            <button
                                onClick={() => setShowDeleteModal(product.id)}
                                className="bg-white text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-lg"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                        </h3>

                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-secondary">{product.price}</span>
                                <span className="text-xs text-muted-foreground">ر.س</span>
                            </div>

                            <div className="text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded">
                                {categories.find(c => c.id === product.category)?.label}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-3 border-t border-border/50">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <span>📦</span>
                                <span>المخزون: {product.stock}</span>
                            </div>
                            <div className="flex items-center gap-1 text-secondary font-medium">
                                <span>💰</span>
                                <span>المبيعات: {product.sales}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <style jsx global>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
}
