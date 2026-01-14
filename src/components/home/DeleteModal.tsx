export default function DeleteModal({ show, onClose, onConfirm }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-scale-up">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    ⚠️
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-foreground">تأكيد الحذف</h3>
                <p className="text-center text-muted-foreground mb-6 text-sm">
                    هل أنت متأكد من حذف هذا المنتج؟
                    <br />
                    <span className="text-red-500 font-medium">لا يمكن التراجع عن هذا الإجراء</span>
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-border hover:bg-accent font-medium transition-all"
                    >
                        إلغاء
                    </button>
                    <button
                        onClick={() => onConfirm(show)}
                        className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg transition-all"
                    >
                        حذف
                    </button>
                </div>
            </div>
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
        </div>
    );
}
