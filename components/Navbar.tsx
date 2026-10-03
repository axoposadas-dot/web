'use client';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
const links = [['El Proyecto', '#proyecto'], ['Ecosistema', '#ecosistema'], ['Marcas Ancla', '#marcas'], ['Roadmap', '#roadmap']] as const;
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); button.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><div className="container nav-inner">
    <a className="brand" href="#" aria-label="AXO — Megasion Desarrollos INC. — Inicio"><span className="wordmark">axo</span><span className="brand-company">MEGASION<br />DESARROLLOS INC.</span></a>
    <nav className="desktop-nav" aria-label="Navegación principal">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a className="button button-small nav-invest" href="#invertir">Invertir en AXO</a>
    <button ref={button} type="button" className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </div><nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label="Navegación móvil">{[...links, ['Invertir', '#invertir']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav></header>;
}

