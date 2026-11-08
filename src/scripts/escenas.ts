import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function iniciarEscenas(reducido: boolean) {
  if (reducido) return;
  hero();
  palabras();
  tira();
  ScrollTrigger.refresh();
}

/** Hero: alabeo con el ratón (como un FPV que gira) y picado al hacer scroll. */
function hero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const picado = hero.querySelector<HTMLElement>('[data-hero-picado]');
  const alabeo = hero.querySelector<HTMLElement>('[data-hero-alabeo]');
  const horizonte = hero.querySelector<HTMLElement>('[data-horizonte]');
  const texto = hero.querySelector<HTMLElement>('[data-hero-texto]');

  if (alabeo && window.matchMedia('(pointer: fine)').matches) {
    gsap.set(alabeo, { scale: 1.08 });
    const rot = gsap.quickTo(alabeo, 'rotation', { duration: 1.2, ease: 'power3.out' });
    const mx = gsap.quickTo(alabeo, 'x', { duration: 1.2, ease: 'power3.out' });
    const my = gsap.quickTo(alabeo, 'y', { duration: 1.2, ease: 'power3.out' });
    const hRot = horizonte ? gsap.quickTo(horizonte, 'rotation', { duration: 0.9, ease: 'power3.out' }) : null;
    const hY = horizonte ? gsap.quickTo(horizonte, 'y', { duration: 0.9, ease: 'power3.out' }) : null;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      rot(nx * -2.4); mx(nx * -28); my(ny * -18);
      hRot?.(nx * 9); hY?.(ny * 40);
    });
    hero.addEventListener('pointerleave', () => { rot(0); mx(0); my(0); hRot?.(0); hY?.(0); });
  }

  if (picado) {
    gsap.to(picado, {
      scale: 1.32, yPercent: 10, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
  if (texto) {
    gsap.to(texto, {
      y: -140, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: hero, start: '25% top', end: '85% top', scrub: true },
    });
  }
}

/** Texto que se "enciende" palabra a palabra al leerlo. */
function palabras() {
  document.querySelectorAll<HTMLElement>('[data-palabras]').forEach((el) => {
    const nodos = Array.from(el.childNodes);
    el.textContent = '';
    nodos.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        (n.textContent || '').split(/(\s+)/).forEach((trozo) => {
          if (!trozo) return;
          if (/^\s+$/.test(trozo)) { el.append(trozo); return; }
          const s = document.createElement('span');
          s.className = 'palabra';
          s.textContent = trozo;
          el.append(s);
        });
      } else {
        (n as HTMLElement).classList?.add('palabra');
        el.append(n);
      }
    });
    gsap.fromTo(el.querySelectorAll('.palabra'), { opacity: 0.16 }, {
      opacity: 1, stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true },
    });
  });
}

/** Tira de fotogramas: scroll vertical convertido en avance horizontal. */
function tira() {
  const sec = document.querySelector<HTMLElement>('[data-tira]');
  const pista = sec?.querySelector<HTMLElement>('[data-tira-pista]');
  if (!sec || !pista) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const distancia = () => pista.scrollWidth - window.innerWidth;
    const tween = gsap.to(pista, {
      x: () => -distancia(), ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${distancia()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    const barra = sec.querySelector<HTMLElement>('[data-tira-progreso]');
    if (barra) gsap.fromTo(barra, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${distancia()}`, scrub: true } });
    return () => tween.kill();
  });
}
