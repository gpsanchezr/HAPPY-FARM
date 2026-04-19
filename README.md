# Campo Verde - Tienda de Productos del Campo

Interfaz de usuario moderna y elegante para una tienda de productos del campo, desarrollada con Next.js y TailwindCSS. 
🏠 Next.js App Router (/app)
🛒 carrito (CartContext)
🧩 componentes UI (Navbar, Hero, Checkout)
🧑‍🌾 concepto de tienda “Del campo a tu mesa”
⚙️ backend posible con Supabase

👉 Es una tienda ecommerce agrícola

## 🌿 Características

- **Diseño limpio y moderno** inspirado en productos naturales
- **Navegación sticky** con enlaces a todas las secciones
- **Hero section** atractivo con llamado a la acción
- **Grid de productos** responsive (1-4 columnas según dispositivo)
- **Sección "Sobre Nosotros"** con diseño a dos columnas
- **Valores de la empresa** presentados en tarjetas con iconos
- **Footer completo** con información de contacto y redes sociales
- **100% responsive** - se adapta a todos los tamaños de pantalla

## 🎨 Paleta de Colores

- **Principal:** Verde (escala de tonos verdes)
- **Secundario:** Blanco y grises claros
- **Acentos:** Degradados naturales

## 🛠️ Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework de React
- [React 18](https://react.dev/) - Biblioteca de UI
- [TailwindCSS 3](https://tailwindcss.com/) - Framework de CSS
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📁 Estructura del Proyecto

```
tienda-campo/
├── app/
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página de inicio
├── components/
│   ├── Navbar.tsx        # Barra de navegación
│   ├── Hero.tsx          # Sección hero
│   ├── About.tsx         # Sección "Sobre Nosotros"
│   ├── Products.tsx      # Grid de productos
│   ├── Values.tsx        # Valores de la empresa
│   └── Footer.tsx        # Pie de página
├── public/               # Archivos estáticos
└── tailwind.config.ts    # Configuración de Tailwind
```

## 🎯 Componentes

### Navbar
- Logo a la izquierda
- Links de navegación: Inicio, Productos, Nosotros, Contacto
- Sticky al hacer scroll
- Menú hamburguesa en móvil

### Hero
- Imagen de fondo grande
- Título y subtítulo atractivos
- Botón de llamado a la acción

### About
- Diseño en dos columnas (texto e imagen)
- Información de la empresa
- Responsive

### Products
- Grid responsive (1-4 columnas)
- Tarjetas con: imagen, nombre, precio y botón
- 8 productos de ejemplo
- Efectos hover

### Values
- 6 tarjetas con iconos SVG
- Calidad, Natural, Tradición, Frescura, Servicio, Sostenibilidad
- Grid responsive

### Footer
- 3 columnas de información
- Contacto, redes sociales
- Copyright dinámico

## ⚠️ Nota Importante

Este es un **proyecto de UI/diseño únicamente**. No incluye:
- Funcionalidad de carrito de compras
- Backend o API
- Sistema de pagos
- Base de datos
- Autenticación

Las imágenes son placeholders con gradientes de colores. Para producción, reemplaza con imágenes reales.

## 🚀 Próximos Pasos (Funcionalidades Futuras)

- Agregar funcionalidad de carrito
- Integrar con backend/API
- Sistema de autenticación
- Pasarela de pagos
- Panel de administración
- Filtros y búsqueda de productos

## 👩‍💻 Autora
**Giseella Sanchez**

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT (Copyright © 2026 Giseella Sanchez).
