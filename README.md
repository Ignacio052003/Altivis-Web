# Altivis Studio · Web

Nueva web de [Altivis Studio](https://altivis.es): grabación aérea con drones FPV y taller de drones en Sevilla.

**La idea:** la web es un vuelo visto desde las gafas del piloto. El OSD (REC, batería, altitud y velocidad) acompaña todo el recorrido: la batería se va gastando a medida que bajas y el vuelo termina en el contacto.

## Páginas

| Ruta | Para quién |
|---|---|
| `/` | Portada: reparte entre grabación y taller |
| `/grabacion` | Bodas, espacios, vehículos, inmobiliaria |
| `/taller` | Pilotos FPV de toda España (incluye el diagrama «¿Qué se ha roto?») |
| `/videografos` | Videógrafos, fotógrafos y fincas que quieren añadir FPV |
| `/aviso-legal`, `/privacidad` | Legal |

## Lo que hay que rellenar

Todo está en dos archivos. Mientras un dato valga `null`, la web no lo muestra.

**[`src/config/site.ts`](src/config/site.ts)**
- `nif` — obligatorio por la LSSI.
- `numeroOperador` y `seguro` — aparecen en «Hola, soy Juan» y en el pie.
- `video.portada`, `video.grabacion`, `video.taller` — vídeos de cabecera (ver abajo).
- `analyticsToken` — Cloudflare Web Analytics (gratis y sin cookies).

**[`src/data/contenido.ts`](src/data/contenido.ts)**
- `precio` de cada servicio del taller y de cada paquete de grabación (en euros, IVA incluido).
- `resenas` — solo reseñas reales. El bloque aparece cuando hay al menos una.
- Textos de usos, drones y preguntas frecuentes.

## Vídeos

Es lo que más va a cambiar la web. Cada cabecera admite un vídeo en lugar de la foto:

1. Exporta un clip de 10–15 s, MP4 H.264, 1920×1080, sin sonido y de menos de 6 MB.
2. Guárdalo en `public/video/` (p. ej. `public/video/reel-portada.mp4`).
3. Pon la ruta en `src/config/site.ts` → `video.portada: '/video/reel-portada.mp4'`.

Las fotos están en `src/assets/photos/` y se optimizan solas al compilar (WebP en varios tamaños).

## Trabajar en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Publicar

**Vista previa (GitHub Pages):** se publica sola con cada cambio en `main`. Hay que activarla una vez en *Settings → Pages → Source: GitHub Actions*. Queda en `https://ignacio052003.github.io/altivis-web/`.

**Producción (Cloudflare Pages, altivis.es):** en Cloudflare, *Workers & Pages → Create → Pages → Connect to Git*, elegir este repositorio y poner:
- Build command: `npm run build`
- Build output directory: `dist`
- Variable de entorno: `NODE_VERSION = 22`

Después, en *Custom domains*, añadir `altivis.es`.

## Tecnología

[Astro](https://astro.build) (web estática), [GSAP](https://gsap.com) + ScrollTrigger para las escenas, [Lenis](https://lenis.darkroom.engineering) para el scroll suave. Tipografías Archivo (variable, con ancho expandido) y Share Tech Mono para el OSD, servidas desde la propia web. Respeta «reducir movimiento» del sistema: sin animaciones ni scroll suave.

## Documentos

- [`docs/01-diagnostico.md`](docs/01-diagnostico.md) — análisis de la web anterior
- [`docs/02-estrategia.md`](docs/02-estrategia.md) — una marca, dos líneas
- [`docs/03-mercado-y-precios.md`](docs/03-mercado-y-precios.md) — referencias de mercado (precios pendientes)
