import { useEffect, useState } from 'react'
import Mascot, { preloadMascot } from './Mascot'
import type { MascotPose } from './Mascot'

export type MascotLine = {
  pose: MascotPose
  text: string
}

type MascotGuideProps = {
  lines: MascotLine[]
  className?: string
}

function MascotGuide({ lines, className = '' }: MascotGuideProps) {
  const [step, setStep] = useState(0)
  const line = lines[step % lines.length]

  useEffect(() => {
    preloadMascot(lines.map((item) => item.pose))
  }, [lines])

  return (
    <div className={`mascot-guide ${className}`.trim()}>
      <p className="speech-bubble" aria-live="polite">
        <span key={step}>{line.text}</span>
      </p>
      <button
        className="mascot-button"
        type="button"
        aria-label="Mascota de la feria: ver el siguiente mensaje"
        onClick={() => setStep((step + 1) % lines.length)}
      >
        <span className="mascot-float">
          <Mascot pose={line.pose} label="" />
        </span>
      </button>
    </div>
  )
}

export default MascotGuide
