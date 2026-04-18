import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="relative h-[600px] flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/campo.jpg"
          alt="Campo"
          fill
          className="object-cover"
          priority
        />
        {/* Fallback gradient if image fails */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-500" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full h-full flex items-center">
        {/* Left Side - Text */}
        <div className="flex-1">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
            Nación Campo Verde
          </h1>
          <p className="text-2xl sm:text-3xl text-white/95 mb-8 italic font-light">
            Fuerza rural, corazón ecológico.
          </p>
          <a
            href="#destacados"
            className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Ver Productos
          </a>
        </div>
      </div>

      {/* Right Side - Logo (outside content container to extend to edge) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/5 flex items-center justify-center z-15">
        <div className="relative w-96 h-96 sm:w-[500px] sm:h-[500px] border-8 border-primary-200 shadow-2xl">
          <Image
            src="/logo.png"
            alt="Nación Campo Verde"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
