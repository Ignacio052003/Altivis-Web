/** Ruta interna respetando el `base` (necesario para la vista previa en GitHub Pages). */
export const u = (ruta: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpia = ruta.startsWith('/') ? ruta : `/${ruta}`;
  return `${base}${limpia}` || '/';
};

export const formatoPrecio = (precio: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(precio);
