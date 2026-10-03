import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: 'AXO | El próximo movimiento de la región',
  description: 'Comercio, logística y movilidad en un ecosistema regional. Conocé AXO, el proyecto privado de Megasion Desarrollos INC. para Posadas, Encarnación y el NEA.',
  openGraph: { title: 'AXO | El próximo movimiento de la región', description: 'Una región. Tres motores. Un mismo ecosistema.', locale: 'es_AR', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><a className="skip-link" href="#contenido">Saltar al contenido</a>{children}</body></html>;
}
