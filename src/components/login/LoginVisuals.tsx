export default function LoginVisuals() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop")',
          transform: 'scale(1.05)'
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/85 to-primary-dark/90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,169,97,0.15),transparent_50%)]"></div>

      {/* Animated Gold Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-2/3 w-1 h-1 bg-secondary-light rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 animate-fade-in">
        {/* Logo */}
        <div className="group mb-8 transform transition-all duration-500 hover:scale-105">
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/30 blur-xl rounded-full transition-all"></div>

            <div
              className="
                relative w-24 h-24 bg-gradient-to-br from-secondary via-secondary-light to-secondary rounded-2xl overflow-hidden rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center shadow-2xl border-2 border-secondary-light/30
              "
            >
              <img
                src="/favicon.ico" alt="Senora Logo" className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>


        {/* Text Content */}
        <div className="space-y-4 animate-slide-up">
          <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight">
            السنيورة
            <br />
            <span className="text-secondary bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent">
              للأناقة عنوان
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-transparent rounded-full"></div>
          <p className="text-xl text-gray-200 max-w-md font-light leading-relaxed">
            لوحة التحكم الخاصة بإدارة المتجر والمنتجات
          </p>
        </div>
      </div>
    </div>
  );
}
