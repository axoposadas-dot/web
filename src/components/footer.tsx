import Link from "next/link";
import { Wordmark } from "./ui";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="/#inicio" className="brand">
            <Wordmark />
            <span className="brand-owner">
              Megasion
              <br />
              <b>Desarrollos INC.</b>
            </span>
          </a>
          <p>
            Pensado en la región.
            <br />
            <span>Diseñado para conectar.</span>
          </p>
          <a href="/#inicio" className="text-link">
            Volver al inicio ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Megasion Desarrollos INC. Todos los
            derechos reservados.
          </span>
          <div>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/legal">Aviso legal</Link>
          </div>
        </div>
        <p className="fine-print">
          AXO es un proyecto privado en desarrollo. Las interfaces, operaciones
          y cifras de ejemplo son demostrativas. Las marcas mencionadas no
          implican patrocinio, adhesión ni relación comercial.
        </p>
      </div>
    </footer>
  );
}
