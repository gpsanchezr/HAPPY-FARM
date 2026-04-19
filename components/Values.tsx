import { Leaf, Sun, ShieldCheck, HeartHandshake, Sprout, Truck } from 'lucide-react';

export default function Values() {
  const values = [
    {
      id: 1,
      title: "Calidad Premium",
      desc: "Seleccionamos los mejores productos directamente de nuestros agricultores.",
      icon: <ShieldCheck className="w-8 h-8 text-campo-verde" />
    },
    {
      id: 2,
      title: "100% Natural",
      desc: "Sin conservantes ni químicos artificiales, tal como la naturaleza lo creó.",
      icon: <Leaf className="w-8 h-8 text-campo-verde" />
    },
    {
      id: 3,
      title: "Tradición Local",
      desc: "Apoyamos a las familias campesinas del Caribe Colombiano.",
      icon: <HeartHandshake className="w-8 h-8 text-campo-verde" />
    },
    {
      id: 4,
      title: "Frescura Garantizada",
      desc: "Del campo a tu mesa en el menor tiempo posible para conservar su sabor.",
      icon: <Sun className="w-8 h-8 text-campo-verde" />
    },
    {
      id: 5,
      title: "Sostenible",
      desc: "Prácticas agrícolas que respetan y cuidan nuestro medio ambiente.",
      icon: <Sprout className="w-8 h-8 text-campo-verde" />
    },
    {
      id: 6,
      title: "Servicio Rápido",
      desc: "Entregas eficientes y seguras en toda la ciudad de Barranquilla.",
      icon: <Truck className="w-8 h-8 text-campo-verde" />
    }
  ];

  return (
    <section id="valores" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-campo-verde font-serif">Nuestros Valores</h2>
          <p className="mt-4 text-campo-oscuro/70 max-w-2xl mx-auto">
            Trabajamos cada día para llevar lo mejor de nuestra tierra a tu hogar, siempre guiados por nuestros principios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.id} className="bg-campo-crema p-6 rounded-2xl shadow-sm border border-campo-tierra/20 hover:shadow-md transition-shadow">
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-sm">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-campo-oscuro mb-2">{v.title}</h3>
              <p className="text-campo-oscuro/70 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
