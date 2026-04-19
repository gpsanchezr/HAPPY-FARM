<<<<<<< HEAD
# 🌿 Del Campo a Tu Mesa

E-commerce premium de productos frescos del Caribe colombiano. Full-Stack con Next.js 14, Supabase y WhatsApp Business.

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Estilos | TailwindCSS con paleta personalizada |
| Backend & DB | Supabase (PostgreSQL) |
| Storage | Supabase Storage (bucket `catalogo`) |
| Iconos | lucide-react |
| Notificaciones | react-hot-toast |
| Pagos/Pedidos | WhatsApp Business API |

---

## ⚙️ Instalación Local

### 1. Clonar e instalar dependencias

```bash
git clone <tu-repo>
cd del-campo-a-tu-mesa
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
# Edita .env.local con tus valores reales
```

### 3. Configurar Supabase

1. Entra a [supabase.com](https://supabase.com) y crea un proyecto nuevo
2. Ve a **SQL Editor** → **New Query**
3. Pega el contenido de `supabase-schema.sql` y ejecuta (**Run All**)
4. El script crea las tablas, políticas RLS, bucket de storage e inserta productos de ejemplo

### 4. Obtener credenciales Supabase

En tu proyecto Supabase: **Settings → API**
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. Configurar WhatsApp

En `.env.local`, pon tu número de WhatsApp Business:
```
NEXT_PUBLIC_WA_NUMBER=573001234567
```
> ⚠️ Sin espacios, sin `+`, con código de país (57 para Colombia)

### 6. Ejecutar en desarrollo

```bash
npm run dev
# Abre http://localhost:3000
```

---
=======
# Campo Verde - Tienda de Productos del Campo

Interfaz de usuario moderna y elegante para una tienda de productos del campo, desarrollada con Next.js y TailwindCSS.

 1. 🏠 Next.js App Router (/app)
 2. 🛒 carrito (CartContext)
 3. 🧩 componentes UI (Navbar, Hero, Checkout)
 4. 🧑‍🌾 concepto de tienda “Del campo a tu mesa”
 5. ⚙️ backend posible con Supabase

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
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321

## 📁 Estructura del Proyecto

```
<<<<<<< HEAD
del-campo-a-tu-mesa/
├── app/
│   ├── admin-farm/      # Panel CMS protegido por contraseña
│   │   └── page.tsx
│   ├── globals.css      # Estilos globales + animaciones
│   ├── layout.tsx       # Root layout con providers
│   └── page.tsx         # Página principal
├── components/
│   ├── Navbar.tsx           # Navbar sticky con blur y badge carrito
│   ├── Hero.tsx             # Banner hero animado
│   ├── CatalogSection.tsx   # Grid de productos con skeletons
│   ├── ProductCard.tsx      # Tarjeta individual + skeleton
│   ├── CartSidebar.tsx      # Carrito lateral deslizable
│   ├── CheckoutForm.tsx     # Formulario de pedido → WhatsApp
│   ├── WhatsAppChatWidget.tsx # Widget flotante WhatsApp Business
│   ├── About.tsx            # Sección "Sobre nosotros"
│   ├── Values.tsx           # Sección de valores/features
│   └── Footer.tsx           # Footer con contacto
├── context/
│   └── CartContext.tsx      # Estado global del carrito (localStorage)
├── lib/
│   └── supabase.ts          # Cliente + helpers de Supabase
├── types/
│   └── index.ts             # TypeScript interfaces
├── supabase-schema.sql      # ⭐ Script SQL completo para Supabase
├── .env.example             # Plantilla de variables de entorno
└── README.md
```

---

## 🎨 Sistema de Diseño

| Token | Color | Uso |
|-------|-------|-----|
| `campo-crema` | `#FDFBF6` | Fondo principal |
| `campo-verde` | `#4A5D3B` | Botones, acentos |
| `campo-tierra` | `#B88E6D` | Precios, títulos, detalles |
| `campo-oscuro` | `#2C2C2C` | Textos de lectura |

**Tipografía:** Montserrat (sans) + Arvo (serif)

---

## 🔐 Panel Admin

Accede en: `http://localhost:3000/admin-farm`

Funciones:
- ✅ Login con contraseña (variable de entorno)
- ✅ Formulario para añadir productos
- ✅ Upload de imagen → Supabase Storage (drag & drop)
- ✅ Vista del inventario actual en tiempo real

---

## 💬 WhatsApp Business Widget

- Botón flotante en esquina inferior derecha
- Pop-up de chat con bienvenida de "Giseella"
- Mensajes pre-configurados inteligentes:
  - Desde producto: `"Hola, me interesa el [Nombre Producto]..."`
  - Desde carrito: `"Hola, tengo una duda sobre mi pedido..."`
- Funciona en WhatsApp Web (PC) y WhatsApp App (móvil)

---

## 🛒 Flujo del Carrito

1. Usuario añade productos → Toast de confirmación
2. Cart sidebar se abre automáticamente
3. Modificar cantidades (+ / -) en tiempo real
4. Carrito persiste en **localStorage** (cierra pestaña, vuelve mañana)
5. "Confirmar Pedido" → Formulario de datos de entrega (Barranquilla)
6. Submit → Guarda pedido en Supabase → Abre WhatsApp con ticket formateado

---

## 🚀 Deploy en Vercel

```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel

# Configura las env vars en Vercel Dashboard o con:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_WA_NUMBER
vercel env add NEXT_PUBLIC_ADMIN_PASSWORD
```

---

## 📞 Contacto

**Del Campo a Tu Mesa** — Barranquilla, Atlántico, Colombia  
WhatsApp Business: +57 300 000 0000
=======
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
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321
