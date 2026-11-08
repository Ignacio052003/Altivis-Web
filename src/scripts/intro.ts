import type Lenis from 'lenis';
import { gsap } from 'gsap';

/** Secuencia de armado (primera visita de la sesión) y, después, entrada del hero. */
export function iniciarIntro(lenis: Lenis | null, alTerminar: () => void) {
  const html = document.documentElement;
  const intro = document.querySelector<HTMLElement>('[data-intro]');

  const entrada = () => {
    alTerminar();
    const hero = document.querySelector('[data-hero]');
    if (!hero || !html.classList.contains('animar')) return;
    const lineas = hero.querySelectorAll('[data-linea]');
    const resto = hero.querySelectorAll('[data-entra]');
    const media = hero.querySelector('[data-hero-media]');
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (media) tl.fromTo(media, { scale: 1.18, filter: 'brightness(0.2)' }, { scale: 1, filter: 'brightness(1)', duration: 2.2, ease: 'power3.out' }, 0);
    // y: 0 explícito: si no, GSAP convierte el translateY(105%) del CSS en píxeles y la línea no vuelve.
    if (lineas.length) tl.fromTo(lineas, { y: 0, yPercent: 105 }, { y: 0, yPercent: 0, duration: 1.4, stagger: 0.09 }, 0.25);
    if (resto.length) tl.fromTo(resto, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.8);
  };

  if (!intro || !html.classList.contains('js-intro')) {
    entrada();
    return;
  }

  lenis?.stop();
  const motores = intro.querySelectorAll<HTMLElement>('[data-motor]');
  const estado = intro.querySelector<HTMLElement>('[data-intro-estado]');
  const tl = gsap.timeline({
    onComplete: () => {
      html.classList.remove('js-intro');
      try { sessionStorage.setItem('altivis-armado', '1'); } catch (e) { /* sin almacenamiento */ }
      lenis?.start();
    },
  });

  motores.forEach((m, i) => {
    tl.to(m, { '--p': 1, duration: 0.32, ease: 'power2.inOut' }, 0.15 + i * 0.12);
  });
  tl.add(() => { if (estado) { estado.textContent = 'ARMADO'; estado.classList.add('es-armado'); } }, 0.95);
  tl.to(intro, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, 1.35);
  tl.add(entrada, 1.55);
}
