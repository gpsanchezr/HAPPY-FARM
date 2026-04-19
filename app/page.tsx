<<<<<<< HEAD
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
=======
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import CatalogSection from "@/components/CatalogSection";
import About from "@/components/About";
import Values from "@/components/Values";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export default function Home() {
  return (
    <ClientProviders>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <ProductCarousel />
        <CatalogSection />
        <About />
        <Values />
        <Footer />
      </main>
    </ClientProviders>
>>>>>>> c52522c717933bb1ab82d9413fec7dc1719f5321
  );
}
