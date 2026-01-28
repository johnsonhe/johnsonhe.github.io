import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/visions', label: 'Visions' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const { isPCV, isJarcos } = useTheme()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path
  const isHomePage = location.pathname === '/'

  // P.CV Style Navigation - Hide on home page (it has its own nav)
  if (isPCV) {
    if (isHomePage) return null
    
    return (
      <nav className="fixed top-0 left-0 bottom-0 z-40 px-6 md:px-8 py-6 bg-white w-auto">
        <div className="flex flex-col h-full">
          <Link 
            to="/" 
            className="font-mono text-xs tracking-wider text-[#0066ff] hover:text-[#0066ff]/70 transition-colors"
          >
            JOHNSON HE
          </Link>
          
          {/* Navigation - vertical on left */}
          <ul className="mt-12 flex flex-col gap-1">
            {navLinks.filter(l => l.path !== '/').map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`font-mono text-xs tracking-wider transition-colors ${
                    isActive(path) 
                      ? 'text-[#0066ff]' 
                      : 'text-[#0066ff]/70 hover:text-[#0066ff]'
                  }`}
                >
                  {label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }

  // Jarcos Style Navigation
  if (isJarcos) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-5 pr-20">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="font-display text-lg font-bold tracking-tight text-white hover:opacity-70 transition-opacity"
          >
            JH
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`font-body text-sm uppercase tracking-widest transition-opacity ${
                    isActive(path) 
                      ? 'text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-2xl hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-jarcos-bg/95 backdrop-blur-sm animate-fade-in">
            <ul className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display text-3xl font-bold uppercase tracking-wider transition-opacity ${
                      isActive(path) 
                        ? 'text-white' 
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    )
  }

  return null
}
