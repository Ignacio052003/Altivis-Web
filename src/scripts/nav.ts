import type Lenis from 'lenis';

export function iniciarNav(lenis: Lenis | null) {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  // Ocultar al bajar, mostrar al subir; fondo sólido fuera del hero; tema claro sobre secciones cal.
  let ultimo = window.scrollY;
  const secCal = Array.from(document.querySelectorAll<HTMLElement>('[data-tema="cal"]'));
  const actualizar = () => {
    const y = window.scrollY;
    const bajando = y > ultimo && y > 240;
    nav.classList.toggle('es-oculta', bajando && !nav.classList.contains('menu-abierto'));
    nav.classList.toggle('es-solida', y > 60);
    const sonda = 40;
    const sobreCal = secCal.some((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= sonda && r.bottom >= sonda;
    });
    nav.classList.toggle('es-cal', sobreCal);
    ultimo = y;
  };
  window.addEventListener('scroll', actualizar, { passive: true });
  actualizar();

  // Menú móvil
  const menu = nav.querySelector<HTMLElement>('[data-menu]');
  const abrir = nav.querySelector<HTMLButtonElement>('[data-menu-abrir]');
  const cerrar = nav.querySelector<HTMLButtonElement>('[data-menu-cerrar]');
  if (!menu || !abrir || !cerrar) return;
  const set = (abierto: boolean) => {
    menu.hidden = !abierto;
    abrir.setAttribute('aria-expanded', String(abierto));
    nav.classList.toggle('menu-abierto', abierto);
    document.body.style.overflow = abierto ? 'hidden' : '';
    if (abierto) { lenis?.stop(); cerrar.focus(); } else { lenis?.start(); abrir.focus(); }
  };
  abrir.addEventListener('click', () => set(true));
  cerrar.addEventListener('click', () => set(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) set(false); });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
}
