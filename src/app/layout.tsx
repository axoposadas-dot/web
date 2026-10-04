import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AXO | Una región. Todas las posibilidades.",
  description:
    "Comercio, logística y movilidad en un mismo ecosistema. Conocé la visión regional de AXO, un proyecto privado de Megasion Desarrollos INC.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "AXO · El próximo movimiento es regional.",
    description:
      "La visión de un ecosistema conectado para Posadas, Encarnación y el NEA.",
    locale: "es_AR",
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
