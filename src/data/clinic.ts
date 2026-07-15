/**
 * Single source of truth for clinic metadata.
 *
 * Used by: Base.astro (JSON-LD), Contact.astro (contact cards),
 * Footer.astro (footer columns), Faq.astro (FAQ answers).
 *
 * Coordinates were sourced from public geocoding records for
 * Nueva Imperial, Region de la Araucania, Chile.
 */

export const clinic = {
  id: 'fisiored-nueva-imperial',
  legalName: 'Centro FisioRed Nueva Imperial',
  brandName: 'FisioRed',
  tagline: 'Medicina, rehabilitación y estimulación integral',
  shortDescription:
    'Centro médico y de rehabilitación integral en Nueva Imperial. Atención especializada para el desarrollo y salud de toda tu familia.',
  longDescription:
    'FisioRed es el primer centro médico y de rehabilitación integral en Nueva Imperial, Región de la Araucanía, Chile. Fundado en 2014, reúne un equipo interdisciplinario de kinesiólogos, pediatras, terapeutas ocupacionales, fonoaudiólogos, nutricionistas y psicólogos para atender a niños, adolescentes y adultos con planes personalizados.',
  url: 'https://fisiored.cl',
  email: 'contacto@fisiored.cl',
  phone: '+56 9 2009 2455',
  phoneRaw: '+56920092455',
  whatsappUrl: 'https://wa.me/56920092455',
  instagramUrl: 'https://instagram.com/fisiorednuevaimperial',
  facebookUrl: 'https://facebook.com/fisiored',
  established: '2014',
  priceRange: '$$',
  currenciesAccepted: 'CLP',
  paymentAccepted: 'Efectivo, transferencia bancaria, tarjetas',
  languagesSpoken: ['es-CL'],
  address: {
    streetAddress: 'Ernesto Riquelme 511',
    addressLocality: 'Nueva Imperial',
    addressRegion: 'Región de la Araucanía',
    postalCode: '4550000',
    addressCountry: 'CL',
  },
  geo: {
    latitude: -38.7419,
    longitude: -72.9984,
  },
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '14:00',
    },
  ],
  areaServed: [
    {
      type: 'City',
      name: 'Nueva Imperial',
      region: 'Región de la Araucanía',
      country: 'CL',
    },
    {
      type: 'City',
      name: 'Temuco',
      region: 'Región de la Araucanía',
      country: 'CL',
    },
  ],
  medicalSpecialty: [
    'Kinesiología',
    'Pediatría',
    'Terapia Ocupacional',
    'Fonoaudiología',
    'Nutrición',
    'Psicología',
    'Osteopatía',
    'Masoterapia',
  ],
} as const;
