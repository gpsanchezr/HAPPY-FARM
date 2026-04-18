import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.png"
                alt="Nación Campo Verde"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-primary-700">
              Nación Campo Verde
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#inicio"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-200"
            >
              Inicio
            </a>
            <a
              href="#productos"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-200"
            >
              Productos
            </a>
            <a
              href="#nosotros"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-200"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition duration-200"
            >
              Contacto
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600 p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
