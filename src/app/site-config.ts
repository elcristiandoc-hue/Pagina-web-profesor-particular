/**
 * Datos editables del sitio. Los valores entre [corchetes] están pendientes de confirmar.
 */

const WHATSAPP_NUMBER = '34600000000';
const WHATSAPP_MESSAGE = 'Hola Cristian, me gustaría informarme sobre las clases particulares.';

export interface Subject {
  icon: string;
  title: string;
  description: string;
  levels: string[];
}

export interface MethodStep {
  step: string;
  title: string;
  description: string;
}

export interface Fact {
  label: string;
  value: string;
}

/** Reseñas reales. El texto se cita literal: no se reescribe ni se corrige. */
export interface Review {
  quote: string;
  author: string;
  context: string;
  date: string;
  source: string;
}

export interface Plan {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
  badge: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export const SITE = {
  name: 'Cristian Ortega',
  role: 'Profesor particular de Matemáticas, Física y Química',
  city: 'San Vicente del Raspeig',
  area: 'Alicante',
  phoneDisplay: '+34 [600 000 000]',
  phoneHref: 'tel:+34600000000',
  email: '[hola@cristianortega.es]',
  emailHref: 'mailto:hola@cristianortega.es',
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  schedule: 'Lunes a viernes, 16:00–21:00',
  scheduleLong: 'Lunes a viernes, 16:00–21:00 · sábados por la mañana',
  photoUrl: '',

  /** Plataforma donde están publicadas las opiniones verificadas. */
  reviewsSource: {
    name: 'buscatuprofesor.es',
    profileUrl: 'https://buscatuprofesor.es/user-57163/',
    rating: '5,0',
    reviewCount: '7',
  },

  nav: [
    { href: '#asignaturas', label: 'Asignaturas' },
    { href: '#metodo', label: 'Método' },
    { href: '#opiniones', label: 'Opiniones' },
    { href: '#precios', label: 'Precios' },
    { href: '#contacto', label: 'Contacto' },
  ] as NavLink[],

  hero: {
    eyebrow: 'Clases particulares, presenciales u online',
    title: 'Matemáticas, Física y Química explicadas para que, por fin, se entiendan.',
    subtitle:
      'Clases particulares desde 4º de ESO hasta primeros cursos de universidad. En persona o por videollamada, con un plan a medida y seguimiento entre clase y clase.',
    proof: 'Entrevista inicial gratuita, sin compromiso',
    credentialTitle: 'Licenciado en Químicas · Universidad de Alicante',
    credentialSubtitle: '4º ESO, Bachillerato, EBAU y universidad',
  },

  about: {
    intro:
      'Soy Licenciado en Químicas por la Universidad de Alicante y llevo más de cinco años dando clases particulares de ciencias a alumnos de 4º de ESO, Bachillerato y primeros cursos de carrera.',
    body: 'Me gusta explicar con calma y sin dar nada por sabido: primero entender, luego practicar. Muchos alumnos llegan con miedo a la asignatura y terminan el curso con confianza (y con mejor nota).',
    quote: 'Quitar un par de puntos débiles es la diferencia entre suspender y aprobar.',
  },

  subjects: [
    {
      icon: 'calc',
      title: 'Matemáticas',
      description:
        'De 4º de ESO a 2º de Bachillerato (Ciencias y Ciencias Sociales). Álgebra, funciones, derivadas, integrales, probabilidad y estadística.',
      levels: ['4º ESO', 'Bachillerato'],
    },
    {
      icon: 'atom',
      title: 'Física',
      description:
        'Cinemática, dinámica, energía, campos y ondas. Mucha práctica con problemas tipo examen, paso a paso.',
      levels: ['4º ESO', 'Bachillerato'],
    },
    {
      icon: 'flask',
      title: 'Química',
      description:
        'Formulación, estequiometría, equilibrio, ácido-base, redox y orgánica. Con método para no perderse en los cálculos.',
      levels: ['4º ESO', 'Bachillerato'],
    },
    {
      icon: 'cap',
      title: 'EBAU / Selectividad',
      description:
        'Repaso por bloques, exámenes de convocatorias anteriores cronometrados y estrategia para el día de la prueba.',
      levels: ['2º Bachillerato', 'Intensivo'],
    },
    {
      icon: 'university',
      title: 'Universidad',
      description:
        'Muchas carreras arrancan con asignaturas troncales de Matemáticas, Física y Química, y son las que más gente arrastra de primero. Refuerzo para aprobarlas y no llevarlas colgando todo el grado.',
      levels: ['Primeros cursos', 'Grados científico-técnicos'],
    },
  ] as Subject[],

  method: [
    {
      step: '01',
      title: 'Entrevista inicial',
      description:
        'Gratuita y sin compromiso. Vemos el nivel real, qué se te atraganta y cuál es el objetivo: aprobar, subir nota o preparar la EBAU.',
    },
    {
      step: '02',
      title: 'Plan a medida',
      description:
        'Ajusto las clases al temario y al ritmo de tu instituto o tu facultad. Ejercicios escogidos, resúmenes y trucos que funcionan en el examen.',
    },
    {
      step: '03',
      title: 'Seguimiento',
      description:
        'Dudas por WhatsApp entre clases y, si la familia quiere, un breve informe de progreso cada mes.',
    },
  ] as MethodStep[],

  facts: [
    { label: 'Formación', value: 'Licenciado en Químicas · Universidad de Alicante' },
    { label: 'Experiencia', value: 'Más de 5 años dando clases particulares' },
    { label: 'Niveles', value: 'Desde 4º de ESO hasta universidad' },
    { label: 'Modalidad', value: 'Presenciales u online' },
    { label: 'Horario', value: 'Lunes a viernes, 16:00–21:00' },
  ] as Fact[],

  reviews: [
    {
      quote: 'Puedo recomendar profesor Martínez Cristian, es maestro excelente',
      author: 'Ruslana',
      context: 'Matemáticas · 2º de Bachillerato',
      date: 'abril de 2026',
      source: 'buscatuprofesor.es',
    },
    {
      quote: 'Estamos muy contentos con Cristian, es muy buen profesor',
      author: 'María de las Nieves',
      context: 'Física · 2º de Bachillerato',
      date: 'diciembre de 2025',
      source: 'buscatuprofesor.es',
    },
    {
      quote: 'Las clases han sido satisfactorias y he obtenido buenos resultados',
      author: 'Jeremy',
      context: 'Matemáticas · Estudios superiores',
      date: 'diciembre de 2025',
      source: 'buscatuprofesor.es',
    },
    {
      quote: 'Muy amable y profesional. 100% recomendable',
      author: 'Mayte',
      context: 'Matemáticas · 1º de Bachillerato',
      date: 'marzo de 2025',
      source: 'buscatuprofesor.es',
    },
    {
      quote: 'Gracias a Christian y a la forma de que explica para que lo pillas',
      author: 'Deborah Alese',
      context: 'Física · 2º de Bachillerato',
      date: 'febrero de 2025',
      source: 'buscatuprofesor.es',
    },
  ] as Review[],

  pricing: {
    title: 'Precios claros, sin sorpresas.',
    subtitle: 'Sin permanencia ni matrícula. Cancela con 24 h de antelación y recuperamos la clase.',
    note: 'Antes de empezar hacemos una entrevista inicial gratuita para valorar la situación del alumno, su nivel de partida y los objetivos del curso. Sin compromiso de continuar.',
    plans: [
      {
        name: 'Clases individuales',
        price: '15 €',
        unit: '/ hora',
        description: 'Alumnos de 4º de ESO a 2º de Bachillerato.',
        features: ['Clase de 60 minutos', 'Presencial u online', 'Material y ejercicios incluidos'],
        cta: 'Reservar',
        featured: true,
        badge: 'Más habitual',
      },
      {
        name: 'Grupo reducido',
        price: '10–12 €',
        unit: '/ hora y alumno',
        description: 'Compañeros de clase con el mismo curso y asignatura.',
        features: [
          'Entre 10 € y 12 € por alumno, según cuántos seáis',
          'Mismo curso y misma asignatura',
          'Grupos de [2 a 4] alumnos',
        ],
        cta: 'Consultar',
        featured: false,
        badge: '',
      },
      {
        name: 'Universidad',
        price: '20 €',
        unit: '/ hora',
        description: 'Asignaturas troncales de ciencias de los primeros cursos.',
        features: ['Clase de 60 minutos', 'Presencial u online', 'Preparación de exámenes y prácticas'],
        cta: 'Reservar',
        featured: false,
        badge: '',
      },
    ] as Plan[],
  },
};
