/**
 * «Lo que grabo»: el marco de la derecha enseña el encargo activo.
 * Se activa al pasar el ratón o al llegar con el scroll a la mitad de la pantalla.
 * Nada flota sobre el contenido, así que no puede quedarse colgado.
 */
export function iniciarUsos() {
  const raiz = document.querySelector<HTMLElement>('[data-usos]');
  if (!raiz) return;
  const filas = Array.from(raiz.querySelectorAll<HTMLElement>('[data-uso]'));
  const fotos = Array.from(raiz.querySelectorAll<HTMLElement>('[data-foto]'));

  const activar = (i: string) => {
    filas.forEach((f) => f.classList.toggle('es-activo', f.dataset.uso === i));
    fotos.forEach((f) => f.classList.toggle('es-activo', f.dataset.foto === i));
  };

  filas.forEach((f) => f.addEventListener('pointerenter', () => activar(f.dataset.uso!)));

  const io = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => { if (e.isIntersecting) activar((e.target as HTMLElement).dataset.uso!); }),
    { rootMargin: '-45% 0px -45% 0px' },
  );
  filas.forEach((f) => io.observe(f));
}
