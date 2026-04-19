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

## 📁 Estructura del Proyecto

```
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
