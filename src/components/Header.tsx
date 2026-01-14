"use client";

import { useState, useEffect } from "react";

export default function Header() {
    const [showProfile, setShowProfile] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        setCurrentTime(new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }));
        setCurrentDate(new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <>
            <header className="relative bg-white/90 backdrop-blur-xl border-b border-border/30 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-sm">
                {/* Decorative gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-secondary via-secondary-light to-secondary opacity-60"></div>

                {/* Left Side - Title */}
                <div className="flex items-center gap-4 animate-fade-in">
                    {/* Logo for mobile */}
                    <div className="lg:hidden w-12 h-12 bg-gradient-to-br from-secondary via-secondary-light to-secondary rounded-xl rotate-3 flex items-center justify-center shadow-lg">
                        <span className="text-primary font-bold text-2xl">س</span>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                            لوحة التحكم
                        </h2>
                    </div>
                </div>

                {/* Right Side - User Profile & Actions */}
                <div className="flex items-center gap-3 lg:gap-6">
                    {/* Date & Time - Hidden on small screens */}
                    <div className="hidden xl:flex flex-col items-end px-4 border-l border-border/50 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{currentTime}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{currentDate}</p>
                    </div>
                    {/* User Profile */}
                    <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-xl hover:bg-accent/50 transition-all duration-300 group border border-transparent hover:border-secondary/20"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">المدير العام</p>
                                <p className="text-xs text-muted-foreground">Admin</p>
                            </div>

                            <div className="relative">
                                {/* Animated ring */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-secondary via-secondary-light to-secondary rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>

                                {/* Avatar */}
                                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-secondary via-secondary-light to-secondary p-[2px] shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://ui-avatars.com/api/?name=Admin+User&background=004d40&color=c9a961&bold=true&size=128"
                                            alt="Admin"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Online indicator */}
                                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                            </div>

                            {/* Dropdown arrow */}
                            <svg
                                className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-300 hidden lg:block ${showProfile ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showProfile && (
                            <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-border/50 overflow-hidden animate-scale-in z-50">
                                {/* Header */}
                                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 border-b border-border/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary-light p-[2px]">
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                                <img
                                                    src="https://ui-avatars.com/api/?name=Admin+User&background=004d40&color=c9a961&bold=true&size=128"
                                                    alt="Admin"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">المدير العام</p>
                                            <p className="text-xs text-muted-foreground">admin@alseniora.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="p-2">
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-all text-right group">
                                        <svg className="w-5 h-5 text-muted-foreground group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="text-sm font-medium text-foreground group-hover:text-red-500 transition-colors">تسجيل الخروج</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Overlay when dropdown is open */}
            {showProfile && (
                <div
                    className="fixed inset-0 z-20 bg-black/10 backdrop-blur-sm animate-fade-in"
                    onClick={() => setShowProfile(false)}
                ></div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
                
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out forwards;
                }
            `}</style>
        </>
    );
}