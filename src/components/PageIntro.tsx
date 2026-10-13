type PageIntroProps = {
  number: string
  eyebrow: string
  title: string
  accent: string
  description: string
  dark?: boolean
}

function PageIntro({ number, eyebrow, title, accent, description, dark = false }: PageIntroProps) {
  return (
    <div className={`page-intro${dark ? ' page-intro-dark' : ''}`}>
      <div className={`section-kicker${dark ? ' section-kicker-light' : ''}`}><span>{number}</span><span>{eyebrow}</span><span className="kicker-line" /></div>
      <div className="page-intro-grid">
        <h1>{title}<br /><span>{accent}</span></h1>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default PageIntro