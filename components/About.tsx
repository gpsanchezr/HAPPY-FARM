import Image from "next/image";

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Sobre Nosotros
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Somos una empresa familiar dedicada a llevar los mejores productos del campo directamente a tu hogar. 
              Con más de 20 años de experiencia, nos enorgullecemos de mantener la tradición y calidad 
              que nos caracteriza.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Trabajamos con agricultores locales comprometidos con prácticas sostenibles, 
              garantizando productos frescos, naturales y de la más alta calidad. 
              Cada producto es seleccionado cuidadosamente para asegurar tu satisfacción.
            </p>
            <div className="pt-4">
              <a
                href="#contacto"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300"
              >
                Conoce más
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/campo.jpg"
              alt="Campo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
