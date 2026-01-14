
import Header from "@/components/Header";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex-1 flex flex-col min-w-0 m-4 rounded-3xl overflow-hidden shadow-2xl border border-white/40 relative bg-white/50 backdrop-blur-3xl">
            <Header />
            <main className="flex-1 p-8 overflow-auto scroll-smooth">
                {children}
            </main>
        </div>
    );
}
