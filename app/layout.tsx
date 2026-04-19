import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Del Campo a Tu Mesa | Productos Frescos del Caribe',
  description:
    'Sabor auténtico del Caribe. Productos frescos y artesanales directamente de nuestros productores a tu mesa en Barranquilla.',
  keywords: 'productos frescos, orgánicos, caribe, barranquilla, del campo a tu mesa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Arvo:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-campo-crema text-campo-oscuro font-sans">
        <CartProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: 'Montserrat, sans-serif',
                background: '#2C2C2C',
                color: '#FDFBF6',
                borderRadius: '1rem',
                padding: '12px 18px',
              },
              success: {
                iconTheme: { primary: '#4A5D3B', secondary: '#FDFBF6' },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
