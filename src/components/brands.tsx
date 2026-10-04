"use client";
import { useState } from "react";
import { SectionTitle } from "./ui";
import brands from "@/data/brands.json";
const categories = [
  "Todas",
  "Tecnología",
  "Automotriz & Movilidad",
  "Turismo & Hotelería",
  "Retail & Consumo",
];
export function Brands() {
  const [category, setCategory] = useState("Todas"),
    [extra, setExtra] = useState(false);
  return (
    <section className="brands-section section container" id="marcas">
      <SectionTitle
        eyebrow="04 / EL POTENCIAL ESTÁ ACÁ"
        title={
          <>
            Marcas que forman parte
            <br />
            de nuestra vida.
          </>
        }
        description="Un mapa de referencia del comercio y los servicios que dan identidad a la región."
      />
      <div className="brand-tabs" aria-label="Filtrar marcas por rubro">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="brand-grid">
        {brands
          .filter(
            (b) =>
              (category === "Todas" || category === b.category) &&
              (extra || b.primary),
          )
          .map((b) => (
            <div className="brand-tile" key={b.name}>
              {b.file ? (
                <img
                  src={`/logos/${b.file}`}
                  alt={b.name}
                  width={160}
                  height={60}
                  loading="lazy"
                  className={`brand-logo ${b.treatment}`}
                />
              ) : (
                <span className="text-brand">{b.name}</span>
              )}
              <span>{b.name}</span>
            </div>
          ))}
      </div>
      <div className="brand-bottom">
        <p>
          Marcas de referencia, no alianzas confirmadas. Sus nombres y logotipos
          pertenecen a sus respectivos titulares.
        </p>
        <button className="text-link" onClick={() => setExtra(!extra)}>
          {extra ? "Ver selección principal" : "Ver más marcas del archivo"}
        </button>
      </div>
    </section>
  );
}
