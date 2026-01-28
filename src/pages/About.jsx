import { useTheme } from '../context/ThemeContext'
import PCVLayout from '../themes/pcv/PCVLayout'
import JarcosLayout from '../themes/jarcos/JarcosLayout'

function AboutContent() {
  const { isPCV } = useTheme()

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <h1 className={`${
        isPCV 
          ? 'font-mono text-xs tracking-wider' 
          : 'font-display text-4xl md:text-5xl font-bold uppercase tracking-tight'
      }`}>
        {isPCV ? 'ABOUT' : 'ABOUT'}
      </h1>

      {/* Bio Section */}
      <div className={`mt-8 md:mt-12 space-y-6 ${
        isPCV ? 'max-w-xl' : 'max-w-2xl'
      }`}>
        <p className={`leading-relaxed ${
          isPCV 
            ? 'font-mono text-xs text-[#0066ff]/70' 
            : 'font-body text-lg text-white/80'
        }`}>
          I'm Johnson He, a designer and developer based in NYC. 
          I work at the intersection of technology and creativity, crafting 
          digital experiences that feel both intuitive and memorable. Currently completing my Master's in Data Science @ Columbia.
        </p>

        <p className={`leading-relaxed ${
          isPCV 
            ? 'font-mono text-xs text-[#0066ff]/70' 
            : 'font-body text-lg text-white/80'
        }`}>
          My practice spans visual design, full-stack development, and 
          creative coding. I believe in the power of thoughtful details 
          and the beauty of functional simplicity.
        </p>

        <p className={`leading-relaxed ${
          isPCV 
            ? 'font-mono text-xs text-[#0066ff]/70' 
            : 'font-body text-lg text-white/80'
        }`}>
          When I'm not being inspired by design or exploring technology, you'll find 
          me experimenting with generative art, playing tennis,
          or catching a wave.
        </p>
      </div>

      {/* Skills/Expertise */}
      <div className="mt-12 md:mt-16">
        <h2 className={`${
          isPCV 
            ? 'font-mono text-xs tracking-wider text-[#0066ff]/50 mb-6' 
            : 'font-display text-xl font-bold uppercase tracking-tight mb-8'
        }`}>
          {isPCV ? 'EXPERTISE' : 'EXPERTISE'}
        </h2>

        <div className={`grid md:grid-cols-2 gap-8 ${
          isPCV ? 'max-w-xl' : 'max-w-2xl'
        }`}>
          <div>
            <h3 className={`${
              isPCV 
                ? 'font-mono text-xs mb-3' 
                : 'font-body text-lg font-semibold mb-4'
            }`}>
              Design
            </h3>
            <ul className={`space-y-2 ${
              isPCV 
                ? 'font-mono text-xs text-[#0066ff]/70' 
                : 'font-body text-white/60'
            }`}>
              <li>Visuals</li>
              <li>Art Direction</li>
              <li>Identity</li>
              <li>UI / UX</li>
            </ul>
          </div>

          <div>
            <h3 className={`${
              isPCV 
                ? 'font-mono text-xs mb-3' 
                : 'font-body text-lg font-semibold mb-4'
            }`}>
              Development
            </h3>
            <ul className={`space-y-2 ${
              isPCV 
                ? 'font-mono text-xs text-[#0066ff]/70' 
                : 'font-body text-white/60'
            }`}>
              <li>Cursor + Claude Code</li>
              <li>Python</li>
              <li>SQL</li>
              <li>JS</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mt-12 md:mt-16">
        <h2 className={`${
          isPCV 
            ? 'font-mono text-xs tracking-wider text-[#0066ff]/50 mb-6' 
            : 'font-display text-xl font-bold uppercase tracking-tight mb-8'
        }`}>
          {isPCV ? 'EXPERIENCE' : 'EXPERIENCE'}
        </h2>

        <div className={`space-y-6 ${isPCV ? 'max-w-xl' : 'max-w-2xl'}`}>
          {[
            { role: 'Software & Data Engineer', company: 'RTX', period: '2023 — 2025' },
            { role: 'Software Development Intern', company: 'Amazon', period: '2022' },
            { role: 'Ohzone', company: 'Software & Data Intern', period: '2021' },
          ].map((job, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row md:items-center md:justify-between py-4 ${
                isPCV ? 'border-b border-[#0066ff]/20' : 'border-b border-white/10'
              }`}
            >
              <div>
                <h3 className={`${
                  isPCV 
                    ? 'font-mono text-xs' 
                    : 'font-body text-lg font-medium'
                }`}>
                  {job.role}
                </h3>
                <p className={`${
                  isPCV 
                    ? 'font-mono text-xs text-[#0066ff]/70' 
                    : 'font-body text-white/60'
                }`}>
                  {job.company}
                </p>
              </div>
              <span className={`mt-1 md:mt-0 ${
                isPCV 
                  ? 'font-mono text-xs text-[#0066ff]/50' 
                  : 'font-body text-sm text-white/40'
              }`}>
                {job.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const { isPCV, isJarcos } = useTheme()

  if (isPCV) {
    return (
      <PCVLayout>
        <AboutContent />
      </PCVLayout>
    )
  }

  if (isJarcos) {
    return (
      <JarcosLayout>
        <div className="max-w-4xl mx-auto">
          <AboutContent />
        </div>
      </JarcosLayout>
    )
  }

  return null
}
