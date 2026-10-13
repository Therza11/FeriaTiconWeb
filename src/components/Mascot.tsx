import celebrate from '../assets/mascot/celebrate.webp'
import confident from '../assets/mascot/confident.webp'
import idle from '../assets/mascot/idle.webp'
import surprised from '../assets/mascot/surprised.webp'
import think from '../assets/mascot/think.webp'
import thumbsUp from '../assets/mascot/thumbs-up.webp'
import wave from '../assets/mascot/wave.webp'

export type MascotPose = 'idle' | 'wave' | 'celebrate' | 'think' | 'thumbs-up' | 'surprised' | 'confident'

const poses: Record<MascotPose, { src: string; width: number; height: number }> = {
  idle: { src: idle, width: 367, height: 680 },
  wave: { src: wave, width: 439, height: 675 },
  celebrate: { src: celebrate, width: 435, height: 671 },
  think: { src: think, width: 355, height: 679 },
  'thumbs-up': { src: thumbsUp, width: 423, height: 677 },
  surprised: { src: surprised, width: 316, height: 677 },
  confident: { src: confident, width: 403, height: 658 },
}

export function preloadMascot(list: MascotPose[]) {
  list.forEach((pose) => {
    new Image().src = poses[pose].src
  })
}

type MascotProps = {
  pose: MascotPose
  className?: string
  label: string
}

function Mascot({ pose, className = '', label }: MascotProps) {
  const { src, width, height } = poses[pose]
  return (
    <img
      key={pose}
      className={`mascot ${className}`.trim()}
      src={src}
      width={width}
      height={height}
      alt={label}
      draggable={false}
    />
  )
}

export default Mascot
