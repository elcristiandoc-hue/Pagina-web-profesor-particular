/* Propuesta 3 · «El informe». JavaScript pequeño y sin librerías.
   Todo el contenido está en el HTML: sin este archivo la página se lee entera. */
(() => {
  window.__informe = true;
  const calma = matchMedia('(prefers-reduced-motion: reduce)');
  const movil = matchMedia('(max-width: 40em)');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- palabras ajustadas al ancho, por medida ---------- */
  function ajustar() {
    const cajas = $$('.muestra__caja');
    if (cajas.length) {
      let tam = Infinity;
      for (const caja of cajas) {
        const palabra = $('.muestra__palabra', caja);
        caja.style.setProperty('--muestra', '100px');
        const ancho = palabra.getBoundingClientRect().width;
        const estilo = getComputedStyle(caja);
        const libre = caja.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
        if (ancho > 0) tam = Math.min(tam, (100 * libre) / ancho);
      }
      if (Number.isFinite(tam)) {
        tam = Math.min(tam * 0.98, 300);
        cajas.forEach((c) => c.style.setProperty('--muestra', tam.toFixed(1) + 'px'));
      }
    }
    const marca = $('[data-ajuste-ancho]');
    if (marca) {
      marca.style.setProperty('--marca', '100px');
      const r = document.createRange();
      r.selectNodeContents(marca);
      const ancho = r.getBoundingClientRect().width;
      const estilo = getComputedStyle(marca);
      const libre = marca.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
      if (ancho > 0) marca.style.setProperty('--marca', ((100 * libre) / ancho * 0.995).toFixed(1) + 'px');
    }
  }
  let anchoPrevio = innerWidth;
  const listo = document.fonts ? document.fonts.ready : Promise.resolve();
  listo.then(ajustar);
  addEventListener('resize', () => { if (innerWidth !== anchoPrevio) { anchoPrevio = innerWidth; ajustar(); } });

  /* ---------- portada: fundido lento entre tres láminas ---------- */
  function portada() {
    const hero = $('.portada');
    const laminas = $('.laminas'), rotulos = $('.rotulos');
    const tl = $('#mas-laminas'), tr = $('#mas-rotulos');
    if (!hero || !laminas || !tl || calma.matches) return;
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-viva')));
    const empezar = () => {
      laminas.append(tl.content.cloneNode(true));
      rotulos.append(tr.content.cloneNode(true));
      for (const s of $$('source[data-srcset]', laminas)) { s.srcset = s.dataset.srcset; s.removeAttribute('data-srcset'); }
      for (const i of $$('img[data-src]', laminas)) { i.src = i.dataset.src; i.removeAttribute('data-src'); }
      const fotos = [...laminas.children], textos = [...rotulos.children];
      Promise.all(fotos.slice(1).map((f) => $('img', f).decode().catch(() => {}))).then(() => {
        let actual = 0, reloj = null, visible = true;
        const pasar = () => {
          const sig = (actual + 1) % fotos.length;
          fotos[actual].classList.add('is-fuera');
          fotos[actual].classList.remove('is-on');
          textos[actual].classList.remove('is-on');
          const saliente = fotos[actual];
          setTimeout(() => saliente.classList.remove('is-fuera'), 1700);
          fotos[sig].classList.add('is-on');
          textos[sig].classList.add('is-on');
          actual = sig;
        };
        const seguir = () => { if (!reloj && visible && !document.hidden) reloj = setInterval(pasar, 6200); };
        const parar = () => { clearInterval(reloj); reloj = null; };
        document.addEventListener('visibilitychange', () => (document.hidden ? parar() : seguir()));
        new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? seguir() : parar(); }).observe(hero);
        seguir();
      });
    };
    if (document.readyState === 'complete') setTimeout(empezar, 400);
    else addEventListener('load', () => setTimeout(empezar, 400), { once: true });
  }
  portada();

  /* ---------- Calcula tu mes ---------- */
  function calcula() {
    const form = $('#calcula');
    if (!form) return;
    const enlace = $('[data-whatsapp]', form);
    const anuncio = $('[data-anuncio]', form);
    const precio = { ind: 15, uni: 20 };
    const base = 'Hola Cristian, me gustaría informarme sobre las clases particulares.';
    const poner = (animar) => {
      const tipo = form.elements.tipo.value, n = Number(form.elements.semana.value);
      const clases = n * 4, total = clases * precio[tipo];
      const que = tipo === 'ind'
        ? (n === 1 ? 'una clase individual a la semana' : `${n} clases individuales a la semana`) + ' (de 4º de ESO a 2º de Bachillerato)'
        : (n === 1 ? 'una clase de universidad a la semana' : `${n} clases de universidad a la semana`);
      const msg = `${base} Me interesa${n > 1 ? 'n' : ''} ${que}.`;
      enlace.href = 'https://wa.me/34618848828?text=' + encodeURIComponent(msg);
      if (anuncio) anuncio.textContent = `${clases} clases al mes: ${total} €`;
      const linea = $(`[data-r="${tipo}-${n}"]`, form);
      if (!CSS.supports('selector(:has(*))')) $$('.total', form).forEach((p) => { p.hidden = p !== linea; });
      if (animar && linea && !calma.matches) {
        linea.classList.remove('is-nueva');
        void linea.offsetWidth;
        linea.classList.add('is-nueva');
      }
    };
    form.addEventListener('change', () => poner(true));
    form.addEventListener('submit', (e) => e.preventDefault());
    poner(false);
  }
  calcula();

  /* ---------- menú del teléfono ---------- */
  function menu() {
    const boton = $('.menu'), hoja = $('#hoja');
    if (!boton || !hoja) return;
    const cerrar = () => {
      hoja.hidden = true; boton.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = ''; boton.focus();
    };
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      hoja.hidden = false; boton.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      $('a', hoja).focus();
    });
    $('.hoja__cerrar', hoja).addEventListener('click', cerrar);
    hoja.addEventListener('click', (e) => { if (e.target.closest('a')) { hoja.hidden = true; boton.setAttribute('aria-expanded', 'false'); document.documentElement.style.overflow = ''; } });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !hoja.hidden) cerrar(); });
  }
  menu();

  /* ---------- WhatsApp fijo: se aparta donde ya hay un botón o un titular debajo ---------- */
  function flotante() {
    const f = $('.flotante');
    if (!f) return;
    const grandes = $$('h2, h3, .portada__lema, .muestra__palabra, .plan__cifra, .total, .cifra, .pie__marca');
    const zonas = new Set();
    let cola = false;
    const revisar = () => {
      cola = false;
      if (getComputedStyle(f).display === 'none') return;
      const r = f.getBoundingClientRect(), m = 14;
      const choca = grandes.some((g) => {
        const b = g.getBoundingClientRect();
        return b.width > 0 && b.bottom > r.top - m && b.top < r.bottom + m && b.right > r.left - m && b.left < r.right + m;
      });
      f.classList.toggle('is-oculto', choca || zonas.size > 0);
    };
    const pedir = () => { if (!cola) { cola = true; requestAnimationFrame(revisar); } };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((es) => {
        for (const e of es) e.isIntersecting ? zonas.add(e.target) : zonas.delete(e.target);
        revisar();
      });
      ['.portada', '.calcula', '.contacto', '.pie'].forEach((s) => { const el = $(s); if (el) io.observe(el); });
    }
    addEventListener('scroll', pedir, { passive: true });
    addEventListener('resize', pedir);
    revisar();
  }
  flotante();

  /* ---------- el vídeo solo corre a la vista y nunca con movimiento reducido ---------- */
  function videos() {
    const clips = $$('video[autoplay]');
    if (!clips.length) return;
    const dentro = new Set();
    const sync = (v) => { if (calma.matches) return; if (dentro.has(v)) v.play().catch(() => {}); else v.pause(); };
    const asentar = () => {
      for (const v of clips) {
        if (calma.matches) { v.removeAttribute('autoplay'); v.pause(); v.load(); }
        else if (dentro.has(v)) v.play().catch(() => {});
      }
    };
    const io = new IntersectionObserver((es) => {
      for (const e of es) { e.isIntersecting ? dentro.add(e.target) : dentro.delete(e.target); sync(e.target); }
    }, { threshold: 0.2 });
    clips.forEach((v) => io.observe(v));
    asentar();
    calma.addEventListener('change', asentar);
  }
  videos();

  /* ---------- entradas al hacer scroll (una vez) ----------
     Un elemento solo toma su estado oculto (.is-listo) cuando está a menos de un quinto de
     pantalla de entrar; lo lejano nunca se oculta, así que nada queda en blanco si no se llega. */
  function entradas() {
    const els = $$('[data-reveal], [data-abre], [data-lista], [data-mira]');
    if (!els.length || !('IntersectionObserver' in window) || calma.matches) return;
    const ver = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) { e.target.classList.add('is-in'); ver.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    const preparar = new IntersectionObserver((es) => {
      for (const e of es) {
        if (!e.isIntersecting) continue;
        preparar.unobserve(e.target);
        const r = e.boundingClientRect;
        if (r.top < innerHeight * 0.92) e.target.classList.add('is-in');   // ya a la vista: sin esconder
        else { e.target.classList.add('is-listo'); ver.observe(e.target); }
      }
    }, { rootMargin: '0px 0px 20% 0px' });
    els.forEach((el) => preparar.observe(el));
  }
  entradas();
})();
