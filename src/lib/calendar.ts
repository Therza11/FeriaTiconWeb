import { fair } from '../data/content'

const title = `${fair.edition} ${fair.name}`
const location = `${fair.venue}, ${fair.place}`
const details = `${fair.slogan}. ${fair.dateLabel}.`
const startDate = fair.startsAt.slice(0, 10).replaceAll('-', '')
const endDate = fair.endsAt.slice(0, 10).replaceAll('-', '')

export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startDate}/${endDate}`,
    details,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

export function downloadCalendarFile() {
  const escape = (text: string) => text.replace(/[\\;,]/g, (match) => `\\${match}`)
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TIC-ON//Feria//ES',
    'BEGIN:VEVENT',
    `UID:feria-ticon-${startDate}@ticon`,
    `DTSTAMP:${startDate}T000000Z`,
    `DTSTART;VALUE=DATE:${startDate}`,
    `DTEND;VALUE=DATE:${endDate}`,
    `SUMMARY:${escape(title)}`,
    `LOCATION:${escape(location)}`,
    `DESCRIPTION:${escape(details)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'feria-tic-on.ics'
  link.click()
  URL.revokeObjectURL(url)
}
