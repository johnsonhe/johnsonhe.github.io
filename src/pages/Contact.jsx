import { useTheme } from '../context/ThemeContext'
import PCVLayout from '../themes/pcv/PCVLayout'
import JarcosLayout from '../themes/jarcos/JarcosLayout'

const socialLinks = [
  { name: 'Email', href: 'mailto:johnsonhe@columbia.edu', handle: 'johnsonhe@columbia.edu' },
  { name: 'GitHub', href: 'https://github.com/johnsonhe', handle: '@johnsonhe' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/johnson-he', handle: '/in/johnson-he' },
  { name: 'Instagram', href: 'https://instagram.com/jhqs_', handle: '@jhqs_' },
]

function ContactContent() {
  const { isPCV } = useTheme()

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <h1 className={`${
        isPCV 
          ? 'font-mono text-xs tracking-wider' 
          : 'font-display text-4xl md:text-5xl font-bold uppercase tracking-tight'
      }`}>
        {isPCV ? 'CONTACT' : 'CONTACT'}
      </h1>

      {/* Intro */}
      <div className={`mt-8 ${isPCV ? 'max-w-xl' : 'max-w-2xl'}`}>
        <p className={`leading-relaxed ${
          isPCV 
            ? 'font-mono text-xs text-[#0066ff]/70' 
            : 'font-body text-lg text-white/80'
        }`}>
          I'm always interested in hearing about new projects, creative 
          collaborations, or opportunities to make something great together.
        </p>

        <p className={`mt-4 leading-relaxed ${
          isPCV 
            ? 'font-mono text-xs text-[#0066ff]/70' 
            : 'font-body text-lg text-white/80'
        }`}>
          Feel free to reach out through any of the channels below.
        </p>
      </div>

      {/* Primary CTA - Email */}
      <div className="mt-12">
        <a 
          href="mailto:johnsonhe@columbia.edu"
          className={`
            inline-flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300
            ${isPCV 
              ? 'bg-[#0066ff] text-white hover:bg-[#0066ff]/90 font-mono text-xs' 
              : 'bg-white text-jarcos-bg hover:bg-white/90 font-body text-lg font-medium'
            }
          `}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>johnsonhe@columbia.edu</span>
        </a>
      </div>

      {/* Social Links */}
      <div className="mt-16">
        <h2 className={`${
          isPCV 
            ? 'font-mono text-xs tracking-wider text-[#0066ff]/50 mb-6' 
            : 'font-display text-xl font-bold uppercase tracking-tight mb-8'
        }`}>
          {isPCV ? 'ELSEWHERE' : 'ELSEWHERE'}
        </h2>

        <div className={`space-y-4 ${isPCV ? 'max-w-md' : 'max-w-lg'}`}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className={`
                flex items-center justify-between py-3 border-b transition-colors group
                ${isPCV 
                  ? 'border-[#0066ff]/20 hover:border-[#0066ff]/40' 
                  : 'border-white/10 hover:border-white/30'
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className={`${
                isPCV 
                  ? 'font-mono text-xs text-[#0066ff]/70 group-hover:text-[#0066ff]' 
                  : 'font-body text-white/60 group-hover:text-white'
              } transition-colors`}>
                {link.name}
              </span>
              <span className={`${
                isPCV 
                  ? 'font-mono text-xs' 
                  : 'font-body'
              }`}>
                {link.handle}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Location & Availability */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className={`${
            isPCV 
              ? 'font-mono text-xs tracking-wider text-[#0066ff]/50 mb-3' 
              : 'font-display text-lg font-bold uppercase tracking-tight mb-4'
          }`}>
            {isPCV ? 'LOCATION' : 'LOCATION'}
          </h2>
          <p className={`${
            isPCV 
              ? 'font-mono text-xs' 
              : 'font-body text-white/80'
          }`}>
            NYC, NY
          </p>
          <p className={`mt-1 ${
            isPCV 
              ? 'font-mono text-xs text-[#0066ff]/70' 
              : 'font-body text-white/50'
          }`}>
            Available for remote work worldwide
          </p>
        </div>

        <div>
          <h2 className={`${
            isPCV 
              ? 'font-mono text-xs tracking-wider text-[#0066ff]/50 mb-3' 
              : 'font-display text-lg font-bold uppercase tracking-tight mb-4'
          }`}>
            {isPCV ? 'AVAILABILITY' : 'AVAILABILITY'}
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className={`${
              isPCV 
                ? 'font-mono text-xs' 
                : 'font-body text-white/80'
            }`}>
              Open to new projects
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const { isPCV, isJarcos } = useTheme()

  if (isPCV) {
    return (
      <PCVLayout>
        <ContactContent />
      </PCVLayout>
    )
  }

  if (isJarcos) {
    return (
      <JarcosLayout>
        <div className="max-w-4xl mx-auto">
          <ContactContent />
        </div>
      </JarcosLayout>
    )
  }

  return null
}
