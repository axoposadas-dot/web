# AXO — Investor landing

Landing institucional en español para Megasion Desarrollos INC. Next.js App Router, TypeScript estricto, Tailwind CSS 4, Lucide React e Inter autoalojada. Sin imágenes remotas ni servicios necesarios para compilar.

## Ejecutar

Requiere Node.js 20.9 o posterior (se recomienda Node 22 LTS) y npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

En PowerShell, usar `Copy-Item .env.example .env.local`. Abrir http://localhost:3000.

```bash
npm run test
npm run typecheck
npm run build
npm start
```

## Estructura

```text
app/
  layout.tsx                 Idioma, fuentes y metadata
  page.tsx                   Composición de las nueve secciones
  globals.css                Tokens y diseño responsive
  icon.svg                   Favicon AXO
  api/investors/route.ts      Envío seguro desde el servidor
  privacidad/page.tsx         Aviso de privacidad
  aviso-legal/page.tsx        Aviso institucional
components/
  Navbar.tsx
  Hero.tsx
  Diagnosis.tsx
  Ecosystem.tsx
  BrandsGrid.tsx
  BusinessModel.tsx
  Roadmap.tsx
  InvestorForm.tsx
  Footer.tsx
  SectionHeading.tsx
lib/investor.ts               Validación compartida con Zod
tests/                       Validación y contrato de API
```

## Desplegar en Vercel

1. Subir el contenido de esta carpeta a un repositorio e importarlo en Vercel.
2. Seleccionar el preset **Next.js**. Si el repositorio incluye carpetas superiores, elegir esta carpeta como **Root Directory**.
3. Usar `npm run build` y la salida predeterminada de Next.js. No configurar exportación estática: el formulario requiere una función de servidor.
4. Agregar `INVESTOR_WEBHOOK_URL` y `INVESTOR_WEBHOOK_TOKEN` como variables de servidor para los entornos deseados.
5. Configurar opcionalmente `NEXT_PUBLIC_SITE_URL` con el origen público definitivo (HTTPS, sin ruta). Volver a desplegar después de cambiar variables.
6. Probar una solicitud real y comprobar su recepción en el servicio conectado.

No se necesita un archivo vercel.json. El repositorio incluye package-lock.json para instalaciones reproducibles.

## Conectar las solicitudes

El endpoint `/api/investors` valida origen, contenido JSON, un máximo de 8 KiB, nombre, email, perfil, teléfono, consentimiento y un campo trampa. Envía un POST HTTPS al webhook configurado, con:

```http
Authorization: Bearer <INVESTOR_WEBHOOK_TOKEN>
Content-Type: application/json
```

```json
{
  "name": "María Pérez",
  "email": "maria@example.com",
  "company": "Inversora particular",
  "phone": "+54 376 4000000",
  "consent": true,
  "source": "axo-investor-landing",
  "privacyVersion": "1.0",
  "receivedAt": "2026-10-03T12:00:00.000Z"
}
```

El receptor debe autenticar el token, guardar de manera persistente la solicitud y devolver 2xx únicamente después de aceptarla. Puede ser un CRM o una automatización propia. Configurar allí deduplicación, retención y acceso autorizado. Un timeout puede ocurrir después de guardar; deduplicar por email y campaña evita registros repetidos al reintentar.

No se incluye un CRM, una base de datos ni un proveedor de correo. Sin configuración, la página compila y se sirve normalmente, pero el formulario responde 503 con un aviso honesto. La confirmación solo aparece después de una respuesta satisfactoria del receptor. Nunca se exponen tokens en el navegador ni se registran datos personales en consola.

El honeypot y la comprobación de origen no sustituyen una protección contra abuso. Antes de una campaña pública, aplicar un límite de solicitudes en Vercel Firewall o en el receptor, con almacenamiento compartido; no usar un contador en memoria en funciones serverless.

## Contenido y operación

- Las 16 marcas se presentan como objetivos/referencias: no se han proporcionado acuerdos o evidencia de interés. Actualizar esa redacción solo con respaldo comercial. Se utilizan nombres, sin logos de terceros.
- Comisiones, suscripciones y roadmap son propuestas, sin cifras ni retornos inventados.
- El diagrama del hero es conceptual; no representa cobertura activa ni integración transfronteriza ya habilitada.
- “Acceso inversores” solicita documentación; no es un portal autenticado ni expone un documento confidencial públicamente.
- Los avisos son textos base. Antes de captar datos reales, completar el canal directo de privacidad, domicilio/datos del responsable, plazos efectivos de conservación y proveedores según la operación concreta, y revisar los textos con el responsable correspondiente.
- La marca gráfica AXO es una propuesta tipográfica, no un activo corporativo suministrado.

## Diseño y accesibilidad

Paleta #0A0F1D / #00F2FE con acentos esmeralda y violeta. Navegación por anclas, menú móvil con Escape, enlace para saltar al contenido, foco visible, campos etiquetados, regiones de estado y soporte de movimiento reducido. Las tarjetas usan `details`/`summary` nativos para funcionar con teclado y sin JavaScript adicional. La fuente se empaqueta localmente.

## Referencias técnicas

- [Next.js: instalación y App Router](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS: integración con Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

Consultar `VERIFICACION.md` para los resultados ejecutados en la entrega.
