/**
 * CONTENIDO EDITABLE
 * ------------------
 * Precios: deja `precio: null` mientras no esté decidido y la web mostrará
 * "Te lo digo tras el diagnóstico" o "A medida". Cuando haya cifra, pon el
 * número en euros con IVA incluido (p. ej. `precio: 45`).
 */
import chalet from '../assets/photos/chalet-aereo.jpg';
import coche from '../assets/photos/seguimiento-coche.jpg';
import centro from '../assets/photos/centro-educativo.jpg';
import cinewhoop from '../assets/photos/cinewhoop.jpg';

export type Precio = { precio: number | null; desde?: boolean };

/* ---------- TALLER ---------- */

export type ServicioTaller = Precio & {
  id: string;
  nombre: string;
  detalle: string;
};

export const serviciosTaller: ServicioTaller[] = [
  { id: 'diagnostico', nombre: 'Diagnóstico', detalle: 'Qué falla, cuánto cuesta y cuánto tarda. Sin compromiso.', precio: null },
  { id: 'motor', nombre: 'Cambio de motor', detalle: 'Motor que vibra, rasca o no arranca.', precio: null },
  { id: 'esc', nombre: 'ESC', detalle: 'Un motor muerto o olor a quemado tras un golpe.', precio: null },
  { id: 'controladora', nombre: 'Controladora', detalle: 'No arma, no conecta o el giroscopio se vuelve loco.', precio: null },
  { id: 'video', nombre: 'Sistema de vídeo', detalle: 'Sin imagen en las gafas, cortes o interferencias.', precio: null },
  { id: 'receptor', nombre: 'Receptor y radio', detalle: 'No enlaza, failsafe o se pierde el control.', precio: null },
  { id: 'frame', nombre: 'Brazos y frame', detalle: 'Brazo partido, soporte de cámara roto, tornillería.', precio: null },
  { id: 'configuracion', nombre: 'Configuración completa', detalle: 'Betaflight, rates, filtros, OSD, radio y vídeo.', precio: null },
  { id: 'montaje', nombre: 'Montaje a medida', detalle: 'Desde cero o con tus piezas. Configurado y probado en vuelo.', precio: null, desde: true },
  { id: 'impermeabilizacion', nombre: 'Impermeabilización', detalle: 'Barniz protector y sellado frente a humedad y salpicaduras. No lo hace sumergible.', precio: null, desde: true },
  { id: 'baterias', nombre: 'Baterías Li-ion y conectores', detalle: 'Packs a medida, cambio de XT60 y revisión.', precio: null, desde: true },
];

/** Partes del dron en el diagrama interactivo del taller. */
export const piezasDron = [
  { id: 'motor', servicio: 'motor', nombre: 'Motores', sintoma: 'Vibra, rasca, se calienta o no arranca.' },
  { id: 'esc', servicio: 'esc', nombre: 'ESC', sintoma: 'Un motor no gira o huele a quemado después de un golpe.' },
  { id: 'controladora', servicio: 'controladora', nombre: 'Controladora', sintoma: 'No arma, no conecta al ordenador o hace cosas raras en el aire.' },
  { id: 'camara', servicio: 'video', nombre: 'Cámara y transmisor', sintoma: 'Sin imagen en las gafas, imagen con cortes o con ruido.' },
  { id: 'receptor', servicio: 'receptor', nombre: 'Receptor', sintoma: 'No enlaza con la radio o entra en failsafe.' },
  { id: 'frame', servicio: 'frame', nombre: 'Brazos y frame', sintoma: 'Brazo partido, frame torcido o soporte de cámara roto.' },
  { id: 'bateria', servicio: 'baterias', nombre: 'Batería y conector', sintoma: 'XT60 suelto, cables pelados o batería hinchada.' },
] as const;

/* ---------- GRABACIÓN ---------- */

export const usosGrabacion = [
  {
    titulo: 'Bodas y eventos',
    texto: 'La llegada, la salida de la iglesia, la finca entera en un solo plano. Lo que el resto de cámaras no puede contar.',
    foto: chalet,
    alt: 'Finca con jardín y jacarandas vista desde el aire',
  },
  {
    titulo: 'Hoteles, restaurantes y espacios',
    texto: 'Un recorrido que entra por la puerta, cruza el salón y sale a la terraza. Tu espacio contado en treinta segundos.',
    foto: cinewhoop,
    alt: 'Cinewhoop con cámara de acción, el dron que vuela en interiores',
  },
  {
    titulo: 'Vehículos y deporte',
    texto: 'Seguimiento a la velocidad real: coches, motos, bicis, caballos. Pegado a la acción y sin grúa.',
    foto: coche,
    alt: 'Seguimiento aéreo de un coche por una carretera de montaña',
  },
  {
    titulo: 'Inmobiliaria y centros',
    texto: 'Viviendas, colegios, clubes y naves. El exterior, el entorno y el interior en una sola pieza.',
    foto: centro,
    alt: 'Patio de un centro educativo grabado a baja altura',
  },
];

