# Reemplazar Imágenes SVG por Reales

El proyecto actualmente usa imágenes SVG placeholder. Para usar tus imágenes reales, sigue estos pasos:

## 1. Coloca tus imágenes en `/public`

Asegúrate de tener estos archivos:
- `/public/logo.png` (logo de la empresa)
- `/public/campo.png` (imagen del hero/campo)
- `/public/queso.jpg` (imagen del queso campesino)
- `/public/suero.jpg` (imagen del suero costeño)

## 2. Actualiza las rutas en el código

### En `components/Hero.tsx`:
Cambia:
```tsx
src="/campo.svg"
```
Por:
```tsx
src="/campo.png"
```

### En `components/Navbar.tsx`:
Cambia:
```tsx
src="/logo.svg"
```
Por:
```tsx
src="/logo.png"
```

### En `components/ProductCarousel.tsx`:
Cambia:
```tsx
image: "/queso.svg",
image: "/suero.svg",
```
Por:
```tsx
image: "/queso.jpg",
image: "/suero.jpg",
```

### En `components/CatalogSection.tsx`:
Cambia:
```tsx
image: "/queso.svg",
image: "/suero.svg",
```
Por:
```tsx
image: "/queso.jpg",
image: "/suero.jpg",
```

## 3. Reinicia el servidor

```bash
npm run dev
```

Las imágenes se cargarán desde la carpeta `/public` directamente.

## Estructura actual

✅ **Secciones en orden correcto:**
1. Hero - Con branding "Nación Campo Verde" + imagen del campo
2. ProductCarousel - Slider automático de productos
3. CatalogSection - Catálogo con 2 productos
4. About - Sección "Nosotros"
5. Values - Valores de la empresa
6. Footer - Pie de página

✅ **Productos únicos:**
- Queso Campesino
- Suero Costeño

✅ **Imágenes con rutas correctas en `/public`**

Todo está listo, solo reemplaza los SVG por tus imágenes reales cuando las tengas disponibles.
