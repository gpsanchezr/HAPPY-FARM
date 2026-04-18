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
  );
}
