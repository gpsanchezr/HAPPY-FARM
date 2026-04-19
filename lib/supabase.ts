// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Products ─────────────────────────────────────────────────
export async function getProducts() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .gt('stock', 0)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createProduct(product: {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  categoria: string;
  stock: number;
}) {
  const { data, error } = await supabase
    .from('productos')
    .insert([product])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Orders ───────────────────────────────────────────────────
export async function createOrder(order: {
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_direccion: string;
  cliente_barrio: string;
  detalle_carrito: unknown;
  total_pago: number;
  metodo_entrega: string;
  estado: string;
}) {
  const { data, error } = await supabase
    .from('pedidos')
    .insert([order])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Storage ──────────────────────────────────────────────────
export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('catalogo')
    .upload(filename, file, { upsert: false, contentType: file.type });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('catalogo').getPublicUrl(filename);
  return data.publicUrl;
}
