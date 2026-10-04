import Link from "next/link";
import { Footer } from "@/components/footer";
export const metadata = { title: "Aviso legal | AXO" };
export default function Legal() {
  return (
    <>
      <main id="contenido" className="container legal-page">
        <Link href="/" className="text-link">
          Volver a AXO
        </Link>
        <h1>Aviso legal</h1>
        <h2>Proyecto privado</h2>
        <p>
          AXO es una propuesta de ecosistema de comercio, logística y movilidad
          impulsada por Megasion Desarrollos INC. Esta web presenta una visión
          de producto y un plan propuesto de implementación.
        </p>
        <h2>Demostraciones y proyecciones</h2>
        <p>
          Las interfaces, pedidos, ubicaciones, precios, ganancias estimadas y
          registros de eventos son ejemplos. No representan operaciones activas,
          usuarios reales, convenios firmados ni resultados financieros. La
          comisión objetivo de 5–8% y el roadmap requieren validación comercial,
          técnica y operativa.
        </p>
        <h2>Marcas de terceros</h2>
        <p>
          Los logotipos provienen del material suministrado para esta
          presentación. Su inclusión identifica referencias comerciales y no
          acredita acuerdos, autorización de uso, patrocinio o adhesión. Los
          derechos pertenecen a sus respectivos titulares.
        </p>
        <h2>Información para inversores</h2>
        <p>
          El contenido no constituye una oferta pública de valores,
          recomendación de inversión ni promesa de rendimiento. Cualquier
          inversión requiere información contractual, financiera y de riesgos
          específica, y evaluación independiente.
        </p>
        <h2>Comparación de mercado</h2>
        <p>
          Las referencias públicas, sus fechas y limitaciones geográficas se
          detallan en la sección Comparativa. Los escenarios del simulador
          excluyen otros costos y no equivalen a ganancias netas.
        </p>
      </main>
      <Footer />
    </>
  );
}
