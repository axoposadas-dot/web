import { z } from 'zod';
export const investorSchema = z.object({
  name: z.string().trim().min(2, 'Ingresá tu nombre completo.').max(100),
  email: z.email('Ingresá un email válido.').max(254),
  company: z.string().trim().min(2, 'Indicá tu empresa o perfil.').max(150),
  phone: z.string().trim().min(7, 'Ingresá un teléfono válido.').max(30).regex(/^\+?[\d\s().-]+$/, 'Ingresá un teléfono válido.').refine(v => v.replace(/\D/g, '').length >= 7, 'Ingresá al menos 7 dígitos.'),
  consent: z.literal(true, { error: 'Necesitamos tu consentimiento para contactarte.' }),
  website: z.string().max(0).optional(),
});
export type InvestorInput = z.infer<typeof investorSchema>;
