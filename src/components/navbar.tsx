"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./ui";
const links = [
  ["Comparativa", "comparativa"],
  ["Ecosistema", "ecosistema"],
  ["Trazabilidad", "trazabilidad"],
  ["Roadmap", "roadmap"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Navegación principal">
        <a href="#inicio" className="brand" aria-label="AXO, inicio">
          <Wordmark />
          <span className="brand-owner">
            Megasion
            <br />
            <b>Desarrollos INC.</b>
          </span>
        </a>
        <div className="desktop-links">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
        <a className="button button-small nav-cta" href="#inversores">
          Acceso inversores
        </a>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="mobile-links">
          {[...links, ["Acceso inversores", "inversores"]].map(
            ([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ),
          )}
        </div>
      )}
    </header>
  );
}
