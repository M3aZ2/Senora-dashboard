'use client'
import { useRef } from 'react'

type ImageItem = {
    id?: string | number;
    url: string;
    file?: File;
    isNew?: boolean;
};

type FormData = {
    images: ImageItem[];
    // ... allow other fields to be loose or keep them as is if needed, 
    // but best to just focus on images here for the type used in this component
    [key: string]: any;
}

type Props = {
    formData: FormData;
    activeTab: string;
    setFormData: any
}

export default function ImagesTab({ formData, activeTab, setFormData }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData((prev: any) => ({
                        ...prev,
                        images: [
                            ...prev.images,
                            {
                                url: reader.result as string,
                                file: file,
                                isNew: true
                            }
                        ]
                    }));
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const addImage = () => {
        fileInputRef.current?.click();
    };

    const removeImage = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            images: prev.images.filter((_: any, i: number) => i !== index)
        }));
    };

    return (
        <>
            {activeTab === "images" && (
                <div className="bg-white rounded-xl p-6 border border-border shadow-sm space-y-6 animate-fade-in">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    <div className="flex items-center justify-between pb-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <span className="text-xl">🖼️</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground">صور المنتج</h3>
                                <p className="text-xs text-muted-foreground">أضف صور عالية الجودة للمنتج</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={addImage}
                            className="px-4 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary font-medium transition-all text-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            إضافة صورة
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {formData.images?.map((image, index) => (
                            <div key={index} className="relative group">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-border hover:border-secondary/50 transition-all">
                                    <img
                                        src={typeof image === 'string' ? image : image.url}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-xl flex items-center justify-center gap-2">
                                    {index === 0 && (
                                        <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded">
                                            الرئيسية
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addImage}
                            className="aspect-[3/4] rounded-xl border-2 border-dashed border-border hover:border-secondary/50 hover:bg-secondary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-secondary"
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-sm font-medium">إضافة صورة</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}