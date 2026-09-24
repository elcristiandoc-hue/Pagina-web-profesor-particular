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
- [ ] Ciudad y zona (solo aparecen ya en la sección de contacto)
- [ ] Años de experiencia y número de alumnos
- [ ] Tamaño de los grupos reducidos (ahora pone `[2 a 4]`)
- [ ] Enlace al perfil de Google (`google.profileUrl` y `google.writeReviewUrl`)
- [ ] Nota media y número de reseñas
- [ ] Reseñas reales copiadas del perfil de Google (con nombre y curso)
- [ ] Foto: dejar el fichero en `public/` y poner la ruta en `photoUrl`
- [ ] `src/index.html`: dominio real en `canonical`, `og:url` y JSON-LD
- [ ] Páginas de aviso legal, privacidad y cookies (hoy son enlaces vacíos en el pie)

Ya confirmado: titulación (Licenciado en Químicas, Universidad de Alicante), niveles
(desde 4º de ESO hasta universidad), precios (15 €/h individual, 10–12 €/h grupo,
20 €/h universidad) y la entrevista inicial gratuita.

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

Hay dos accesos a WhatsApp y solo dos: el botón flotante (`position: fixed`, visible
durante todo el scroll — pastilla con texto en escritorio y círculo en móvil ≤720 px)
y el de la sección de contacto. Los botones de los planes de precios llevan a
`#contacto`, no abren WhatsApp directamente.

## Publicar

El build genera HTML/CSS/JS estáticos, así que vale cualquier hosting gratuito:
GitHub Pages, Netlify o Cloudflare Pages. Subiendo el contenido de
`dist/profesor-cristian-ortega/browser`. El único coste recurrente es el dominio.

Al ser una SPA, conviene configurar el hosting para servir `index.html` en
cualquier ruta (en Netlify, un `_redirects` con `/* /index.html 200`).
