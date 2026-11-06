/** Diagrama del taller: elige una pieza, mira qué le pasa y pide diagnóstico. */
export function iniciarDron() {
  const raiz = document.querySelector<HTMLElement>('[data-dron]');
  if (!raiz) return;
  const partes = raiz.querySelectorAll<SVGGElement>('[data-parte]');
  const botones = raiz.querySelectorAll<HTMLButtonElement>('[data-pieza]');
  const fichas = raiz.querySelectorAll<HTMLElement>('[data-ficha]');

  const elegir = (id: string) => {
    partes.forEach((p) => p.classList.toggle('es-activa', p.dataset.parte === id));
    botones.forEach((b) => {
      const activo = b.dataset.pieza === id;
      b.classList.toggle('es-activa', activo);
      if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', String(activo));
    });
    fichas.forEach((f) => (f.hidden = f.dataset.ficha !== id));
  };

  botones.forEach((b) => b.addEventListener('click', () => elegir(b.dataset.pieza!)));
  partes.forEach((p) => {
    p.style.cursor = 'pointer';
    p.addEventListener('click', () => elegir(p.dataset.parte!));
  });

  raiz.querySelectorAll<HTMLAnchorElement>('[data-pedir]').forEach((a) =>
    a.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('altivis:pieza', { detail: { servicio: a.dataset.pedir, pieza: a.dataset.piezaNombre } }));
    }),
  );

  const primera = botones[0]?.dataset.pieza;
  if (primera) elegir(primera);
}
