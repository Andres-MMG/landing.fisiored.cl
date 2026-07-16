import type { ImageMetadata } from 'astro';

import davidCarrasco from '../assets/team/david-carrasco.jpg';
import elizabethGallardo from '../assets/team/elizabeth-gallardo.jpg';
import giovanniTassistro from '../assets/team/giovanni-tassistro.jpg';
import gonzaloMartinez from '../assets/team/gonzalo-martinez.jpg';
import jonathanNahuel from '../assets/team/jonathan-nahuel.jpg';
import mariaJoseBon from '../assets/team/maria-jose-bon.png';
import yasnaBorquez from '../assets/team/yasna-borquez.jpg';

export type BadgeColor = 'primary' | 'tertiary' | 'secondary' | 'tertiary-container';

export type TeamMember = {
  slug: string;
  name: string;
  specialty: string;
  image: ImageMetadata | string;
  imageAlt: string;
  badge: {
    text: string;
    color: BadgeColor;
  };
  featured?: boolean;
  bullets?: string[];
  /** Flowcitas professional ID — used to deep-link the booking popup. */
  flowcitasId?: string;
  /** Short label shown in the per-card reserve button, e.g. "Giovanni". */
  shortName?: string;
  /**
   * Per-photo object-position override (Tailwind arbitrary value).
   * When set, replaces the default 'object-top' so we can compensate for
   * photos whose composition leaves too much headroom.
   * Example: 'center 28%'
   */
  imagePosition?: string;
};

/**
 * Photo URL helpers — placeholder professional portraits used when
 * a real photo for the role isn't available yet. Replace with the
 * matching file in src/assets/team/ once photos are provided.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

const featuredUnsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

/**
 * Team roster — single source of truth for the team grid.
 * Sourced from: ejemplo/nuestro_equipo_de_profesionales/code.html
 *
 * Photos:
 * - Real local imports live in src/assets/team/
 * - Missing photos use Unsplash placeholders (replace asap)
 */
export const team: TeamMember[] = [
  {
    slug: 'giovanni-tassistro',
    name: 'Giovanni Tassistro',
    specialty: 'Especialista en Rehabilitación Física',
    image: giovanniTassistro,
    imageAlt: 'Retrato profesional de Giovanni Tassistro, kinesiólogo',
    badge: { text: 'Kinesiólogo', color: 'primary' },
    flowcitasId: '10',
    shortName: 'Giovanni',
  },
  {
    slug: 'maria-jose-bon',
    name: 'Maria José Bon',
    specialty: 'Kinesiología Respiratoria y Motora',
    image: mariaJoseBon,
    imageAlt: 'Retrato profesional de Maria José Bon, kinesióloga',
    badge: { text: 'Kinesióloga', color: 'primary' },
    flowcitasId: '11',
    shortName: 'Maria José',
  },
  {
    slug: 'maria-castillo',
    name: 'Dra. Maria Castillo',
    specialty: 'Atención integral para el desarrollo y bienestar de tu hijo o hija.',
    image: featuredUnsplash('photo-1559839914-17aae19cec71'),
    imageAlt: 'Retrato profesional de la Dra. Maria Castillo, pediatra',
    badge: { text: 'Médico Pediatra', color: 'tertiary' },
    featured: true,
    bullets: ['Control Niño Sano', 'Patologías Agudas'],
    flowcitasId: '12',
    shortName: 'Dra. Castillo',
  },
  {
    slug: 'david-carrasco',
    name: 'David Carrasco',
    specialty: 'Rehabilitación Traumatológica',
    image: davidCarrasco,
    imageAlt: 'Retrato profesional de David Carrasco, kinesiólogo',
    badge: { text: 'Kinesiólogo', color: 'primary' },
    flowcitasId: '13',
    shortName: 'David',
  },
  {
    slug: 'jonathan-nahuel',
    name: 'Jonathan Nahuel',
    specialty: 'Especialista en Kinesiterapia',
    image: jonathanNahuel,
    imageAlt: 'Retrato profesional de Jonathan Nahuel, kinesiólogo',
    badge: { text: 'Kinesiólogo', color: 'primary' },
    flowcitasId: '14',
    shortName: 'Jonathan',
  },
  {
    slug: 'yasna-borquez',
    name: 'Yasna Borquez',
    specialty: 'Terapia del Lenguaje y Audición',
    image: yasnaBorquez,
    imageAlt: 'Retrato profesional de Yasna Borquez, fonoaudióloga',
    badge: { text: 'Fonoaudióloga', color: 'secondary' },
    flowcitasId: '15',
    shortName: 'Yasna',
  },
  {
    slug: 'carolina-espinoza',
    name: 'Carolina Espinoza',
    specialty: 'Nutrición Clínica y Deportiva',
    image: unsplash('photo-1573496359142-b8d87734a5a2'),
    imageAlt: 'Retrato profesional de Carolina Espinoza, nutricionista',
    badge: { text: 'Nutricionista', color: 'secondary' },
    flowcitasId: '16',
    shortName: 'Carolina',
  },
  {
    slug: 'elizabeth-gallardo',
    name: 'Elizabeth Gallardo',
    specialty: 'Rehabilitación y Estimulación',
    image: elizabethGallardo,
    imageAlt: 'Retrato profesional de Elizabeth Gallardo, terapeuta ocupacional',
    badge: { text: 'Terapeuta Ocupacional', color: 'tertiary-container' },
    flowcitasId: '17',
    shortName: 'Elizabeth',
    imagePosition: 'center 28%',
  },
] as const;

/**
 * Featured Gonzalo Martinez — available in data/ but not used in the
 * default grid; kept exported so the component can opt-in if needed.
 */
export const extraTeam: TeamMember[] = [
  {
    slug: 'gonzalo-martinez',
    name: 'Gonzalo Martinez',
    specialty: 'Kinesiología',
    image: gonzaloMartinez,
    imageAlt: 'Retrato profesional de Gonzalo Martinez, kinesiólogo',
    badge: { text: 'Kinesiólogo', color: 'primary' },
  },
];