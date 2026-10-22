// Propuesta 2 · «Capítulos». Sin librerías. Todo el contenido está en el HTML; esto solo añade.
window.__capitulos = true;
(() => {
  const root = document.documentElement;
  const calma = matchMedia('(prefers-reduced-motion: reduce)');
  const hayIO = 'IntersectionObserver' in window;

  // ---------- 0. Entradas: cada sección presenta sus partes a su turno, una sola vez ----------
  const grupos = new Map();
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const grupo = el.closest('[data-coro]') || el;
    if (!grupos.has(grupo)) grupos.set(grupo, []);
    grupos.get(grupo).push(el);
  });
  grupos.forEach((els) => els.forEach((el, i) => el.style.setProperty('--i', String(Math.min(i, 5)))));
  const entra = (grupo) => (grupos.get(grupo) || []).forEach((el) => el.classList.add('is-in'));
  if (!hayIO) grupos.forEach((_, g) => entra(g));
  else {
    const ioEntrada = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        entra(e.target);
        ioEntrada.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    grupos.forEach((_, g) => ioEntrada.observe(g));
  }
  // red de seguridad: si algo en pantalla sigue escondido después de cargar, se muestra
  addEventListener('load', () => setTimeout(() => {
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
    });
  }, 2500));

  // ---------- 1. La costura de la portada cae a media pantalla: mide franja + cabecera ----------
  const cabecera = document.querySelector('.cabecera');
  const medir = () => {
    if (!cabecera) return;
    const fondo = cabecera.getBoundingClientRect().bottom + window.scrollY;
    root.style.setProperty('--cabecera', `${Math.round(fondo)}px`);
  };
  medir();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
  let ancho = window.innerWidth;
  addEventListener('resize', () => {
    if (window.innerWidth === ancho) return;
    ancho = window.innerWidth;
    requestAnimationFrame(medir);
  });

  // ---------- 2. Color por capítulo: la cabecera fija toma el campo y la tinta del capítulo que tiene debajo ----------
  // El fondo de la página nunca cambia desde aquí: cada capítulo pinta su propio campo en CSS.
  const bajo = () => {
    if (!cabecera) return;
    const r = cabecera.getBoundingClientRect();
    const y = Math.min(window.innerHeight - 1, Math.max(0, r.bottom + 2));
    const x = Math.round(window.innerWidth * 0.25);
    const debajo = document.elementsFromPoint(x, y).find((n) => !cabecera.contains(n) && n.closest('[data-campo]'));
    const campo = debajo && debajo.closest('[data-campo]');
    const valor = campo ? campo.dataset.campo : 'hueso';
    if (root.dataset.bajo !== valor) root.dataset.bajo = valor;
  };
  // una franja de 4 px justo debajo de la cabecera fija: cada borde de capítulo que la cruza dispara el cambio
  let ioCampo = null;
  const vigilar = () => {
    if (!hayIO || !cabecera) return;
    if (ioCampo) ioCampo.disconnect();
    const alto = Math.round(cabecera.offsetHeight);
    const resto = Math.max(0, window.innerHeight - alto - 4);
    ioCampo = new IntersectionObserver(bajo, { rootMargin: `-${alto}px 0px -${resto}px 0px`, threshold: 0 });
    document.querySelectorAll('[data-campo]').forEach((el) => ioCampo.observe(el));
  };
  vigilar();
  bajo();
  addEventListener('load', bajo);
  addEventListener('resize', () => requestAnimationFrame(() => { vigilar(); bajo(); }));

  // ---------- 3. La cosa viva: elige curso y asignatura ----------
  const form = document.querySelector('.selector');
  const panel = document.querySelector('.panel');
  if (form && panel) {
    const WA = 'https://wa.me/34618848828?text=';
    const TEMAS = {
      'Matemáticas': 'de 4º de ESO a 2º de Bachillerato, de Ciencias y de Ciencias Sociales: álgebra, funciones, derivadas, integrales, probabilidad y estadística',
      'Física': 'cinemática, dinámica, energía, campos y ondas, con mucha práctica de problemas tipo examen, paso a paso',
      'Química': 'formulación, estequiometría, equilibrio, ácido-base, redox y orgánica, con método para no perderse en los cálculos',
    };
    const CAPITULO = { 'Matemáticas': 'matematicas', 'Física': 'fisica', 'Química': 'quimica' };
    const CAMPO = { matematicas: 'rojo', fisica: 'mostaza', quimica: 'granate', universidad: 'pizarra', general: 'tinta' };
    const el = {
      titulo: panel.querySelector('.panel__titulo'),
      trabajo: panel.querySelector('.panel__trabajo'),
      selectividad: panel.querySelector('.panel__selectividad'),
      cifra: panel.querySelector('.panel__cifra'),
      nota: panel.querySelector('.panel__nota'),
      mensaje: panel.querySelector('.panel__mensaje'),
      boton: panel.querySelector('.boton--panel'),
    };

    const pintar = () => {
      const curso = form.elements.curso.value;
      const asignatura = form.elements.asignatura.value;
      if (!curso || !asignatura) return;
      const uni = curso === 'Universidad';
      const capitulo = uni ? 'universidad' : CAPITULO[asignatura];
      panel.dataset.capitulo = capitulo;
      panel.dataset.campo = CAMPO[capitulo];
      el.titulo.textContent = uni ? `${asignatura} en la universidad` : `${asignatura} en ${curso}`;
      el.trabajo.textContent = uni
        ? `Las troncales de ${asignatura} de los primeros cursos de grados científico-técnicos: exámenes y prácticas.`
        : `Lo que trabajamos en ${asignatura}: ${TEMAS[asignatura]}. Siempre con tu temario y al ritmo de tus clases.`;
      const selectividad = curso === '2º de Bachillerato';
      el.selectividad.hidden = !selectividad;
      el.selectividad.textContent = selectividad
        ? 'Y la Selectividad (PAU, EBAU, EvAU o PEvAU): repaso por bloques y exámenes cronometrados de convocatorias anteriores de tu comunidad.'
        : '';
      el.cifra.textContent = uni ? '20 € / hora' : '15 € / hora';
      el.nota.textContent = uni
        ? 'Clase de 60 minutos por videollamada. La entrevista inicial es gratis.'
        : 'Clase individual de 60 minutos por videollamada. En grupo reducido de 2 a 5 compañeros del mismo curso y asignatura, entre 10 € y 12 € por alumno y hora, según cuántos seáis.';
      const mensaje = `Hola Cristian, estoy en ${uni ? 'la universidad' : curso} y me gustaría informarme sobre clases de ${asignatura}.`;
      el.mensaje.hidden = false;
      el.mensaje.textContent = `Se enviará: «${mensaje}»`;
      el.boton.href = WA + encodeURIComponent(mensaje);
      bajo();
    };

    const elegir = (nombre, valor) => {
      const radio = [...form.elements[nombre]].find((r) => r.value === valor);
      if (radio) radio.checked = true;
    };
    form.addEventListener('change', pintar);
    if (!form.elements.curso.value) elegir('curso', '2º de Bachillerato');
    if (!form.elements.asignatura.value) elegir('asignatura', 'Matemáticas');
    pintar();

    // los enlaces de cada capítulo llegan al selector con su asignatura o su curso ya elegidos
    document.querySelectorAll('[data-asignatura], [data-curso]').forEach((a) => {
      a.addEventListener('click', () => {
        if (a.dataset.asignatura) {
          elegir('asignatura', a.dataset.asignatura);
          if (form.elements.curso.value === 'Universidad') elegir('curso', '2º de Bachillerato');
        }
        if (a.dataset.curso) elegir('curso', a.dataset.curso);
        pintar();
      });
    });
  }

  // ---------- 4. El péndulo: se mueve solo cuando se ve, y nunca con movimiento reducido ----------
  const bucles = [...document.querySelectorAll('video.bucle')];
  if (bucles.length) {
    const enVista = new Set();
    const ajustar = (v) => {
      if (calma.matches) { v.pause(); return; }
      if (enVista.has(v)) {
        if (v.preload !== 'auto') v.preload = 'auto';
        v.play().catch(() => {});
      } else v.pause();
    };
    if (hayIO) {
      const io = new IntersectionObserver((entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) enVista.add(e.target); else enVista.delete(e.target);
          ajustar(e.target);
        }
      }, { rootMargin: '200px 0px', threshold: 0.05 });
      bucles.forEach((v) => io.observe(v));
    }
    calma.addEventListener('change', () => bucles.forEach(ajustar));
  }

  // ---------- 5. El menú del teléfono se cierra al elegir ----------
  const menu = document.querySelector('.menu');
  if (menu) menu.addEventListener('click', (e) => { if (e.target.closest('a')) menu.open = false; });
})();
