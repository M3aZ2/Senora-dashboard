export default function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:hidden">
            <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
                <div className="text-2xl mb-2">📦</div>
                <div className="text-2xl font-bold text-primary">{stats.totalProducts}</div>
                <div className="text-xs text-muted-foreground mt-1">إجمالي المنتجات</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-2xl font-bold text-green-600">{stats.activeProducts}</div>
                <div className="text-xs text-muted-foreground mt-1">منتج متاح</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
                <div className="text-2xl mb-2">🔴</div>
                <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
                <div className="text-xs text-muted-foreground mt-1">نفد</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-border/50 shadow-sm">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-2xl font-bold text-secondary">{stats.totalSales}</div>
                <div className="text-xs text-muted-foreground mt-1">المبيعات</div>
            </div>
        </div>
    );
}
