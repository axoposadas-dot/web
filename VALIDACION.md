# Validación de entrega

Fecha: 4 de octubre de 2026. Entorno: Windows, Node.js 24.16.0, Chrome con Playwright.

## Comprobaciones ejecutadas

- `npm run build`: compilación optimizada y TypeScript correctos. Rutas `/`, `/legal`, `/privacidad` y `/api/investors` generadas.
- `npm run typecheck`: sin errores.
- `npm test`: 11 pruebas aprobadas. Cálculo de comisiones, límites del escenario, pago rechazado, ramas de despacho, validación del formulario, origen no autorizado, consentimiento, honeypot, tamaño, falta de configuración, confirmación/fallo/timeout del proveedor y límite de solicitudes.
- Navegador: simulador de comisiones y tres perfiles, publicación demo con cadete propio, aceptación de entrega demo, selector Market / Move.
- Navegador: trazabilidad con pago rechazado, secuencia hasta entrega confirmada, selección de logística, reproducir, pausar y reiniciar.
- Navegador: filtros de marcas, selección principal y catálogo ampliado.
- Navegador: formulario sin proveedor devuelve un error visible; un envío exitoso se comprobó con respuesta interceptada de prueba. No se enviaron correos reales.
- Navegador: menú móvil y enlaces legales.
- Anchos 320, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal de página. La tabla comparativa tiene desplazamiento horizontal propio en móvil.
- Revisión visual de portada de escritorio y móvil, y módulo de marcas. No se registraron errores JavaScript en el recorrido final.

## Límites

No se ejecutó un despliegue en una cuenta Vercel ni un envío real de Resend porque no se suministraron accesos. Tampoco se conectaron pagos, geolocalización, pedidos reales ni Sumo Envíos. El proyecto documenta de forma explícita esas dependencias y no las presenta como operaciones activas.
