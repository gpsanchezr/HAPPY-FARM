-- ================================================================
-- DEL CAMPO A TU MESA — Supabase SQL Schema
-- ================================================================
-- Ejecuta este script completo en:
-- Supabase Dashboard → SQL Editor → New Query → Run
-- ================================================================

-- ──────────────────────────────────────────────────────────────
-- 1. TABLA: productos
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.productos (
  id            UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        TEXT            NOT NULL,
  descripcion   TEXT            NOT NULL DEFAULT '',
  precio        DECIMAL(10, 2)  NOT NULL CHECK (precio >= 0),
  imagen_url    TEXT            NOT NULL DEFAULT '',
  categoria     TEXT            NOT NULL DEFAULT 'Otros',
  stock         INTEGER         NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Trigger: auto-actualiza updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_productos ON public.productos;
CREATE TRIGGER set_updated_at_productos
  BEFORE UPDATE ON public.productos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ──────────────────────────────────────────────────────────────
-- 2. TABLA: pedidos
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.pedidos (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_nombre    TEXT          NOT NULL,
  cliente_telefono  TEXT          NOT NULL,
  cliente_direccion TEXT          NOT NULL,
  cliente_barrio    TEXT          NOT NULL DEFAULT '',
  detalle_carrito   JSONB         NOT NULL DEFAULT '[]'::jsonb,
  total_pago        DECIMAL(12,2) NOT NULL CHECK (total_pago >= 0),
  metodo_entrega    TEXT          NOT NULL DEFAULT 'domicilio',
  estado            TEXT          NOT NULL DEFAULT 'pendiente'
                    CHECK (estado IN ('pendiente', 'confirmado', 'en_camino', 'entregado', 'cancelado')),
  notas             TEXT,
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS set_updated_at_pedidos ON public.pedidos;
CREATE TRIGGER set_updated_at_pedidos
  BEFORE UPDATE ON public.pedidos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ──────────────────────────────────────────────────────────────
-- 3. ROW LEVEL SECURITY (RLS)
-- ──────────────────────────────────────────────────────────────

-- productos: lectura pública, escritura sólo autenticada
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Productos visibles para todos"
  ON public.productos FOR SELECT
  USING (true);

CREATE POLICY "Solo autenticados pueden insertar productos"
  ON public.productos FOR INSERT
  WITH CHECK (true);  -- Cambia a: auth.role() = 'authenticated' si usas Supabase Auth

CREATE POLICY "Solo autenticados pueden actualizar productos"
  ON public.productos FOR UPDATE
  USING (true);

-- pedidos: inserción pública (checkout del cliente), lectura privada
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede crear un pedido"
  ON public.pedidos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Solo autenticados leen pedidos"
  ON public.pedidos FOR SELECT
  USING (true);  -- Ajusta según necesidades de seguridad

CREATE POLICY "Solo autenticados actualizan pedidos"
  ON public.pedidos FOR UPDATE
  USING (true);

-- ──────────────────────────────────────────────────────────────
-- 4. STORAGE: bucket 'catalogo'
-- ──────────────────────────────────────────────────────────────
-- Ejecuta estos comandos individualmente si falla el batch:

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'catalogo',
  'catalogo',
  TRUE,
  5242880,  -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Política de storage: lectura pública
CREATE POLICY "Imágenes públicas"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'catalogo');

-- Política de storage: cualquiera puede subir (ajusta si usas auth)
CREATE POLICY "Subida de imágenes permitida"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'catalogo');

CREATE POLICY "Actualización de imágenes permitida"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'catalogo');

-- ──────────────────────────────────────────────────────────────
-- 5. DATOS DE EJEMPLO (opcional, comenta si no los necesitas)
-- ──────────────────────────────────────────────────────────────
INSERT INTO public.productos (nombre, descripcion, precio, imagen_url, categoria, stock) VALUES
  (
    'Queso Costeño Artesanal',
    'Queso fresco elaborado por familias productoras del Caribe. Textura firme y sabor único.',
    15000,
    'https://via.placeholder.com/400x300/B88E6D/FDFBF6?text=Queso+Costeño',
    'Lácteos',
    20
  ),
  (
    'Suero Atollabuey',
    'Suero tradicional costeño, perfecto para acompañar con arepa de maíz.',
    15000,
    'https://via.placeholder.com/400x300/4A5D3B/FDFBF6?text=Suero+Atollabuey',
    'Lácteos',
    15
  ),
  (
    'Arepas de Maíz Artesanales',
    'Arepas hechas a mano con maíz pilado tradicional. Pack de 6 unidades.',
    13000,
    'https://via.placeholder.com/400x300/B88E6D/FDFBF6?text=Arepas+de+Maíz',
    'Panadería',
    30
  ),
  (
    'Huevos Criollos Farm Fresh',
    'Huevos de gallinas criadas en libertad. Docena con yema bien amarilla y nutritiva.',
    15000,
    'https://via.placeholder.com/400x300/4A5D3B/FDFBF6?text=Huevos+Criollos',
    'Huevos',
    25
  ),
  (
    'Jugo de Corozo Natural',
    'Jugo artesanal de corozo sin conservantes. Sabor auténtico del Caribe. 1 litro.',
    8000,
    'https://via.placeholder.com/400x300/B88E6D/FDFBF6?text=Jugo+Corozo',
    'Jugos',
    18
  ),
  (
    'Bocadillo de Guayaba',
    'Dulce artesanal de guayaba con toque caribeño. Presentación de 200g.',
    7000,
    'https://via.placeholder.com/400x300/4A5D3B/FDFBF6?text=Bocadillo+Guayaba',
    'Otros',
    40
  );

-- ──────────────────────────────────────────────────────────────
-- 6. ÍNDICES para performance
-- ──────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON public.productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_stock ON public.productos(stock);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON public.pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON public.pedidos(created_at DESC);

-- ──────────────────────────────────────────────────────────────
-- 7. VISTA: resumen de pedidos (útil para el admin)
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.resumen_pedidos AS
SELECT
  p.id,
  p.cliente_nombre,
  p.cliente_telefono,
  p.cliente_barrio,
  p.total_pago,
  p.estado,
  p.metodo_entrega,
  p.created_at,
  jsonb_array_length(p.detalle_carrito) AS num_productos
FROM public.pedidos p
ORDER BY p.created_at DESC;

-- ================================================================
-- ✅ Schema listo. Verifica en:
--    Table Editor → productos ✓
--    Table Editor → pedidos ✓
--    Storage → catalogo bucket ✓
-- ================================================================
