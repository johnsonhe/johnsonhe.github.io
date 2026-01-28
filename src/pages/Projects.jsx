import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import PCVLayout from '../themes/pcv/PCVLayout'
import JarcosLayout from '../themes/jarcos/JarcosLayout'

const projects = [
  {
    title: 'JohnsonHe.com',
    description: 'Personal website designed and built up from scratch.',
    tags: ['JS', 'HTML', 'CSS'],
    fullDescription: 'Personal website designed and built up from scratch, 2 distinct themes (minimal + modern) accessed by top right *, and complete with custom interactive easter eggs (try left and right clicking on min theme).' ,
    images: [],
    video: null,
    links: [
      { label: 'Github', url: 'https://github.com/johnsonhe/johnsonhe.github.io' }
    ],
  },
  {
    title: 'Gallerist',
    description: 'iOS social discovery app for art gallery exhibitions where users can browse exhibits, follow other art enthusiasts, share insights, and track their gallery visits. (Coming soon to the App Store)',
    tags: ['Swift', 'Figma', 'SQL', 'Python'],
    fullDescription: 'Gallerist is a comprehensive iOS application designed to revolutionize how art enthusiasts discover and engage with gallery exhibitions. The app features real-time exhibition tracking, social features for connecting with fellow art lovers, and personalized recommendations based on your artistic preferences.',
    images: [
      '/project1/g1.png',
      '/project1/g2.png',
      '/project1/g3.png',
      '/project1/g4.png',
      '/project1/g5.png',
      '/project1/g6.png',
      '/project1/g7.png',
      '/project1/g8.png',
    ],
    video: null,
    links: [
      { label: 'App Store (Coming Soon)', url: null },
      { label: 'Github (private)', url: 'https://github.com/johnsonhe/gallerist' }
    ],
  },
  {
    title: 'Kalshi Resolution Analyzer',
    description: 'A Chrome extension that evaluates Kalshi market resolution criteria and highlights unclear language, edge cases, and potential risks.',
    tags: ['OpenRouter', 'JS', 'HTML', 'CSS'],
    fullDescription: 'This Chrome extension helps Kalshi traders make more informed decisions by automatically analyzing market resolution criteria. It uses AI to identify potentially ambiguous language, edge cases that could affect resolution, and other risks that might not be immediately apparent.',
    images: [],
    video: '/project2/DemoVideo.mp4',
    links: [
      { label: 'GitHub (private)', url: 'https://github.com/johnsonhe/Kalshi-Resolution-Analyzer' },
    ],
  },
  {
    title: 'InSpace2',
    description: 'A React-based web application for drawing floorplans and generating AI-powered photorealistic renders.',
    tags: ['JS', 'HTML', 'CSS', 'Gemini-Flash'],
    fullDescription: 'InSpace2 allows users to quickly sketch floorplans using an intuitive drawing interface, then leverages Gemini Flash to generate stunning photorealistic renders of the designed spaces. Perfect for interior designers, architects, and anyone looking to visualize their space ideas.',
    images: [],
    video: null,
    pdf: '/project3/AI-Powered-Floorplan-Rendering_powerpoint (1).pdf',
    links: [
      { label: 'GitHub', url: 'https://github.com/johnsonhe/indesign' },
    ],
  },
  {
    title: 'Job Compass',
    description: 'A sophisticated Chrome extension that scrapes job listings, scores them using AI, and provides intelligent recommendations for job applications.',
    tags: ['JS', 'HTML', 'CSS', 'LLM APIs'],
    fullDescription: 'Job Compass streamlines the job search process by automatically analyzing job listings and scoring them based on your skills, preferences, and career goals. The extension provides actionable insights and recommendations to help you focus on the most promising opportunities.',
    images: [],
    video: '/project4/AML_Final_Project.mp4',
    links: [
      { label: 'Github', url: 'https://github.com/johnsonhe/JobCompass.ext' },
    ],
  },
]

