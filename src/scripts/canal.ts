/**
 * Cambio de canal: la estática de unas gafas FPV analógicas al saltar de una página a otra.
 * También se usa dentro de un marco (visor de drones en grabación).
 */
const NOMBRES: Record<string, string> = { '': 'INICIO', grabacion: 'GRABACIÓN', taller: 'TALLER', videografos: 'VIDEÓGRAFOS' };

/** Pinta estática en un canvas durante `ms` milisegundos. */
export function estatica(canvas: HTMLCanvasElement, ms: number): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.resolve();
  const w = (canvas.width = 192), h = (canvas.height = 108);
  const img = ctx.createImageData(w, h);
  const fin = performance.now() + ms;
  return new Promise((ok) => {
    const cuadro = () => {
      const d = img.data;
      for (let y = 0; y < h; y++) {
        const banda = Math.random() < 0.06 ? 60 : 0; // líneas de arrastre
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const v = Math.random() * 190 + banda;
          d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      if (performance.now() < fin) requestAnimationFrame(cuadro); else ok();
    };
    cuadro();
  });
}

export function iniciarCanal(reducido: boolean) {
  const html = document.documentElement;
  const capa = document.querySelector<HTMLElement>('[data-canal]');
  const canvas = capa?.querySelector('canvas');
  const txt = capa?.querySelector<HTMLElement>('[data-canal-txt]');
  if (!capa || !canvas) return;

  const ocultar = () => { html.classList.remove('js-canal'); capa.classList.remove('es-visible'); };

  // Llegada: si venimos de otra página de la web, un golpe corto de estática y fuera
  if (html.classList.contains('js-canal')) {
    try { if (txt) txt.textContent = sessionStorage.getItem('altivis-canal') || ''; sessionStorage.removeItem('altivis-canal'); } catch (e) { /* */ }
    estatica(canvas, 240).then(ocultar);
  }
  window.addEventListener('pageshow', (e) => { if (e.persisted) ocultar(); });
  if (reducido) return;

  // Salida: estática antes de navegar a otra página interna
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest?.('a');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault();
    const seg = url.pathname.replace(/\/$/, '').split('/').pop() || '';
    const canales = ['', 'grabacion', 'taller'];
    const legal = ['aviso-legal', 'privacidad', 'videografos'].includes(seg);
    const n = canales.includes(seg) ? canales.indexOf(seg) : 0;
    const etiqueta = legal ? '' : `CANAL ${n + 1} · ${NOMBRES[canales[n]]}`;
    if (txt) txt.textContent = etiqueta;
    try { sessionStorage.setItem('altivis-canal', etiqueta); } catch (err) { /* */ }
    capa.classList.add('es-visible');
    estatica(canvas, 300).then(() => { location.href = url.href; });
  });
}
