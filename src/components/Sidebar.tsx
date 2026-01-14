"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <aside className="w-72 bg-gradient-to-b from-primary to-primary-dark text-primary-foreground flex-shrink-0 hidden md:flex flex-col shadow-2xl z-30 relative overflow-hidden h-screen sticky top-0">
            {/* Decorative circle in sidebar */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="p-8 border-b border-primary-foreground/10 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-200 rounded-xl rotate-3 flex items-center justify-center text-primary font-bold text-2xl shadow-lg shadow-black/20">
                    س
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-secondary-light to-secondary">السنيورة</h1>
                    <p className="text-xs text-primary-foreground/60 font-light tracking-widest uppercase">Luxury Fashion</p>
                </div>
            </div>

            <nav className="flex-1 py-12 px-4 space-y-4 relative z-10 overflow-y-auto">
                {/* Flattened Navigation - Only Products */}
                <div className="px-4 mb-2 text-xs font-bold text-secondary tracking-widest uppercase opacity-80">القائمة الرئيسية</div>
                <NavLink href="/" icon="👗" label="المنتجات" active={isActive("/") || isActive("/products")} />
            </nav>

            <div className="p-6 border-t border-primary-foreground/10 relative z-10">
                <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-100/80 hover:text-red-100 transition-all duration-300">
                    <span>🚪</span>
                    <span className="font-medium">تسجيل خروج</span>
                </Link>
            </div>
        </aside>
    );
}

function NavLink({ href, icon, label, active }: { href: string; icon: string; label: string; active: boolean }) {
    return (
        <Link href={href} className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 group relative overflow-hidden ${active ? "bg-white/10 text-white shadow-2xl shadow-black/10 border border-white/10" : "text-primary-foreground/70 hover:text-white hover:bg-white/5"}`}>
            {/* Hover glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 transition-opacity duration-300 ${active ? "opacity-100" : "group-hover:opacity-100"}`}></div>

            <span className={`text-2xl transition-transform duration-500 relative z-10 ${active ? "scale-110 text-secondary drop-shadow-md" : "group-hover:scale-110 group-hover:rotate-6"} ${!active && "text-secondary/70"}`}>{icon}</span>
            <span className={`font-medium text-lg tracking-wide relative z-10 ${active && "text-secondary-light"}`}>{label}</span>

            {/* Active Indicator */}
            <span className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-secondary to-yellow-200 rounded-l-full transition-all duration-300 origin-right shadow-[0_0_10px_rgba(212,175,55,0.5)] ${active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 group-hover:scale-y-50 group-hover:opacity-50"}`}></span>
        </Link>
    );
}
