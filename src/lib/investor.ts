import { z } from "zod";
export const investorSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  company: z.string().trim().min(2).max(160),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(32)
    .regex(/^[+\d\s().-]+$/),
  consent: z.literal(true),
  website: z.string().max(0),
  startedAt: z.number().finite(),
  requestId: z.uuid(),
});
export function investorText(data: z.infer<typeof investorSchema>) {
  return `Solicitud de acceso inversor AXO\n\nNombre: ${data.name}\nEmail: ${data.email}\nEmpresa / perfil: ${data.company}\nTeléfono: ${data.phone}\n\nConsentimiento de contacto: aceptado\nAviso de privacidad: v1 · 2026-10-04\nReferencia: ${data.requestId}`;
}
