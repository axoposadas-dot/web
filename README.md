# AXO · Landing institucional

Next.js App Router + React + TypeScript estricto + Tailwind CSS 4. Diseño azul noche, tipografía Manrope alojada localmente y componentes independientes. Preparada para Vercel; no se necesita una exportación estática ni un `vercel.json`.

## Inicio

Requiere Node.js 22 o superior y npm.

```bash
npm ci
npm run dev
```

Abrir `http://localhost:3000`.

```bash
npm test
npm run typecheck
npm run build
npm start
```

`package-lock.json` fija las versiones verificadas. No se incluyen dependencias ni archivos de compilación dentro del ZIP de entrega.

## Desplegar en Vercel

1. Subir esta carpeta a un repositorio Git propio e importarlo en Vercel.
2. Seleccionar Next.js, Node.js 22 o superior, instalación `npm ci` y build `npm run build`. La carpeta raíz debe ser la que contiene este README y `package.json`.
3. Copiar las variables de `.env.example` a Settings → Environment Variables. Configurar `SITE_URL` con el origen HTTPS exacto de producción, sin ruta. Cada entorno Preview necesita su propio origen si se desea probar el formulario allí.
4. Desplegar. La página es prerenderizada y `/api/investors` se ejecuta como función Node.js.
5. Completar la identidad y datos de privacidad de la empresa antes de captar solicitudes públicas. La página incluye `noindex` por tratarse de una presentación privada; esto no es autenticación. Activar Deployment Protection si el acceso al sitio debe ser restringido. Para indexación pública, modificar `metadata.robots` en `src/app/layout.tsx`.

Documentación: [Next.js en Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

## Formulario de inversores

El formulario llama a un endpoint real. El envío usa [Resend](https://resend.com/docs/api-reference/emails/send-email), requiere una cuenta y un dominio remitente verificado:

| Variable                                              | Uso                                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `RESEND_API_KEY`                                      | Clave privada del proveedor de correo                                                            |
| `INVESTOR_FROM`                                       | Remitente verificado, por ejemplo `AXO <inversores@dominio-propio.com>`                          |
| `INVESTOR_TO`                                         | Buzón del equipo que recibe las solicitudes                                                      |
| `SITE_URL`                                            | Origen exacto autorizado del sitio                                                               |
| `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` | Opcionales, activar ambas para limitar a tres solicitudes por email/hora en múltiples instancias |

Las variables secretas nunca usan el prefijo `NEXT_PUBLIC_`. Sin configuración de correo la API responde 503 y la interfaz explica que el canal aún no está habilitado. No se finge éxito ni se almacenan datos personales en el navegador. La solicitud solo se confirma después del recibo del proveedor; ese recibo no garantiza entrega final al buzón.

Incluye validación Zod, consentimiento obligatorio, honeypot, control de origen, límite de cuerpo, timeout, clave de idempotencia por solicitud y manejo de errores. El rate limit por email es una mitigación básica, no defensa completa contra bots; para captación pública conviene activar también reglas de Vercel Firewall. Las pruebas de envío usan mocks y no envían correos reales.

## Estructura

```text
src/
  app/
    page.tsx                 Composición de la landing
    layout.tsx               Metadatos, fuentes y accesibilidad
    globals.css              Tailwind y sistema visual responsivo
    api/investors/route.ts    Envío server-side
    privacidad/page.tsx      Aviso de privacidad editable
    legal/page.tsx           Alcance de la presentación
  components/
    navbar.tsx               Navegación desktop / móvil
    hero.tsx                 Presentación institucional
    comparison.tsx           Tabla, simulador y fuentes
    ecosystem.tsx            Tres perfiles con acciones demo
    trace.tsx                Recorrido y eventos de demostración
    region-map.tsx           Diagrama geográfico conceptual SVG
    brands.tsx               Grilla filtrable por rubro
    model-roadmap.tsx        Modelo económico y etapas
    investor-form.tsx        Formulario y estados de envío
    footer.tsx               Pie y enlaces legales
    ui.tsx                   Identidad y elementos compartidos
  data/brands.json            Catálogo, fuente y tratamiento de logos
  lib/                       Validación y lógica de cálculo / trazabilidad
public/logos/                Archivos aportados por el usuario
tests/core.test.ts           Pruebas de cálculos, flujo y API
```

## Alcance y evidencia

- La web institucional funciona; las apps comerciales, GPS, pagos y Sumo Envíos se muestran como demos locales, no como integraciones productivas.
- La trazabilidad permite reproducir, pausar, avanzar, reiniciar, elegir envío propio / Sumo y simular pago rechazado. El rechazo impide el despacho.
- El 5–8% es una comisión objetivo propuesta por AXO. El 25–35% es un escenario de sensibilidad del brief, no una tarifa universal atribuida a PedidosYa o Uber.
- Uber Eats EE. UU. publica planes 20%, 25% y 30%, con condiciones y cargos adicionales. PedidosYa Argentina publica un modelo por comisión sin tasa única en la página consultada. La fuente, fecha y ámbito están disponibles en la web y en `FUENTES.md`.
- Las marcas son referencias de mercado, no acuerdos confirmados. No se han acreditado permisos de marca. Se usan nombres tipográficos para AXION, YPF, Río Uruguay y Aerolíneas Argentinas porque esos logos no estaban en el ZIP.
- Se eligió una versión por marca cuando había duplicados. El catálogo incluye una selección principal de 16 marcas y 17 adicionales. El tratamiento monocromático se aplica por CSS, conservando los originales y su trazabilidad en el catálogo. No hay un logo AXO en el ZIP: se utiliza una identidad tipográfica provisional.
- Roadmap y monetización son hipótesis; no se inventan métricas de tracción, clientes, capital recaudado ni compromisos de liquidación.

## Próxima integración operativa

Para convertir el circuito demo en operación real: proveedor de pagos con webhooks firmados, persistencia transaccional de pedidos y eventos, outbox para despacho, claves de idempotencia, reintentos, autenticación por rol, integración contractual/API de Sumo y canal de ubicación consentida. Estas piezas están documentadas en `ARQUITECTURA.md`; no están simuladas como servicios activos.
