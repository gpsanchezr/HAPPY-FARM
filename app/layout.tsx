import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  generator: "Giseella Sanchez - HAPPY FARM Project",
  title: "Nación Campo Verde - Productos Frescos del Campo",
  description: "Fuerza rural, corazón ecológico. Productos frescos y naturales directamente del campo a tu hogar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
