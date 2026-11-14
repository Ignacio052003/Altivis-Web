import type Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function iniciarEscenas(reducido: boolean, lenis: Lenis | null) {
  if (reducido) return;
  hero(lenis);
  palabras();
  tira();
  montaje();
  ScrollTrigger.refresh();
}

/** Hero: alabeo con el ratón (como un FPV que gira) y picado al hacer scroll. */
function hero(lenis: Lenis | null) {
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

  const primera = hero.querySelector<HTMLElement>('[data-hero-primera]') ?? hero;
  const sombra = hero.querySelector<HTMLElement>('[data-hero-sombra]');
  const osd = hero.querySelector<HTMLElement>('[data-hero-osd]');
  const continua = hero.offsetHeight > primera.offsetHeight * 1.2;

  if (picado) {
    gsap.to(picado, {
      scale: continua ? 1.5 : 1.32, yPercent: continua ? 0 : 10, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
  if (texto) {
    gsap.to(texto, {
      y: -140, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: primera, start: '25% top', end: '85% top', scrub: true },
    });
  }
  if (osd) gsap.to(osd, { opacity: 0, ease: 'none', scrollTrigger: { trigger: primera, start: '30% top', end: '80% top', scrub: true } });
  // Si el hero continúa (portada), el vídeo sigue volando de fondo, más oscuro, mientras se lee el manifiesto
  if (sombra && continua) {
    gsap.to(sombra, { opacity: 0.74, ease: 'none', scrollTrigger: { trigger: primera, start: '35% top', end: 'bottom top', scrub: true } });
  }

  // El scroll es el acelerador: cuanto más rápido bajas, más rápido vuela el vídeo
  const video = hero.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (video && lenis) {
    let ritmo = 1;
    gsap.ticker.add(() => {
      const r = hero.getBoundingClientRect();
      if (r.bottom < 0) return;
      const objetivo = 1 + Math.min(2.2, Math.abs(lenis.velocity) * 0.07);
      ritmo += (objetivo - ritmo) * 0.08;
      const v = Math.round(ritmo * 20) / 20;
      if (Math.abs(video.playbackRate - v) > 0.04) { try { video.playbackRate = v; } catch (e) { /* no admitido */ } }
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
    // Los fotogramas se inclinan un poco con la velocidad, como una tira que pasa deprisa
    const inclina = gsap.quickTo(pista.querySelectorAll('.fotograma__img'), 'skewX', { duration: 0.5, ease: 'power3.out' });
    const st = ScrollTrigger.create({ trigger: sec, start: 'top bottom', end: () => `+=${distancia() + window.innerHeight * 2}`, onUpdate: (self) => inclina(gsap.utils.clamp(-7, 7, self.getVelocity() / -260)) });
    const barra = sec.querySelector<HTMLElement>('[data-tira-progreso]');
    if (barra) gsap.fromTo(barra, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${distancia()}`, scrub: true } });
    return () => { tween.kill(); st.kill(); };
  });
}

/** El dron llega despiezado y se monta a medida que entras en la sección. */
function montaje() {
  document.querySelectorAll<HTMLElement>('[data-montaje]').forEach((sec) => {
    const svg = sec.querySelector<SVGSVGElement>('[data-dron-svg]');
    if (!svg) return;
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: { trigger: svg, start: 'top 95%', end: 'center 46%', scrub: 0.6 },
    });
    svg.querySelectorAll<SVGGElement>('[data-explota]').forEach((g) => {
      const [dx, dy] = (g.dataset.explota || '0,0').split(',').map(Number);
      tl.fromTo(g, { x: dx, y: dy }, { x: 0, y: 0 }, 0);
    });
    const giro = Number(sec.dataset.montajeGiro || 0);
    if (giro) tl.fromTo(svg, { rotation: giro, transformOrigin: '50% 50%' }, { rotation: 0 }, 0);
    const puntos = sec.querySelectorAll('.dron__punto');
    if (puntos.length) tl.fromTo(puntos, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.85);
  });
}
