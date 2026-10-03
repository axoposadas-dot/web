'use client';
import { useRef, useState } from 'react';
import { LockKeyhole, CheckCircle2, LoaderCircle } from 'lucide-react';
import { investorSchema } from '@/lib/investor';
export default function InvestorForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const pending = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const result = investorSchema.safeParse({ ...Object.fromEntries(fields), consent: fields.get('consent') === 'on' });
    if (!result.success) { setError(result.error.issues[0].message); setStatus('error'); return; }
    pending.current = true; setStatus('sending'); setError('');
    try {
      const response = await fetch('/api/investors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(result.data), signal: AbortSignal.timeout(12000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No pudimos registrar la solicitud.');
      setStatus('success'); form.reset();
    } catch (err) { setError(err instanceof Error && err.name !== 'TimeoutError' ? err.message : 'La conexión tardó demasiado. Volvé a intentarlo.'); setStatus('error'); }
    finally { pending.current = false; }
  }
  return <section id="invertir" className="section container"><div className="investor-panel"><div className="investor-copy"><p className="eyebrow"><LockKeyhole size={14} /> ACCESO PRIVADO · RONDA SEMILLA</p><h2>El futuro regional<br />se construye<br /><span>desde adentro.</span></h2><p>Conocé la visión, el modelo y la hoja de ruta de AXO. Solicitá acceso a la propuesta confidencial para inversores.</p><div className="investor-note"><span>AXO / MEGASION</span><p>Una conversación para explorar<br />lo que podemos construir juntos.</p></div></div>
    <form onSubmit={submit} className="investor-form" aria-label="Solicitud de propuesta para inversores" aria-busy={status === 'sending'}><h3>Seamos parte del próximo paso.</h3><p>Dejanos tus datos para iniciar la conversación.</p><div className="form-fields">
      <label htmlFor="name">Nombre completo<input id="name" name="name" autoComplete="name" placeholder="Tu nombre y apellido" required minLength={2} maxLength={100} /></label>
      <label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" placeholder="nombre@empresa.com" required maxLength={254} /></label>
      <label htmlFor="company">Empresa / Perfil<input id="company" name="company" autoComplete="organization" placeholder="Empresa o inversor particular" required minLength={2} maxLength={150} /></label>
      <label htmlFor="phone">Teléfono<input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+54 9 376 000 0000" required minLength={7} maxLength={30} /></label>
      <div className="honeypot" aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    </div><label className="consent"><input type="checkbox" name="consent" required /><span>Acepto que Megasion Desarrollos INC. utilice mis datos para contactarme sobre AXO. Leí el <a href="/privacidad">aviso de privacidad</a>.</span></label>
    <button className="button w-full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle className="animate-spin" size={17} /> Enviando solicitud…</> : 'Solicitar propuesta confidencial'}</button>
    <div aria-live="polite" aria-atomic="true">{status === 'success' && <p className="form-success"><CheckCircle2 size={18} /> Solicitud recibida. El equipo revisará tus datos para contactarte.</p>}{status === 'error' && <p className="form-error" role="alert">{error}</p>}</div><p className="form-caption"><LockKeyhole size={12} /> Tus datos se utilizarán para gestionar esta solicitud.</p></form></div></section>;
}
