'use client'
type FormData = {
    images: string[]
    name: string
    price: number
    description: string
    status: string
    orders: number
    availableSizes: number[]
    categories: number[]
}

type Category = {
    id: string;
    name: string;
    image: string;
};

type Props = {
    formData: FormData;
    CATEGORIES: Category[];
    activeTab: string;
    setFormData: any
};

export default function BasicInfo({ formData, CATEGORIES, activeTab, setFormData }: Props) {
    const toggleCategory = (catId: any) => {
        const currentCats = formData.categories || [];
        const exists = currentCats.includes(catId);
        let newCats;
        if (exists) {
            newCats = currentCats.filter((id) => id !== catId);
        } else {
            newCats = [...currentCats, catId];
        }
        setFormData({ ...formData, categories: newCats });
    };

    return (
        <>
            {activeTab === "basic" && (
                <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm space-y-6 animate-fade-in">
                    {/* ... existing header ... */}
                    <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-xl">📝</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground">المعلومات الأساسية</h3>
                    </div>

                    <div className="space-y-5">
                        {/* Name and Description Inputs (unchanged) */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-foreground">
                                اسم المنتج <span className="text-secondary">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-white"
                                placeholder="مثال: فستان سهرة ملكي"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-foreground">
                                الوصف <span className="text-secondary">*</span>
                            </label>
                            <textarea
                                rows={5}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all bg-white resize-none"
                                placeholder="اكتب وصفاً تفصيلياً وجذاباً للمنتج..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-foreground">
                                التصنيفات <span className="text-secondary">*</span> (يمكن اختيار أكثر من تصنيف)
                            </label>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {CATEGORIES.map((cat) => {
                                    const isSelected =
                                        formData.categories?.includes(Number(cat.id)) ||
                                        formData.categories?.includes(String(cat.id) as any);

                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => toggleCategory(cat.id)}
                                            className={`group relative overflow-hidden rounded-xl border-2 transition-all w-full aspect-square ${
                                                isSelected
                                                    ? "border-secondary shadow-lg shadow-secondary/20 scale-[1.02]"
                                                    : "border-border hover:border-secondary/50 hover:shadow-md"
                                            }`}
                                        >
                                            {/* الخلفية (مربعة) */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className={`w-full h-full object-cover transition-transform duration-300 ${
                                                        isSelected ? "scale-110" : "group-hover:scale-105"
                                                    }`}
                                                />
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity ${
                                                        isSelected ? "opacity-80" : "opacity-60 group-hover:opacity-70"
                                                    }`}
                                                />
                                            </div>

                                            {/* النص تحت */}
                                            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
                                            <span className="font-bold text-white text-sm sm:text-base drop-shadow-lg line-clamp-2 text-right">
                                              {cat.name}
                                            </span>

                                                {isSelected && (
                                                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shadow-lg shrink-0">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* حدود مضيئة عند الاختيار */}
                                            {isSelected && (
                                                <div className="absolute inset-0 rounded-xl ring-2 ring-secondary ring-offset-2 pointer-events-none" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}