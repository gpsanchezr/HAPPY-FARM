// types/index.ts

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  categoria: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id?: string;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_direccion: string;
  cliente_barrio: string;
  detalle_carrito: CartItem[];
  total_pago: number;
  metodo_entrega: string;
  estado: string;
  created_at?: string;
}
