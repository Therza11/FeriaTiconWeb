import djiLogo from '../assets/partners/dji-agriculture.webp'
import rafaLogo from '../assets/partners/rafa-robotica.webp'
import senaLogo from '../assets/partners/sena.webp'
import sennovaLogo from '../assets/partners/sennova.webp'

export const fair = {
  edition: 'XI',
  name: 'Feria TIC-ON',
  slogan: 'Sembrando semillas de innovación',
  dateLabel: '4, 5 y 6 de noviembre de 2026',
  venue: 'Auditorio Enrique Low Murtra',
  place: 'SENA · Apartadó, Antioquia',
  startsAt: '2026-11-04T00:00:00-05:00',
  endsAt: '2026-11-07T00:00:00-05:00',
}

export type Session = {
  time: string
  title: string
  place?: string
}

export type FairDay = {
  index: string
  date: string
  weekday: string
  title: string
  summary: string
  sessions: Session[]
}

export const fairDays: FairDay[] = [
  {
    index: '01',
    date: '04',
    weekday: 'Miércoles',
    title: 'Apertura de la feria',
    summary: 'Primer día de la XI edición: comienza el encuentro.',
    sessions: [],
  },
  {
    index: '02',
    date: '05',
    weekday: 'Jueves',
    title: 'Jornada central',
    summary: 'Segundo día para recorrer la feria y sus proyectos.',
    sessions: [],
  },
  {
    index: '03',
    date: '06',
    weekday: 'Viernes',
    title: 'Cierre de la feria',
    summary: 'Tercer día y despedida de esta edición.',
    sessions: [],
  },
]

export type FairVideo = {
  src: string
  poster: string
  kicker: string
  title: string
  duration: string
  portrait?: boolean
}

export const videos: FairVideo[] = [
  {
    src: '/media/ticowebV2.mp4',
    poster: '/media/posters/ticowebV2.jpg',
    kicker: 'Invitación',
    title: 'La feria te espera',
    duration: '0:10',
  },
  {
    src: '/media/ticowebV3.mp4',
    poster: '/media/posters/ticowebV3.jpg',
    kicker: 'Drones y cultivos',
    title: 'Tecnología en el campo',
    duration: '0:17',
  },
  {
    src: '/media/ticowebV4.mp4',
    poster: '/media/posters/ticowebV4.jpg',
    kicker: 'Mascota',
    title: 'Nuestro robot anfitrión',
    duration: '1:20',
    portrait: true,
  },
]

export const partners = [
  { name: 'SENA', logo: senaLogo },
  { name: 'SENNOVA', logo: sennovaLogo },
  { name: 'RAFA Robótica', logo: rafaLogo },
  { name: 'DJI Agriculture', logo: djiLogo },
]

export const participationOptions = [
  { value: 'asistente', label: 'Asistente' },
  { value: 'expositor', label: 'Expositor' },
  { value: 'ponente', label: 'Ponente' },
  { value: 'otro', label: 'Otro' },
] as const

export type Participation = (typeof participationOptions)[number]['value']