export const drones = [
  { nombre: 'Estabilizado', para: 'Planos aéreos suaves, altura y fotografía.', como: 'El dron que todos conocen. Sube, gira despacio y enseña el conjunto.' },
  { nombre: 'FPV', para: 'Velocidad, picados y seguimientos.', como: 'Lo piloto con gafas, en manual. Se mueve como una cámara que vuela.' },
  { nombre: 'Cinewhoop', para: 'Interiores y vuelo cerca de personas.', como: 'Pequeño y con protecciones. Atraviesa puertas y pasillos con seguridad.' },
];

export type Paquete = Precio & { nombre: string; para: string; incluye: string[] };

export const paquetesGrabacion: Paquete[] = [
  {
    nombre: 'Un espacio',
    para: 'Para enseñar un lugar: una casa, un hotel, un restaurante.',
    incluye: ['Una localización', 'Recorrido FPV de interior y exterior', 'Pieza editada en horizontal y vertical'],
    precio: null,
    desde: true,
  },
  {
    nombre: 'Boda o evento',
    para: 'Para el día que no se repite.',
    incluye: ['Llegada, ceremonia y finca', 'Coordinación con tu fotógrafo y videógrafo', 'Material editado o en bruto'],
    precio: null,
    desde: true,
  },
  {
    nombre: 'Campaña',
    para: 'Para marcas, vehículos y proyectos con guion.',
    incluye: ['Jornada o media jornada', 'Varias localizaciones', 'Entregas adaptadas a cada red'],
    precio: null,
  },
];

/* ---------- OPINIONES ----------
 * Solo reseñas reales, copiadas tal cual (idealmente de Google).
 * Mientras la lista esté vacía, el bloque no se muestra.
 * Ejemplo: { texto: '...', nombre: 'Lucía M.', servicio: 'Boda en Carmona' }
 */
export const resenas: { texto: string; nombre: string; servicio: string }[] = [];

/* ---------- PREGUNTAS ---------- */

export const faqGrabacion = [
  { p: '¿Hacen falta permisos para grabar en mi zona?', r: 'Depende del lugar. Compruebo la zona de vuelo y tramito las autorizaciones y comunicaciones que correspondan. La fecha se confirma cuando están aprobadas.' },
  { p: '¿Con cuánta antelación tengo que pedirlo?', r: 'Si la zona exige autorización, la tramitación puede llevar hasta 30 días. En zonas sin restricciones puede ser mucho antes. Escríbeme con la fecha y te digo.' },
  { p: '¿Es seguro volar cerca de los invitados?', r: 'Para eso está el cinewhoop: es pequeño, ligero y lleva las hélices protegidas. Cada vuelo se planifica con el espacio y la gente que habrá.' },
  { p: '¿Me das el vídeo editado o en bruto?', r: 'Como prefieras: editado, en bruto o ambos, en horizontal para web y en vertical para redes.' },
  { p: '¿Trabajas fuera de Sevilla?', r: 'Sí. Sevilla y alrededores es mi zona habitual; fuera de ella sumo el desplazamiento al presupuesto.' },
];

export const faqTaller = [
  { p: '¿Cuánto cuesta una reparación?', r: 'Depende de la avería y de las piezas. Siempre recibes el presupuesto antes de que toque nada.' },
  { p: '¿Puedo enviarte el dron desde otra provincia?', r: 'Sí. Puedes mandarlo con DHL, Correos o GLS. El envío de vuelta va indicado en el presupuesto.' },
  { p: '¿Puedo traer mis propios componentes?', r: 'Sí. Reviso antes su estado y que sean compatibles con el montaje.' },
  { p: '¿La impermeabilización hace el dron sumergible?', r: 'No. Lo protege frente a humedad y salpicaduras. Las limitaciones de cada equipo van en el presupuesto.' },
  { p: '¿Lo pruebas antes de devolverlo?', r: 'Siempre. Cada dron sale configurado y probado en vuelo.' },
];

export const faqVideografos = [
  { p: '¿Quién se queda con el cliente?', r: 'Tú. Yo trabajo para ti, con tu marca y tus tiempos. No contacto con tus parejas salvo que me lo pidas.' },
  { p: '¿Qué te entrego?', r: 'El material en bruto en la resolución que necesites, o los planos ya seleccionados para que los montes en tu pieza.' },
  { p: '¿Quién gestiona los permisos de vuelo?', r: 'Yo. Me pasas la finca y la fecha, compruebo la zona y tramito lo necesario.' },
  { p: '¿Y si el día hace mal tiempo?', r: 'Con lluvia o viento fuerte no se vuela. Lo hablamos antes para tener un plan B y que no afecte a tu reportaje.' },
];
