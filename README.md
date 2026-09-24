# Web de Cristian Ortega — profesor particular

Landing de una sola página en Angular 22 (standalone + signals), sin backend.
Pensada para ser barata de mantener: se publica como sitio estático y el contacto
va directo a WhatsApp.

## Arrancar

```bash
npm install
npm start          # http://localhost:4200
npm run build      # genera dist/profesor-cristian-ortega/browser
npm test           # tests unitarios (vitest)
```

## Dónde se editan los contenidos

Casi todo el texto y los datos están en un único fichero:

**`src/app/site-config.ts`** — nombre, ciudad, teléfono, email, enlace de WhatsApp,
perfil de Google, asignaturas, método, reseñas y precios.

Lo que hay entre `[corchetes]` está pendiente de confirmar. Antes de publicar:

- [ ] Teléfono real (`WHATSAPP_NUMBER`, `phoneDisplay`, `phoneHref`)
- [ ] Email real
- [ ] Horario real (ahora es una suposición)
- [ ] Tamaño de los grupos reducidos (ahora pone `[2 a 4]`)
- [ ] Foto: dejar el fichero en `public/` y poner la ruta en `photoUrl`
- [ ] `src/index.html`: dominio real en `canonical`, `og:url` y JSON-LD
- [ ] Páginas de aviso legal, privacidad y cookies (hoy son enlaces vacíos en el pie)

Ya confirmado: titulación (Licenciado en Químicas, Universidad de Alicante),
experiencia (más de 5 años), zona (San Vicente del Raspeig, Alicante), niveles
(desde 4º de ESO hasta universidad), precios (15 €/h individual, 10–12 €/h grupo,
20 €/h universidad) y la entrevista inicial gratuita.

## Las reseñas

Las opiniones de `site-config.ts` son **reales**, copiadas literalmente del perfil
público de Cristian en buscatuprofesor.es (5,0 de media sobre 7 opiniones). No se
reescriben ni se corrigen: se citan tal cual, con nombre, asignatura, curso, fecha
y plataforma de origen.

Cada reseña lleva un campo `source`, así que añadir las de otra plataforma (por
ejemplo Google, cuando exista la ficha) es solo sumar entradas al array. La nota
media grande de la tarjeta oscura sale de `reviewsSource`.

## Estructura

```
src/app/
  site-config.ts              datos editables
  app.ts                      shell: orden de las secciones
  components/
    site-header/              cabecera y navegación
    hero/                     titular, CTA y valoración de Google
    subjects/                 asignaturas
    method/                   cómo trabajo (3 pasos)
    about/                    sobre mí + ficha de datos
    reviews/                  opiniones + nota media de Google
    pricing/                  planes de precios
    contact/                  contacto
    site-footer/              pie
    whatsapp-fab/             botón flotante de WhatsApp
    icon/                     iconos SVG
```

Accesos a WhatsApp: el de la cabecera, el botón flotante (`position: fixed`, visible
durante todo el scroll — pastilla con texto en escritorio y círculo en móvil ≤720 px)
y el de la sección de contacto. El hero no lleva ninguno a propósito: tenerlo ahí
duplicaba al flotante en la primera pantalla. Los botones de los planes de precios
llevan a `#contacto`, no abren WhatsApp directamente.

## Publicar

El build genera HTML/CSS/JS estáticos, así que vale cualquier hosting gratuito:
GitHub Pages, Netlify o Cloudflare Pages. Subiendo el contenido de
`dist/profesor-cristian-ortega/browser`. El único coste recurrente es el dominio.

Al ser una SPA, conviene configurar el hosting para servir `index.html` en
cualquier ruta (en Netlify, un `_redirects` con `/* /index.html 200`).
