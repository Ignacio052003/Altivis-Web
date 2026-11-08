import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { iniciarHud } from './hud';
import { iniciarIntro } from './intro';
import { iniciarNav } from './nav';
import { iniciarEscenas } from './escenas';
import { iniciarContacto } from './contacto';
import { iniciarDron } from './dron';

gsap.registerPlugin(ScrollTrigger);

const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
if (!reducido) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anclas internas con desplazamiento suave
  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = new URL(a.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const destino = document.querySelector(url.hash);
      if (!destino) return;
      e.preventDefault();
      lenis!.scrollTo(destino as HTMLElement, { offset: -20 });
      history.replaceState(null, '', url.hash);
    });
  });
}

iniciarNav(lenis);
iniciarHud(lenis, reducido);
iniciarContacto();
iniciarDron();
iniciarIntro(lenis, () => iniciarEscenas(reducido));

window.addEventListener('load', () => ScrollTrigger.refresh());
