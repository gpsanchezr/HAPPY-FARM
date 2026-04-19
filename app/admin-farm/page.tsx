'use client';
// app/admin-farm/page.tsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Plus, Package, Loader2, CheckCircle, AlertCircle, ArrowLeft, Leaf, LogOut } from 'lucide-react';
import { createProduct, uploadProductImage, getProducts } from '@/lib/supabase';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = ['Lácteos', 'Panadería', 'Huevos', 'Jugos', 'Carnes', 'Otros'];

const EMPTY_FORM = {
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: 'Lácteos',
  stock: '10',
};

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setAuthed(true);
      loadProducts();
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (_) {} finally {
      setLoadingProducts(false);
    }
  };

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) { setStatus({ type: 'error', msg: 'Selecciona una imagen para el producto.' }); return; }
    if (!form.nombre || !form.precio) { setStatus({ type: 'error', msg: 'Nombre y precio son obligatorios.' }); return; }

    setLoading(true);
    setStatus(null);
    try {
      const imagen_url = await uploadProductImage(imageFile);
      await createProduct({
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        imagen_url,
        categoria: form.categoria,
        stock: parseInt(form.stock),
      });
      setStatus({ type: 'success', msg: `¡Producto "${form.nombre}" creado exitosamente!` });
      setForm(EMPTY_FORM);
      setImageFile(null);
      setImagePreview(null);
      loadProducts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      setStatus({ type: 'error', msg: `Error: ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  // ─── Login screen ───────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-campo-oscuro flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-campo-verde rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-7 h-7 text-campo-crema" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-campo-crema mb-1">Panel Admin</h1>
            <p className="text-campo-crema/40 text-sm">Del Campo a Tu Mesa</p>
          </div>
          <form onSubmit={handleAuth} className="bg-white/5 border border-white/10 rounded-4xl p-8 space-y-4">
            <div>
              <label className="text-xs font-semibold text-campo-crema/60 uppercase tracking-wide block mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/15 rounded-2xl px-4 py-3 text-campo-crema placeholder-campo-crema/30 text-sm focus:outline-none focus:border-campo-tierra focus:ring-2 focus:ring-campo-tierra/20 transition"
                autoFocus
              />
              {authError && <p className="text-red-400 text-xs mt-1.5">{authError}</p>}
            </div>
            <button type="submit" className="w-full bg-campo-verde text-campo-crema py-3 rounded-2xl font-bold text-sm hover:bg-campo-verde-light transition">
              Entrar al Panel
            </button>
            <Link href="/" className="flex items-center justify-center gap-1.5 text-campo-crema/30 hover:text-campo-crema/60 text-xs transition mt-2">
              <ArrowLeft className="w-3 h-3" /> Volver a la tienda
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-campo-crema">
      {/* Header */}
      <div className="bg-campo-oscuro px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-campo-verde rounded-xl flex items-center justify-center">
            <Leaf className="w-4 h-4 text-campo-crema" />
          </div>
          <div>
            <p className="text-campo-crema font-bold text-sm">Panel Admin</p>
            <p className="text-campo-crema/40 text-xs">Del Campo a Tu Mesa</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-campo-crema/60 hover:text-campo-crema text-xs transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Tienda
          </Link>
          <button onClick={() => setAuthed(false)} className="flex items-center gap-1.5 text-campo-crema/60 hover:text-red-400 text-xs transition">
            <LogOut className="w-3.5 h-3.5" /> Salir
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-2 gap-8">
        {/* ─── Add Product Form ─── */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-campo-oscuro mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-campo-verde" /> Nuevo Producto
          </h2>

          <form onSubmit={handleSubmit} className="bg-white rounded-4xl p-6 shadow-sm space-y-4">
            {/* Image drop zone */}
            <div
              className={`drag-zone rounded-3xl p-6 text-center cursor-pointer transition ${dragOver ? 'drag-over' : ''}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="relative h-40 rounded-2xl overflow-hidden">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <p className="text-white text-xs font-semibold">Cambiar imagen</p>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <Upload className="w-8 h-8 text-campo-tierra/50 mx-auto mb-2" />
                  <p className="text-campo-oscuro/50 text-sm font-medium">
                    Arrastra la imagen aquí o <span className="text-campo-tierra font-semibold">haz clic</span>
                  </p>
                  <p className="text-campo-oscuro/30 text-xs mt-1">JPG, PNG, WEBP — máx. 5MB</p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>

            {/* Fields */}
            {[
              { name: 'nombre', label: 'Nombre del producto *', placeholder: 'Ej: Queso Costeño Artesanal', type: 'text' },
              { name: 'descripcion', label: 'Descripción', placeholder: 'Descripción breve del producto...', type: 'text' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">{f.label}</label>
                <input
                  name={f.name}
                  value={(form as Record<string, string>)[f.name]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.name]: e.target.value }))}
                  placeholder={f.placeholder}
                  type={f.type}
                  className="w-full border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition bg-campo-crema"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">Precio (COP) *</label>
                <input
                  name="precio"
                  value={form.precio}
                  onChange={(e) => setForm((p) => ({ ...p, precio: e.target.value }))}
                  placeholder="15000"
                  type="number"
                  min="0"
                  step="500"
                  className="w-full border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition bg-campo-crema"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">Stock</label>
                <input
                  name="stock"
                  value={form.stock}
                  onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
                  placeholder="10"
                  type="number"
                  min="0"
                  className="w-full border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition bg-campo-crema"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-campo-oscuro/60 uppercase tracking-wide mb-1.5">Categoría</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))}
                className="w-full border border-campo-tierra/20 rounded-2xl px-4 py-3 text-sm text-campo-oscuro focus:outline-none focus:border-campo-verde focus:ring-2 focus:ring-campo-verde/15 transition bg-campo-crema appearance-none cursor-pointer"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Status */}
            {status && (
              <div className={`flex items-center gap-2 text-sm rounded-2xl px-4 py-3 ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {status.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-campo-verde text-campo-crema py-3.5 rounded-2xl font-bold text-sm hover:bg-campo-verde-light transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo a Supabase...</>
              ) : (
                <><Plus className="w-4 h-4" /> Publicar Producto</>
              )}
            </button>
          </form>
        </div>

        {/* ─── Products List ─── */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-campo-oscuro mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-campo-tierra" /> Inventario ({products.length})
          </h2>

          {loadingProducts ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-4 flex gap-3 animate-pulse">
                  <div className="w-14 h-14 bg-gray-200 rounded-2xl flex-shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl p-4 flex gap-3 shadow-sm hover:shadow-md transition">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-campo-tierra/10 flex-shrink-0">
                    {p.imagen_url ? (
                      <Image src={p.imagen_url} alt={p.nombre} fill className="object-cover" sizes="56px" />
                    ) : (
                      <Package className="w-6 h-6 text-campo-tierra/40 m-auto mt-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-campo-oscuro text-sm truncate">{p.nombre}</p>
                    <p className="text-campo-tierra text-sm font-bold">
                      {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p.precio)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-campo-verde/10 text-campo-verde px-2 py-0.5 rounded-full font-semibold">{p.categoria}</span>
                      <span className="text-[10px] text-campo-oscuro/40">Stock: {p.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center py-12 text-campo-oscuro/40 text-sm">
                  No hay productos todavía. ¡Añade el primero!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
