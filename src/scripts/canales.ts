import { estatica } from './canal';

/** Visor de tres canales de la página de grabación. */
export function iniciarCanales(reducido: boolean) {
  document.querySelectorAll<HTMLElement>('[data-canales]').forEach((raiz) => {
    const tabs = Array.from(raiz.querySelectorAll<HTMLButtonElement>('[data-canal-tab]'));
    const tomas = Array.from(raiz.querySelectorAll<HTMLElement>('[data-canal-toma]'));
    const lienzo = raiz.querySelector<HTMLCanvasElement>('canvas');
    const n = raiz.querySelector<HTMLElement>('[data-canales-n]');
    let actual = 0;

    const mostrar = (i: number) => {
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      tomas.forEach((t, k) => {
        t.classList.toggle('es-activa', k === i);
        const v = t.querySelector('video');
        if (v) { if (k === i) v.play().catch(() => {}); else v.pause(); }
      });
      if (n) n.textContent = String(i + 1);
      actual = i;
    };

    const cambiar = (i: number) => {
      if (i === actual) return;
      if (reducido || !lienzo) return mostrar(i);
      lienzo.classList.add('es-visible');
      setTimeout(() => mostrar(i), 110);
      estatica(lienzo, 260).then(() => lienzo.classList.remove('es-visible'));
    };

    tabs.forEach((t, i) => {
      t.addEventListener('click', () => cambiar(i));
      t.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const k = (i + d + tabs.length) % tabs.length;
        tabs[k].focus(); cambiar(k);
      });
    });
    mostrar(0);
  });
}
