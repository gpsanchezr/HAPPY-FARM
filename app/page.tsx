// app/page.tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CatalogSection from '@/components/CatalogSection';
import About from '@/components/About';
import Values from '@/components/Values';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-campo-crema">
      <Navbar />
      <Hero />
      <CatalogSection />
      <Values />
      <About />
      <Footer />
      <CartSidebar />
      <WhatsAppChatWidget />
    </main>
  );
}
