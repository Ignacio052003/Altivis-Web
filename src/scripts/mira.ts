import { gsap } from 'gsap';

/** Mira que acompaña al cursor en escritorio. El cursor normal se mantiene. */
export function iniciarMira(reducido: boolean) {
  const mira = document.querySelector<HTMLElement>('[data-mira]');
  if (!mira || reducido || !window.matchMedia('(pointer: fine)').matches) return;
  const x = gsap.quickTo(mira, 'x', { duration: 0.35, ease: 'power3.out' });
  const y = gsap.quickTo(mira, 'y', { duration: 0.35, ease: 'power3.out' });
  let vista = false;
  window.addEventListener('pointermove', (e) => {
    x(e.clientX); y(e.clientY);
    if (!vista) { vista = true; mira.classList.add('es-visible'); }
    const el = (e.target as HTMLElement).closest?.('a, button, summary, label, select, input, textarea, [data-parte]');
    mira.classList.toggle('es-sobre', !!el);
    mira.classList.toggle('es-texto', !!el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  }, { passive: true });
  document.addEventListener('pointerleave', () => { vista = false; mira.classList.remove('es-visible'); });
  window.addEventListener('pointerdown', () => mira.classList.add('es-pulsada'));
  window.addEventListener('pointerup', () => mira.classList.remove('es-pulsada'));
}
