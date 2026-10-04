import Link from "next/link";
import { Footer } from "@/components/footer";
export const metadata = { title: "Privacidad | AXO" };
export default function Privacy() {
  return (
    <>
      <main id="contenido" className="container legal-page">
        <Link href="/" className="text-link">
          Volver a AXO
        </Link>
        <h1>Aviso de privacidad</h1>
        <p>Versión 1 · 4 de octubre de 2026</p>
        <h2>Finalidad y datos</h2>
        <p>
          El formulario solicita nombre, email, empresa o perfil y teléfono para
          que el equipo de Megasion Desarrollos INC. gestione tu interés en AXO
          y coordine una conversación. No se solicitan datos de pago ni
          documentación de inversión.
        </p>
        <h2>Envío y acceso</h2>
        <p>
          Cuando el canal está habilitado, la información se remite al buzón
          privado configurado por el responsable mediante Resend. El alojamiento
          se realiza en el proveedor seleccionado por el responsable. Estos
          proveedores pueden procesar información fuera de tu país. El
          formulario informa si no puede realizar el envío.
        </p>
        <h2>Conservación y derechos</h2>
        <p>
          Los datos deben utilizarse únicamente para atender la solicitud y
          conservarse durante el tiempo necesario para ese fin. Podés retirar tu
          consentimiento y solicitar acceso, rectificación o eliminación
          respondiendo al contacto del equipo. No se incorporan herramientas
          publicitarias ni cookies de analítica en esta versión.
        </p>
        <h2>Estado de esta edición</h2>
        <p>
          Esta es una edición de presentación privada. Antes de habilitar la
          captación pública, el responsable debe publicar su domicilio, canal
          directo para ejercer derechos y plazo concreto de conservación, además
          de validar este aviso con las jurisdicciones aplicables.
        </p>
      </main>
      <Footer />
    </>
  );
}