// Project Detail Modal Component
function ProjectModal({ project, onClose, isPCV }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!project) return null

  const hasImages = project.images && project.images.length > 0
  const hasVideo = project.video
  const hasPdf = project.pdf

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 ${isPCV ? 'bg-white/90' : 'bg-black/90'} backdrop-blur-sm`} />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl ${
          isPCV 
            ? 'bg-white border border-[#0066ff]/20 shadow-xl' 
            : 'bg-zinc-900 border border-white/10'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            isPCV 
              ? 'bg-[#0066ff]/10 text-[#0066ff] hover:bg-[#0066ff]/20' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          ✕
        </button>

        <div className="p-6 md:p-8">
          {/* Title */}
          <h2 className={`pr-8 ${
            isPCV 
              ? 'font-mono text-lg text-[#0066ff]' 
              : 'font-display text-3xl font-bold text-white'
          }`}>
            {project.title}
          </h2>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span 
                key={i}
                className={`px-2 py-1 text-xs rounded ${
                  isPCV 
                    ? 'font-mono bg-[#0066ff]/10 text-[#0066ff]/70' 
                    : 'font-body bg-white/10 text-white/60'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Full Description */}
          <p className={`mt-4 leading-relaxed ${
            isPCV 
              ? 'font-mono text-sm text-[#0066ff]/80' 
              : 'font-body text-white/70'
          }`}>
            {project.fullDescription || project.description}
          </p>

          {/* Image Carousel */}
          {hasImages && (
            <div className="mt-6">
              <div className="relative rounded-lg overflow-hidden bg-black/5 flex items-center justify-center">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[60vh] w-auto h-auto object-contain"
                />
                
                {/* Carousel Navigation */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(i => (i - 1 + project.images.length) % project.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(i => (i + 1) % project.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      →
                    </button>
                    
                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === currentImageIndex ? 'bg-white' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Video */}
          {hasVideo && (
            <div className="mt-6">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                <video
                  src={project.video}
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                />
              </div>
            </div>
          )}

          {/* PDF */}
          {hasPdf && (
            <div className="mt-6">
              <iframe
                src={project.pdf}
                className="w-full h-[70vh] rounded-lg border-0"
                title={`${project.title} PDF`}
              />
            </div>
          )}

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    isPCV 
                      ? 'font-mono bg-[#0066ff] text-white hover:bg-[#0066ff]/80' 
                      : 'font-body bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {link.label}
                  <span>→</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectsContent() {
  const { isPCV } = useTheme()
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <h1 className={`${
        isPCV 
          ? 'font-mono text-xs tracking-wider' 
          : 'font-display text-4xl md:text-5xl font-bold uppercase tracking-tight'
      }`}>
        {isPCV ? 'PROJECTS' : 'PROJECTS'}
      </h1>

      <p className={`mt-4 ${
        isPCV 
            ? 'font-mono text-xs text-[#0066ff]/70 max-w-xl'
          : 'font-body text-lg text-white/60 max-w-2xl'
      }`}>
        A selection of projects spanning design, development, and creative exploration.
      </p>

      {/* Projects Grid */}
      <div className="mt-12 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => setSelectedProject(project)}
            className={`
              block w-full text-left p-6 rounded-xl transition-all duration-300 group
              animate-slide-up
              ${isPCV 
                ? 'border border-[#0066ff]/20 hover:border-[#0066ff]/40 hover:bg-[#0066ff]/5' 
                : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
              }
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Title */}
            <h2 className={`${
              isPCV 
                ? 'font-mono text-sm group-hover:text-[#0066ff]/70 transition-colors' 
                : 'font-display text-2xl font-bold group-hover:text-white/80 transition-colors'
            }`}>
              {project.title}
            </h2>

            {/* Description */}
            <p className={`mt-3 ${
              isPCV 
                ? 'font-mono text-xs text-[#0066ff]/70 leading-relaxed' 
                : 'font-body text-white/60 leading-relaxed'
            }`}>
              {project.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className={`px-2 py-1 text-xs rounded ${
                    isPCV 
                      ? 'font-mono bg-[#0066ff]/10 text-[#0066ff]/60' 
                      : 'font-body bg-white/10 text-white/50'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Arrow indicator */}
            <div className={`mt-4 flex items-center gap-2 ${
              isPCV 
                ? 'text-[#0066ff]/50 group-hover:text-[#0066ff]' 
                : 'text-white/40 group-hover:text-white'
            } transition-colors`}>
              <span className={`text-xs ${isPCV ? 'font-mono' : 'font-body'}`}>
                View details
              </span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className={`mt-16 pt-8 ${
        isPCV ? 'border-t border-[#0066ff]/20' : 'border-t border-white/10'
      }`}>
        <p className={`${
          isPCV 
            ? 'font-mono text-xs text-[#0066ff]/70' 
            : 'font-body text-white/60'
        }`}>
          Interested in collaborating?{' '}
          <a 
            href="/contact" 
            className={`underline underline-offset-4 ${
              isPCV 
                ? 'text-[#0066ff] hover:text-[#0066ff]/70' 
                : 'text-white hover:text-white/70'
            } transition-colors`}
          >
            Let's talk
          </a>
        </p>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          isPCV={isPCV}
        />
      )}
    </div>
  )
}

export default function Projects() {
  const { isPCV, isJarcos } = useTheme()

  if (isPCV) {
    return (
      <PCVLayout>
        <ProjectsContent />
      </PCVLayout>
    )
  }

  if (isJarcos) {
    return (
      <JarcosLayout>
        <div className="max-w-4xl mx-auto">
          <ProjectsContent />
        </div>
      </JarcosLayout>
    )
  }

  return null
}
