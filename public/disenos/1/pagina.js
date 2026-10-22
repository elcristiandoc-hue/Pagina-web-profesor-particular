/* Propuesta 1 · «El lema» — el carrete de la portada, el problema paso a paso y las entradas.
   Sin bibliotecas. Todo el contenido está en el HTML; este guion solo lo mueve. */
(() => {
  const html = document.documentElement;
  const calma = matchMedia('(prefers-reduced-motion: reduce)');
  const ancho = matchMedia('(min-width: 64em)');
  html.classList.add('anima');

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const limita = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- la cabecera: bajo la franja al principio, sólida al dejar la portada ---------- */
  const franja = $('.prototipo');
  const cabecera = $('.cabecera');
  const portada = $('.portada');
  let franjaH = franja ? franja.offsetHeight : 0;

  /* ---------- el carrete ---------- */
  const carrete = $('[data-carrete]');
  const pista = carrete && $('.carrete__pista', carrete);
  const fotogramas = carrete ? $$('.fotograma', carrete) : [];
  const asomoAntes = carrete && $('.carrete__asomo--antes', carrete);
  const asomoDespues = carrete && $('.carrete__asomo--despues', carrete);
  const N = fotogramas.length;
  let paso = 0, mitadCuadro = 0, actual = 0, modo = '';

  const mide = () => {
    franjaH = franja ? franja.offsetHeight : 0;
    if (!pista || N < 2) return;
    modo = ancho.matches ? 'carrete' : 'cortina';
    pista.style.transform = '';
    fotogramas.forEach((f) => { f.style.clipPath = ''; });
    if (modo === 'carrete') {
      paso = fotogramas[1].offsetTop - fotogramas[0].offsetTop;
      mitadCuadro = $('.fotograma__marco', fotogramas[0]).offsetHeight / 2;
    }
  };

  // el avance se detiene un momento en cada fotograma, para leerlo
  const suave = (t) => t * t * (3 - 2 * t);
  const meseta = (x) => {
    const k = Math.floor(x), t = x - k;
    const e = t < 0.3 ? 0 : t > 0.7 ? 1 : suave((t - 0.3) / 0.4);
    return Math.min(N - 1, k + e);
  };
  // el avance ocupa exactamente el tramo en que la escena está fija (el recorrido bajo ella)
  const escena = $('.portada__escena');
  const progresoPortada = () => {
    const r = portada.getBoundingClientRect();
    const total = portada.offsetHeight - escena.offsetHeight;
    return total > 0 ? limita(-r.top / total, 0, 1) : 0;
  };
  const ponAsomos = (i) => {
    if (!asomoAntes || !asomoDespues) return;
    const antes = fotogramas[(i - 1 + N) % N].dataset.asomo;
    const despues = fotogramas[(i + 1) % N].dataset.asomo;
    asomoAntes.style.backgroundImage = `url("${antes}")`;
    asomoDespues.style.backgroundImage = `url("${despues}")`;
  };
  const pintaCarrete = () => {
    if (!pista || N < 2 || calma.matches) return;
    const x = meseta(progresoPortada() * (N - 1));
    if (modo === 'carrete') {
      pista.style.transform = `translate3d(0, ${(-mitadCuadro - x * paso).toFixed(1)}px, 0)`;
    } else {
      fotogramas.forEach((f, i) => {
        if (i === 0) return;
        const v = limita(x - (i - 1), 0, 1);
        f.style.clipPath = `inset(${((1 - v) * 100).toFixed(2)}% 0 0 0)`;
      });
    }
    const a = Math.round(x);
    if (a !== actual) {
      actual = a;
      fotogramas.forEach((f, i) => f.classList.toggle('is-actual', i === a));
      ponAsomos(a);
    }
  };

  /* ---------- la foto del campus se desliza un poco con el desplazamiento ---------- */
  const campus = $('.campus__marco img');
  const pintaCampus = () => {
    if (!campus || calma.matches) return;
    const r = campus.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const t = limita((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
    campus.style.transform = `translate3d(0, ${((t - 0.5) * -6).toFixed(2)}%, 0) scale(1.08)`;
  };

  let pedido = false;
  const pinta = () => {
    pedido = false;
    const y = scrollY;
    cabecera.style.transform = `translate3d(0, ${Math.max(0, franjaH - y)}px, 0)`;
    // sólida en cuanto la portada empieza a irse, para que nada pase por debajo de los enlaces
    cabecera.classList.toggle('is-solida', portada.getBoundingClientRect().bottom <= innerHeight + 2);
    pintaCarrete();
    pintaCampus();
  };
  const pide = () => { if (!pedido) { pedido = true; requestAnimationFrame(pinta); } };
  addEventListener('scroll', pide, { passive: true });
  addEventListener('resize', () => { mide(); pide(); });
  ancho.addEventListener('change', () => { mide(); pide(); });
  calma.addEventListener('change', () => { mide(); pide(); });
  mide(); pinta();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { mide(); pide(); });
  addEventListener('load', () => { mide(); pide(); });

  /* ---------- un problema, paso a paso ---------- */
  const pasos = $('[data-pasos]');
  if (pasos) {
    const materias = $$('.materia', pasos);
    const hojas = $$('.hoja', pasos);
    const laminas = $$('.lamina', pasos);
    const control = $('.hojas__control', pasos);
    const boton = $('[data-siguiente]', pasos);
    const cuenta = $('[data-cuenta]', pasos);
    const aviso = document.createElement('p');
    aviso.className = 'sr-only';
    aviso.setAttribute('aria-live', 'polite');
    control.after(aviso);
    control.hidden = false;
    let hoja = null, vistos = 0;

    const elementos = () => [...$$('.hoja__pasos li', hoja), $('.hoja__resultado', hoja)];
    const total = () => $$('.hoja__pasos li', hoja).length;
    const pintaPasos = (nuevo) => {
      const todos = elementos();
      todos.forEach((el, i) => {
        el.classList.toggle('is-vista', i < vistos);
        el.classList.toggle('is-nueva', i === vistos - 1 && nuevo);
      });
      const n = total();
      const hecho = vistos > n;
      cuenta.textContent = hecho ? 'Resuelto' : `${Math.min(vistos, n)} de ${n}`;
      boton.textContent = hecho ? 'Empezar de nuevo' : 'Siguiente paso';
      if (nuevo) aviso.textContent = todos[vistos - 1].textContent.replace(/\s+/g, ' ').trim();
    };
    const elige = (clave, enfocar) => {
      hoja = hojas.find((h) => h.dataset.materia === clave) || hojas[0];
      hojas.forEach((h) => h.classList.toggle('is-activa', h === hoja));
      laminas.forEach((l) => l.classList.toggle('is-activa', l.dataset.materia === clave));
      materias.forEach((m) => {
        const si = m.dataset.materia === clave;
        m.classList.toggle('is-activa', si);
        m.setAttribute('aria-pressed', String(si));
      });
      vistos = 1;
      pintaPasos(false);
      if (enfocar) boton.focus({ preventScroll: true });
    };
    materias.forEach((m) => {
      m.setAttribute('role', 'button');
      m.setAttribute('aria-controls', `problema-${m.dataset.materia}`);
      m.addEventListener('click', (e) => { e.preventDefault(); elige(m.dataset.materia, false); });
      m.addEventListener('keydown', (e) => { if (e.key === ' ') { e.preventDefault(); elige(m.dataset.materia, false); } });
    });
    boton.addEventListener('click', () => {
      if (vistos > total()) { vistos = 1; pintaPasos(false); return; }
      vistos += 1;
      pintaPasos(true);
    });
    elige('fisica', false);
  }

  /* ---------- entradas: cada parte de la sección, en orden, una sola vez ---------- */
  const entran = $$('[data-entra]');
  if ('IntersectionObserver' in window) {
    // lo que entra a la vez llega escalonado (80 ms entre partes, cuatro pasos como mucho)
    const io = new IntersectionObserver((lista) => {
      const llegan = lista.filter((e) => e.isIntersecting).map((e) => e.target)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      llegan.forEach((el, i) => {
        el.style.setProperty('--d', `${Math.min(i, 4) * 80}ms`);
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    entran.forEach((el) => io.observe(el));
  } else {
    entran.forEach((el) => el.classList.add('is-in'));
  }
})();
