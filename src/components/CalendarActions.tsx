import { CalendarPlus, Download } from 'lucide-react'
import { downloadCalendarFile, googleCalendarUrl } from '../lib/calendar'

function CalendarActions() {
  return (
    <div className="calendar-actions">
      <a className="chip-button" href={googleCalendarUrl()} target="_blank" rel="noreferrer">
        <CalendarPlus size={16} /> Google Calendar
      </a>
      <button className="chip-button" type="button" onClick={downloadCalendarFile}>
        <Download size={16} /> Descargar .ics
      </button>
    </div>
  )
}

export default CalendarActions
