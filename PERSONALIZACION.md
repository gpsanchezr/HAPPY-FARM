# Guía de Personalización

Esta guía te ayudará a personalizar la interfaz según tus necesidades.

## 🎨 Cambiar Colores

Los colores principales se definen en `tailwind.config.ts`. El tema usa una escala de verdes:

```typescript
colors: {
  primary: {
    50: '#f0fdf4',   // Verde muy claro
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Verde medio (principal)
    600: '#16a34a',  // Verde oscuro
    700: '#15803d',
    800: '#166534',
    900: '#14532d',  // Verde muy oscuro
  },
}
```

Para cambiar a otro color (ej: azul), reemplaza los valores hexadecimales:

```typescript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... etc
    600: '#2563eb',  // Azul
  },
}
```

## 📝 Personalizar Contenido

### Navbar
**Archivo:** `components/Navbar.tsx`

- Cambiar logo: Modifica la línea `<span>Campo Verde</span>`
- Agregar/quitar links: Edita la sección de navigation links
- Cambiar color de fondo: Modifica `bg-white` en la clase del nav

### Hero
**Archivo:** `components/Hero.tsx`

- Título: Edita `<h1>Productos Frescos del Campo</h1>`
- Subtítulo: Modifica el `<p>` con el texto descriptivo
- Botón: Cambia el texto en `Ver Productos`
- Imagen de fondo: Reemplaza el div de gradiente con `<Image>`

```tsx
// Ejemplo con imagen real
<Image 
  src="/images/hero.jpg" 
  alt="Campo" 
  fill 
  className="object-cover"
  priority
/>
```

### About (Nosotros)
**Archivo:** `components/About.tsx`

- Texto: Modifica los párrafos `<p>` con tu información
- Título: Cambia `<h2>Sobre Nosotros</h2>`
- Imagen: Reemplaza el placeholder con una imagen real

### Products
**Archivo:** `components/Products.tsx`

Modifica el array `products` con tus productos:

```typescript
const products = [
  {
    id: 1,
    name: "Tu Producto",
    price: "$10.000",
    image: "bg-gradient-to-br from-color-400 to-color-600",
  },
  // ... más productos
];
```

Para usar imágenes reales:

1. Coloca las imágenes en `public/images/products/`
2. Importa Image de Next.js
3. Reemplaza el div de gradiente

```tsx
<Image 
  src={`/images/products/${product.image}`}
  alt={product.name}
  fill
  className="object-cover"
/>
```

### Values
**Archivo:** `components/Values.tsx`

- Edita el array `values` para cambiar título, descripción e icono
- Los iconos son SVG de [Heroicons](https://heroicons.com/)

### Footer
**Archivo:** `components/Footer.tsx`

- Información de contacto: Modifica teléfono, email y dirección
- Redes sociales: Cambia los enlaces `href="#"`
- Nombre de la empresa: Edita `<h3>Campo Verde</h3>`

## 📱 Grid de Productos

El grid es responsive y se adapta automáticamente:

- **Móvil:** 1 columna
- **Tablet:** 2 columnas
- **Desktop:** 3 columnas
- **XL screens:** 4 columnas

Para cambiar esto, edita la clase grid en `Products.tsx`:

```tsx
// Actual
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"

// Ejemplo: Siempre 3 columnas en desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
```

## 🖼️ Agregar Imágenes Reales

1. Crea la carpeta: `public/images/`
2. Agrega tus imágenes:
   ```
   public/
   ├── images/
   │   ├── hero.jpg
   │   ├── about.jpg
   │   └── products/
   │       ├── producto1.jpg
   │       └── producto2.jpg
   ```

3. Importa Image en tu componente:
   ```tsx
   import Image from "next/image";
   ```

4. Usa el componente Image:
   ```tsx
   <Image 
     src="/images/hero.jpg"
     alt="Descripción"
     width={1200}
     height={600}
     className="rounded-lg"
   />
   ```

## 🎯 Modificar Espaciado

Los valores de padding/margin usan la escala de Tailwind:

- `py-20` = padding vertical de 5rem (80px)
- `px-4` = padding horizontal de 1rem (16px)
- `mb-8` = margin bottom de 2rem (32px)

Para cambiar el espaciado de una sección:

```tsx
// Menos espaciado
<section className="py-12"> // En vez de py-20

// Más espaciado
<section className="py-32"> // En vez de py-20
```

## 📐 Cambiar Anchos Máximos

Todas las secciones usan `max-w-7xl` para el contenedor:

```tsx
<div className="max-w-7xl mx-auto">
```

Opciones disponibles:
- `max-w-5xl` - Más estrecho
- `max-w-7xl` - Actual (predeterminado)
- `max-w-full` - Ancho completo

## 🔤 Tipografía

Para cambiar la fuente:

1. Abre `app/layout.tsx`
2. Importa la fuente de Google Fonts:

```tsx
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ['latin'] 
});

// En el body
<body className={poppins.className}>
```

## 🎭 Agregar Animaciones

Tailwind incluye transiciones simples. Para agregar:

```tsx
// Hover simple
className="hover:scale-105 transition duration-300"

// Fade in
className="opacity-0 animate-fade-in"
```

Para animaciones más complejas, considera usar:
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind Animate](https://tailwindcss.com/docs/animation)

## 🌐 Navegación Suave

El scroll suave ya está habilitado en `app/layout.tsx`:

```tsx
<html lang="es" className="scroll-smooth">
```

Para ajustar la velocidad, necesitarás CSS personalizado en `globals.css`:

```css
html {
  scroll-behavior: smooth;
}
```

## 💡 Tips Adicionales

1. **Usar variables de color:** En vez de hardcodear colores, usa las clases de primary:
   ```tsx
   bg-primary-600  // En lugar de bg-green-600
   text-primary-700 // En lugar de text-green-700
   ```

2. **Consistencia:** Mantén el mismo espaciado entre secciones (py-20)

3. **Responsive:** Siempre prueba en diferentes tamaños de pantalla

4. **Accesibilidad:** Mantén buenos contrastes de color y usa alt en imágenes

## 🔧 Problemas Comunes

### Los colores no cambian
- Asegúrate de reiniciar el servidor: `npm run dev`
- Verifica que usas las clases `primary-*` correctas

### Las imágenes no se ven
- Verifica que la ruta sea correcta (relativa a `public/`)
- Asegúrate de usar el componente `Image` de Next.js

### El grid no es responsive
- Revisa las clases: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Asegúrate de tener el viewport meta tag en layout.tsx
