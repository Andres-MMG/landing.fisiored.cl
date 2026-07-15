export type ServiceSize = 'wide' | 'tall' | 'standard' | 'wide-split';
export type ServiceVariant = 'default' | 'filled-primary' | 'horizontal';

export type Service = {
  slug: string;
  name: string;
  icon: string; // Material Symbols name
  description: string;
  tags?: string[];
  size: ServiceSize;
  variant: ServiceVariant;
  ctaLabel?: string;
  iconBg?: string;
  iconColor?: string;
  iconAsFullColor?: boolean;
};

/**
 * Service catalog — single source of truth for the bento grid.
 * Sourced from: ejemplo/servicios_m_dicos_y_rehabilitaci_n/code.html
 */
export const services: Service[] = [
  {
    slug: 'kinesiologia',
    name: 'Kinesiología y Rehabilitación',
    icon: 'exercise',
    description:
      'Recuperación funcional integral para lesiones traumatológicas, deportivas y post-operatorias. Terapia manual y ejercicios terapéuticos personalizados para restaurar tu movilidad.',
    tags: ['Terapia Manual', 'Fisioterapia', 'Readaptación'],
    size: 'wide',
    variant: 'default',
    ctaLabel: 'Consultar',
  },
  {
    slug: 'pediatria',
    name: 'Pediatría Integral',
    icon: 'child_care',
    description:
      'Atención especializada para el desarrollo y bienestar de tu hijo o hija, liderada por la Dra. Maria Castillo. Estimulación temprana y control del niño sano.',
    size: 'tall',
    variant: 'filled-primary',
    ctaLabel: 'Ver Disponibilidad',
  },
  {
    slug: 'terapia-ocupacional',
    name: 'Terapia Ocupacional',
    icon: 'accessibility_new',
    description:
      'Ayudamos a personas de todas las edades a participar en las actividades que desean mediante el uso terapéutico de las actividades diarias.',
    size: 'standard',
    variant: 'default',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
  },
  {
    slug: 'fonoaudiologia',
    name: 'Fonoaudiología',
    icon: 'record_voice_over',
    description:
      'Evaluación y tratamiento de trastornos de la comunicación, lenguaje, voz y audición, tanto en niños como en adultos.',
    size: 'standard',
    variant: 'default',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
  },
  {
    slug: 'nutricion',
    name: 'Nutrición',
    icon: 'nutrition',
    description:
      'Planes de alimentación personalizados para mejorar tu salud, rendimiento deportivo o manejo de patologías metabólicas.',
    size: 'standard',
    variant: 'default',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
  },
  {
    slug: 'psicologia',
    name: 'Psicología & Bienestar Mental',
    icon: 'psychology',
    description:
      'Espacio de contención y apoyo emocional. Brindamos psicoterapia para adolescentes y adultos, enfocados en herramientas para la gestión de ansiedad, estrés y procesos de vida.',
    size: 'wide',
    variant: 'horizontal',
  },
  {
    slug: 'osteopatia',
    name: 'Osteopatía',
    icon: 'personal_injury',
    description:
      'Tratamiento manual que busca equilibrar el sistema musculoesquelético para optimizar el funcionamiento global del cuerpo.',
    size: 'wide-split',
    variant: 'default',
    ctaLabel: 'Consultar Servicio',
    iconBg: 'text-primary',
    iconAsFullColor: true,
  },
  {
    slug: 'masoterapia',
    name: 'Masoterapia',
    icon: 'spa',
    description:
      'Masajes de relajación y descontracturantes diseñados para reducir la tensión muscular y promover un estado profundo de bienestar.',
    size: 'wide-split',
    variant: 'default',
    ctaLabel: 'Consultar Servicio',
    iconBg: 'text-primary',
    iconAsFullColor: true,
  },
] as const;