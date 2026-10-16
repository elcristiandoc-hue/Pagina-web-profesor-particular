# Web de Cristian Ortega — profesor particular

Landing de una sola página en Angular 22 (standalone + signals), sin backend.
Pensada para ser barata de mantener: se publica como sitio estático y el contacto
va directo a WhatsApp. La página se pre-renderiza al compilar, así que el HTML que
reciben Google y los demás buscadores ya lleva todo el texto.

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
foto, asignaturas, método, reseñas, precios y preguntas frecuentes.

Lo que hay entre `[corchetes]` está pendiente de confirmar. Antes de publicar:

- [ ] Horario real: ahora dice «lunes a viernes, 16:00–21:00», que fue una suposición
      y nadie la ha confirmado

## Las páginas legales

Están completas. Son HTML estático en `public/` (`aviso-legal.html`, `privacidad.html`,
`cookies.html`), no rutas de Angular: son documentos que se visitan de tarde en tarde y
no justifican añadir un enrutador a una web de una sola página. Cloudflare las sirve sin
extensión, así que los enlaces apuntan a `/aviso-legal`, `/privacidad` y `/cookies`.

El aviso legal lleva nombre, NIF y domicilio, que es lo que exige el artículo 10 de la
LSSI al tratarse de una actividad económica. El RGPD no pide dirección postal, solo
identidad y datos de contacto, de modo que la política de privacidad se queda con
nombre, NIF, correo y teléfono y remite al aviso legal: así el domicilio aparece en un
único sitio.

No hace falta banner de cookies porque no hay ninguna que consentir: sin analítica, sin
cookies propias y con las tipografías alojadas en `public/fonts/` en lugar de pedirlas a
Google. Si algún día se añade medición, habrá que actualizar `cookies.html` y poner el
aviso de consentimiento.

Ya confirmado: titulación (Licenciado en Químicas, Universidad de Alicante),
experiencia (9 años, más de 50 alumnos), niveles (desde 4º de ESO hasta
universidad), precios (15 €/h individual, 10–12 €/h en grupos de 2 a 5, 20 €/h
universidad) y la entrevista inicial gratuita.

## El sitio es online primero

Cristian da clase por videollamada a alumnos de toda España; lo presencial es la
excepción y solo en la zona de Alicante. Por eso la web **no** se vende como
negocio local: no hay ciudad en el titular ni dirección postal, y el JSON-LD de
`src/index.html` describe la web, a Cristian como `Person` y un `Service` con
`areaServed` España, no un `LocalBusiness`. Si algún día cambia el enfoque, ese es
el primer sitio que tocar.

Lo local lo cubre el Perfil de Empresa en Google, creado en octubre de 2026 como
negocio de área de servicio en San Vicente del Raspeig y alrededores. La web lo enlaza
desde la tarjeta de opiniones del contacto y desde el `sameAs` del JSON-LD, para que
Google sepa que la web y la ficha son de la misma persona.

## Las reseñas

Las opiniones de `site-config.ts` son **reales**, copiadas literalmente del perfil
público de Cristian en buscatuprofesor.es (5,0 de media sobre 7 opiniones). No se
reescriben ni se corrigen: se citan tal cual, con nombre, asignatura, curso, fecha
y plataforma de origen.

Cada reseña lleva un campo `source`, así que añadir las de otra plataforma (por
ejemplo las de la ficha de Google) es solo sumar entradas al array. La nota
media grande de la tarjeta oscura sale de `reviewsSource`.

## SEO

Lo que hay que respetar al editar:

- **Un solo H1, y dice qué se ofrece.** Es «Clases particulares online de Matemáticas,
  Física y Química» (`hero.heading`). Se ve como antetítulo; el lema de Cristian
  (`hero.tagline`) es el texto grande, pero es un párrafo.
- **Selectividad con todos sus nombres.** PAU, EBAU, EvAU y PEvAU: cada comunidad la
  llama de una forma y la gente busca la suya.
- **Preguntas frecuentes solo con datos confirmados.** Son lo que más se parece a lo
  que la gente teclea en Google y lo que citan los asistentes de IA. Si se añade una,
  que no invente nada: el horario, por ejemplo, sigue sin confirmar y no aparece.
- **Los precios están en tres sitios:** los planes y las preguntas frecuentes de
  `site-config.ts`, y el JSON-LD de `src/index.html`. Un test comprueba que las
  preguntas frecuentes citan los mismos precios que los planes; el JSON-LD hay que
  cambiarlo a mano.
- **El enlace a la ficha de Google está en dos sitios:** `googleProfileUrl` en
  `site-config.ts` y el `sameAs` de `src/index.html`. Si cambia, hay que tocar los dos.
- **Sin valoración agregada en el JSON-LD.** Las reseñas están copiadas de
  buscatuprofesor.es y Google prohíbe marcar como propias las de otra web.
- **La foto se sirve en WebP** en tres tamaños (`cristian-ortega-480/720/1000.webp`),
  con ancho y alto declarados para que no mueva la página al cargar. El JPG original
  se queda para la vista previa en redes y WhatsApp (`og:image`). Si se cambia la
  foto, hay que regenerar los tres WebP.
- **Las páginas legales llevan `noindex`.** No aportan nada en Google y así el NIF y
  el domicilio no aparecen al buscar el nombre de Cristian. Siguen enlazadas en el pie.
- **`public/sitemap.xml`** solo lista la portada. Cada página nueva que deba salir en
  Google tiene que añadirse ahí.

Pendiente fuera del repositorio:

- [x] Crear en Cloudflare el registro DNS de `www`.
- [ ] Redirigir `www.cristianortega.com` a `https://cristianortega.com` con una
      regla de redirección 301 en Cloudflare. Ahora sirve la misma página con código
      200; la etiqueta canónica evita el contenido duplicado, pero la redirección es
      lo limpio.
- [x] Dar de alta el dominio en Google Search Console.
- [ ] Importar el sitio en Bing Webmaster Tools desde Search Console.
- [x] Comprobar que `/robots.txt` sirve el de `public/` con la línea del sitemap.
- [x] Crear el Perfil de Empresa en Google y enlazarlo desde la web.

## Estructura

```
src/
  index.html                  título, descripción, Open Graph y JSON-LD
  main.server.ts              arranque para el pre-renderizado
src/app/
  site-config.ts              datos editables
  app.ts                      shell: orden de las secciones
  app.config.server.ts        configuración del pre-renderizado
  app.routes.server.ts        qué se pre-renderiza (todo)
  components/
    site-header/              cabecera y navegación
    hero/                     titular, CTA y valoración de Google
    subjects/                 asignaturas
    method/                   cómo trabajo (3 pasos)
    about/                    sobre mí + ficha de datos
    reviews/                  opiniones + nota media de Google
    pricing/                  planes de precios
    faq/                      preguntas frecuentes
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

Angular pre-renderiza la portada al compilar (`outputMode: "static"` en
`angular.json`): `index.html` sale con todo el contenido y, al cargar, Angular
reutiliza ese HTML en lugar de pintarlo de nuevo (hidratación). No hace falta
servidor Node. Las direcciones que no existen devuelven `404.html` con un 404 real,
así que **no** hay que redirigir todas las rutas a `index.html`. El build también
deja un `index.csr.html`, la versión sin pre-renderizar, que no se enlaza desde
ningún sitio.
