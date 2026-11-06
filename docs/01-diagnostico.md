# Diagnóstico de la web actual (altivis.es)

Revisión hecha el 6 de noviembre de 2026 sobre el código fuente de la página.

## Veredicto

Técnicamente correcta y comercialmente floja. Está bien construida (título y descripción SEO, accesibilidad, privacidad, buena adaptación a móvil, y una ficha que convierte la solicitud en un mensaje de WhatsApp), pero se lee como una ficha técnica cuando el negocio vende imagen en movimiento. El logo dice *Aerial FPV Filmmaking* y no hay ni un segundo de vídeo.

## Qué funciona

- Propuesta clara en la portada: qué hace y dónde.
- Separación en dos caminos desde el inicio: «Mi dron necesita arreglo» / «Necesito una grabación».
- Ficha de contacto que genera el mensaje de WhatsApp: adecuada para un negocio de una persona.
- Preguntas frecuentes útiles y honestas (la impermeabilización no hace el dron sumergible).
- Sin cookies de terceros.

## Qué falla (de más a menos impacto)

1. **No hay vídeo.** La portada de un negocio de grabación aérea debería ser un reel corto. Las fotos son de móvil: sirven para el taller, no para vender grabación.
2. **No hay prueba de confianza.** Sin reseñas, trabajos con nombre ni cara. «Operador UAS acreditado» sin número de operador.
3. **No hay precios.** Todo es «depende». Un «desde X €» filtra curiosos y da seguridad.
4. **Dos negocios con el mismo tono.** El taller (pilotos de toda España) y la grabación (empresas y particulares de Sevilla) comparten lenguaje técnico. Al cliente de grabación «ELRS 2.4» no le dice nada.
5. **Los 30 días de antelación como barrera.** Aparecen como condición justo antes del botón; contado como «los permisos los gestiono yo» es un argumento de venta.

## Fallos técnicos y legales

- **Falta el NIF** en el aviso legal (el código tiene el comentario «añadir aquí cuando se facilite»). La LSSI lo exige en webs comerciales.
- **Sin imagen al compartir el enlace.** Las etiquetas Open Graph de imagen y URL están comentadas («Al publicar: subir og.jpg… y descomentar»). Al pasar la web por WhatsApp sale sin imagen.
- **Página de 1,4 MB.** Las 13 imágenes van incrustadas en base64 dentro del HTML: no se cachean y el `loading="lazy"` no sirve. La foto del chalet está incrustada dos veces (~400 KB).
- **El logo del pie no se ve:** lleva la clase `logo-dark-bg`, que está oculta con `display: none !important`.
- **En móvil el menú desaparece** (por debajo de 760 px) sin alternativa.
- **Sin analítica.** No se sabe cuánta gente entra ni desde dónde. La web ya está en Cloudflare: Cloudflare Web Analytics es gratuito y no usa cookies.
- **Restos de versiones anteriores:** comentarios tipo «v8» o «Paleta definitiva» y una paleta oscura completa que se sobrescribe y no se usa.

## Fuera de la web

- **Ficha de Google Business.** Las búsquedas locales («grabación con dron Sevilla») se resuelven en el mapa, y es de donde saldrían las reseñas.
