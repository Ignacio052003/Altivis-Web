/**
 * Diagrama del taller: marca una o varias piezas, mira qué les pasa
 * y pide diagnóstico con todas ellas ya escritas en la ficha.
 */
export function iniciarDron() {
  const raiz = document.querySelector<HTMLElement>('[data-dron]');
  if (!raiz) return;
  const partes = raiz.querySelectorAll<SVGGElement>('[data-parte]');
  const botones = raiz.querySelectorAll<HTMLButtonElement>('[data-pieza]');
  const filas = raiz.querySelectorAll<HTMLElement>('[data-ficha]');
  const vacio = raiz.querySelector<HTMLElement>('[data-vacio]');
  const pedir = raiz.querySelector<HTMLAnchorElement>('[data-pedir]');
  const limpiar = raiz.querySelector<HTMLButtonElement>('[data-limpiar]');
  const marcadas = new Set<string>();

  const pintar = () => {
    partes.forEach((p) => p.classList.toggle('es-activa', marcadas.has(p.dataset.parte!)));
    botones.forEach((b) => {
      const activo = marcadas.has(b.dataset.pieza!);
      b.classList.toggle('es-activa', activo);
      if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', String(activo));
    });
    filas.forEach((f) => (f.hidden = !marcadas.has(f.dataset.ficha!)));
    if (vacio) vacio.hidden = marcadas.size > 0;
    if (limpiar) limpiar.hidden = marcadas.size < 2;
    if (pedir) pedir.textContent = marcadas.size > 1 ? `Pedir diagnóstico de ${marcadas.size} piezas` : 'Pedir diagnóstico';
  };

  const alternar = (id: string) => {
    if (marcadas.has(id)) marcadas.delete(id); else marcadas.add(id);
    pintar();
  };

  botones.forEach((b) => b.addEventListener('click', () => alternar(b.dataset.pieza!)));
  partes.forEach((p) => {
    p.style.cursor = 'pointer';
    p.addEventListener('click', () => alternar(p.dataset.parte!));
  });
  limpiar?.addEventListener('click', () => { marcadas.clear(); pintar(); });

  pedir?.addEventListener('click', () => {
    const elegidas = Array.from(filas).filter((f) => marcadas.has(f.dataset.ficha!));
    document.dispatchEvent(new CustomEvent('altivis:pieza', {
      detail: {
        piezas: elegidas.map((f) => f.dataset.nombre!),
        servicios: [...new Set(elegidas.map((f) => f.dataset.servicio!))],
      },
    }));
  });

  pintar();
}
