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

export interface Review {
  quote: string;
  author: string;
  role: string;
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
  role: 'Profesor particular de Matemáticas y Física',
  city: '[Ciudad]',
  area: '[barrio o zona]',
  phoneDisplay: '+34 [600 000 000]',
  phoneHref: 'tel:+34600000000',
  email: '[hola@cristianortega.es]',
  emailHref: 'mailto:hola@cristianortega.es',
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  schedule: 'Lunes a viernes, 16:00–21:00',
  scheduleLong: 'Lunes a viernes, 16:00–21:00 · sábados por la mañana',
  photoUrl: '',

  google: {
    profileUrl: 'https://g.page/[perfil-google]',
    writeReviewUrl: 'https://g.page/[perfil-google]/review',
    rating: '[4,9]',
    reviewCount: '[N]',
  },

  nav: [
    { href: '#asignaturas', label: 'Asignaturas' },
    { href: '#metodo', label: 'Método' },
    { href: '#opiniones', label: 'Opiniones' },
    { href: '#precios', label: 'Precios' },
    { href: '#contacto', label: 'Contacto' },
  ] as NavLink[],

  hero: {
    eyebrow: 'Profesor particular · [Ciudad] y online',
    title: 'Matemáticas y Física explicadas para que, por fin, se entiendan.',
    subtitle:
      'Clases particulares para ESO, Bachillerato y EBAU. En persona en [Ciudad] o por videollamada, con un plan a medida y seguimiento entre clase y clase.',
    credentialTitle: '[Grado en Matemáticas] · [X] años dando clases',
    credentialSubtitle: 'ESO, Bachillerato y preparación de EBAU',
  },

  about: {
    intro:
      'Soy [Graduado en Matemáticas por la Universidad de …] y llevo [X] años dando clases particulares a alumnos de ESO y Bachillerato, en persona y online.',
    body: 'Me gusta explicar con calma y sin dar nada por sabido: primero entender, luego practicar. Muchos alumnos llegan con miedo a la asignatura y terminan el curso con confianza (y con mejor nota).',
  },

  subjects: [
    {
      icon: 'calc',
      title: 'Matemáticas',
      description:
        'De 1º ESO a 2º Bachillerato (Ciencias y CCSS). Álgebra, funciones, derivadas, integrales, probabilidad y estadística.',
      levels: ['ESO', 'Bachillerato'],
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
  ] as Subject[],

  method: [
    {
      step: '01',
      title: 'Diagnóstico',
      description:
        'En la primera clase vemos dónde estás, qué te cuesta y qué necesitas: aprobar, subir nota o preparar la EBAU.',
    },
    {
      step: '02',
      title: 'Plan a medida',
      description:
        'Ajusto las clases al temario y al ritmo de tu centro. Ejercicios escogidos, resúmenes y trucos que funcionan en el examen.',
    },
    {
      step: '03',
      title: 'Seguimiento',
      description:
        'Dudas por WhatsApp entre clases y, si la familia quiere, un breve informe de progreso cada mes.',
    },
  ] as MethodStep[],

  facts: [
    { label: 'Formación', value: '[Grado en Matemáticas] · [Máster en Profesorado]' },
    { label: 'Experiencia', value: '[X] años · más de [N] alumnos' },
    { label: 'Modalidad', value: 'Presencial en [Ciudad] y online' },
    { label: 'Horario', value: 'Lunes a viernes, 16:00–21:00' },
  ] as Fact[],

  reviews: [
    {
      quote:
        'Con Cristian mi hijo ha recuperado Matemáticas de 3º ESO y ahora va con confianza a los exámenes. Explica muy claro y es muy puntual.',
      author: '[Nombre]',
      role: 'madre de alumno',
    },
    {
      quote:
        'Preparé Matemáticas II para la EBAU con él. Los simulacros cronometrados marcaron la diferencia: saqué un [9].',
      author: '[Nombre]',
      role: 'alumno de 2º Bachillerato',
    },
    {
      quote:
        'Las clases online funcionan genial: pizarra digital, ejercicios después de cada clase y respuesta rápida a las dudas.',
      author: '[Nombre]',
      role: 'alumna de 1º Bachillerato',
    },
  ] as Review[],

  pricing: {
    title: 'Precios claros. Primera clase [gratis].',
    subtitle: 'Sin permanencia ni matrícula. Cancela con 24 h de antelación y recuperamos la clase.',
    plans: [
      {
        name: 'Clase suelta',
        price: '[XX] €',
        unit: '/ hora',
        description: 'Dudas puntuales o un repaso antes del examen.',
        features: ['60 minutos', 'Presencial u online', 'Material incluido'],
        cta: 'Reservar',
        featured: false,
        badge: '',
      },
      {
        name: 'Bono 8 clases',
        price: '[XXX] €',
        unit: '/ 8 horas',
        description: 'Dos clases por semana durante un mes. Lo que mejor funciona.',
        features: [
          'Ahorras [XX] € frente a clases sueltas',
          'Dudas por WhatsApp entre clases',
          'Informe mensual a la familia',
        ],
        cta: 'Reservar bono',
        featured: true,
        badge: 'Recomendado',
      },
      {
        name: 'Grupo de 2–3',
        price: '[XX] €',
        unit: '/ hora y alumno',
        description: 'Compañeros de clase con el mismo temario.',
        features: ['90 minutos', 'Máximo 3 alumnos', 'Ideal para EBAU'],
        cta: 'Consultar',
        featured: false,
        badge: '',
      },
    ] as Plan[],
  },
};
