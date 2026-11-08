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

  // Vídeos (archivos en /public/video/). Si es null se usa la foto.
  // Pon junto a cada vídeo una imagen .jpg con el mismo nombre (su primer fotograma):
  // se ve mientras el vídeo carga.
  // Recomendado: MP4 H.264, 1920×1080, 10–15 s en bucle, sin sonido, < 6 MB.
  video: {
    portada: '/video/01-cabecera.mp4' as string | null, // provisional (Pixabay)
    puertaGrabacion: '/video/02a-puerta-grabacion.mp4' as string | null, // provisional (Pixabay)
    puertaTaller: null as string | null,
    grabacion: null as string | null,
    taller: null as string | null,
    // Comparativa de grabación: el mismo tipo de sitio con cada dron
    dronNormal: null as string | null,
    fpv: null as string | null,
    cinewhoop: null as string | null,
  },

  // Plazo habitual de entrega de un vídeo, p. ej. '7 días'. Si es null no se muestra.
  plazoEntrega: null as string | null,

  // Cloudflare Web Analytics (gratis, sin cookies). Pega aquí el token.
  analyticsToken: null as string | null,
};

export const whatsappUrl = (texto?: string) =>
  `https://wa.me/${site.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
