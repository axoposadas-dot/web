export function RegionMap({
  progress = 0,
  hero = false,
}: {
  progress?: number;
  hero?: boolean;
}) {
  return (
    <div className={`region-map ${hero ? "hero-map" : ""}`}>
      <svg
        viewBox="0 0 620 440"
        role="img"
        aria-label="Esquema regional de Posadas y Encarnación, sin escala cartográfica"
      >
        <defs>
          <pattern
            id={hero ? "grid-h" : "grid-t"}
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="#263d50"
              strokeWidth=".65"
            />
          </pattern>
          <linearGradient id={hero ? "river-h" : "river-t"} x1="0" x2="1">
            <stop stopColor="#12334b" />
            <stop offset="1" stopColor="#145664" />
          </linearGradient>
        </defs>
        <rect width="620" height="440" fill={hero ? "#101d2d" : "#0c1927"} />
        <rect
          width="620"
          height="440"
          fill={`url(#${hero ? "grid-h" : "grid-t"})`}
        />
        <path
          d="M-30 88 C95 66 153 128 221 160 S310 236 386 230 S526 176 652 225 L650 310 C530 246 479 296 390 301 S245 289 170 231 S70 166 -30 169Z"
          fill={`url(#${hero ? "river-h" : "river-t"})`}
        />
        <g stroke="#294453" fill="none" strokeWidth="2">
          <path d="m38 337 211-15 45 95M85 230l49 193M18 381l309-27M129 278l143 120M331 47l30 108 176-10M436 35l-15 155M305 104l275-16M351 148l-88 115" />
          <path d="m374 115-99 158" stroke="#55949c" strokeWidth="5" />
        </g>
        <text x="384" y="66" className="map-country">
          PARAGUAY
        </text>
        <text x="38" y="410" className="map-country">
          ARGENTINA
        </text>
        <text
          x="76"
          y="157"
          className="river-label"
          transform="rotate(24 76 157)"
        >
          RÍO PARANÁ
        </text>
        <path d="m120 325 70-5 52-42 50 33 85 17" className="map-route" />
        <circle
          cx={progress >= 4 ? 377 : progress >= 3 ? 292 : 120}
          cy={progress >= 4 ? 328 : progress >= 3 ? 311 : 325}
          r="18"
          fill="#00f2fe"
          opacity=".1"
        />
        <circle
          cx={progress >= 4 ? 377 : progress >= 3 ? 292 : 120}
          cy={progress >= 4 ? 328 : progress >= 3 ? 311 : 325}
          r="6"
          fill="#00f2fe"
        />
        <circle cx="377" cy="328" r="5" fill="#10dca7" />
        <g fill="#f1f8fc">
          <circle cx="255" cy="284" r="5" />
          <circle cx="377" cy="112" r="5" />
          <text x="245" y="265" className="map-city">
            Posadas
          </text>
          <text x="392" y="117" className="map-city">
            Encarnación
          </text>
        </g>
        <text x="95" y="357" className="map-small">
          Comercio
        </text>
        <text x="392" y="334" className="map-small">
          Destino
        </text>
      </svg>
      <span className="map-disclaimer">
        Esquema conceptual · ruta local simulada
      </span>
    </div>
  );
}
