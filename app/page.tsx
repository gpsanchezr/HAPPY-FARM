import ClientProviders from '@/components/ClientProviders';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import CatalogSection from '@/components/CatalogSection';
import About from '@/components/About';
import Values from '@/components/Values';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';

export default function Home() {
  return (
    <ClientProviders>
      <main className="min-h-screen bg-campo-crema">
        <Navbar />
        <Hero />
        
        {/* Sección del Carrusel Destacado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-campo-verde mb-8 text-center font-serif">
            Nuestros Destacados
          </h2>
          <ProductCarousel />
        </div>

        <CatalogSection />
        <About />
        <Values />
        <Footer />

        {/* Widgets y Asistente */}
        <CartSidebar />
        <WhatsAppChatWidget />
      </main>
    </ClientProviders>
  );
}
