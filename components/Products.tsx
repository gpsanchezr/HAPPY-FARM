export default function Products() {
  // Productos de ejemplo (solo para visualización)
  const products = [
    {
      id: 1,
      name: "Aguacate Premium",
      price: "$8.500",
      image: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      id: 2,
      name: "Café Orgánico",
      price: "$15.000",
      image: "bg-gradient-to-br from-amber-700 to-amber-900",
    },
    {
      id: 3,
      name: "Plátano Hartón",
      price: "$5.000",
      image: "bg-gradient-to-br from-yellow-300 to-yellow-500",
    },
    {
      id: 4,
      name: "Panela Artesanal",
      price: "$6.500",
      image: "bg-gradient-to-br from-amber-600 to-amber-800",
    },
    {
      id: 5,
      name: "Yuca Fresca",
      price: "$4.000",
      image: "bg-gradient-to-br from-yellow-700 to-yellow-900",
    },
    {
      id: 6,
      name: "Miel de Abejas",
      price: "$18.000",
      image: "bg-gradient-to-br from-yellow-500 to-orange-600",
    },
    {
      id: 7,
      name: "Tomate Orgánico",
      price: "$7.000",
      image: "bg-gradient-to-br from-red-500 to-red-700",
    },
    {
      id: 8,
      name: "Huevos Criollos",
      price: "$12.000",
      image: "bg-gradient-to-br from-orange-200 to-orange-400",
    },
  ];

  return (
    <section id="productos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Productos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de productos frescos del campo, 
            cultivados con amor y dedicación.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className={`h-56 ${product.image} relative`}>
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-semibold">
                  Imagen del producto
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-primary-600 mb-4">
                  {product.price}
                  <span className="text-sm text-gray-500 font-normal"> / kg</span>
                </p>
                <button className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition duration-300 transform group-hover:scale-105">
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
