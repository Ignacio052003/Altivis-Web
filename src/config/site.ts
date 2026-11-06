/**
 * DATOS DEL NEGOCIO
 * -----------------
 * Todo lo que cambia con el tiempo está aquí. Si un dato vale `null`,
 * la web simplemente no lo muestra (no aparece ningún hueco vacío).
 */
export const site = {
  nombre: 'Altivis Studio',
  url: 'https://altivis.es',
  ciudad: 'Sevilla',

  // Contacto
  whatsapp: '34627764167', // sin "+" ni espacios
  telefono: '+34 627 764 167',
  email: 'altivisstudio@gmail.com',
  instagram: 'altivisstudio',

  // Titular (aviso legal). El NIF es obligatorio por la LSSI: rellénalo.
  titular: 'Juan Gamboa González',
  piloto: 'Juan',
  nif: null as string | null,
  domicilio: 'Calle Concha Espina, 11, 41010 Sevilla',

  // Confianza. Rellena cuando lo tengas y aparecerá en la web.
  numeroOperador: null as string | null, // p. ej. 'ESP-OP-123456789'
  seguro: null as string | null, // p. ej. 'Seguro de responsabilidad civil con Mapfre'

  // Vídeos de portada (archivos en /public/video/). Si es null se usa la foto.
  // Recomendado: MP4 H.264, 1920×1080, 10–15 s en bucle, sin sonido, < 6 MB.
  video: {
    portada: null as string | null, // p. ej. '/video/reel-portada.mp4'
    grabacion: null as string | null,
    taller: null as string | null,
  },

  // Cloudflare Web Analytics (gratis, sin cookies). Pega aquí el token.
  analyticsToken: null as string | null,
};

export const whatsappUrl = (texto?: string) =>
  `https://wa.me/${site.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
