# Verificación de entrega

Fecha: 3 de octubre de 2026.

- Compilación de producción `npm run build`: correcta. Next.js 16.3.8, App Router y comprobación TypeScript estricta.
- `npm test`: 4 pruebas aprobadas. Datos válidos, entradas inválidas, consentimiento, campo trampa, origen externo, límite de tamaño, ausencia de configuración, aceptación del webhook y errores del proveedor.
- Navegador Chrome sin interfaz: vista de escritorio y móvil; sin errores JavaScript de página.
- Anchos 320, 390, 768, 1024 y 1440 px: sin desbordamiento horizontal del documento.
- Menú móvil: apertura, navegación al formulario y cierre correctos.
- Tarjetas de ecosistema: expansión correcta.
- Formulario sin configurar: aviso de indisponibilidad correcto, conserva los datos para reintentar.
- Confirmación del formulario: verificada mediante respuesta simulada local. No se transmitieron solicitudes a un servicio externo.
- Rutas `/privacidad` y `/aviso-legal`: HTTP 200.
- Capturas de escritorio y móvil revisadas visualmente.

La entrega no incluye un despliegue público ni credenciales de CRM. El envío real requiere configurar el webhook HTTPS y su token en Vercel. La prueba integral de recepción deberá realizarse contra ese receptor una vez configurado.
