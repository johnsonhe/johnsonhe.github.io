import { useState, useRef, useEffect } from 'react'
import { useTheme, THEMES } from '../context/ThemeContext'

const THEME_LABELS = {
  [THEMES.PCV]: 'Minimal',
  [THEMES.JARCOS]: 'Modern',
}

export default function ThemeSwitcher() {
  const { theme, setTheme, isPCV } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="fixed top-4 right-6 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all text-2xl font-light ${
          isPCV 
            ? 'text-[#0066ff] hover:text-[#0066ff]/70' 
            : 'text-white hover:text-white/70'
        }`}
        aria-label="Switch theme"
        aria-expanded={isOpen}
      >
        *
      </button>

      {isOpen && (
        <div 
          className={`absolute top-14 right-0 w-36 rounded-lg shadow-lg overflow-hidden animate-slide-down ${
            isPCV 
              ? 'bg-[#0066ff]/10 backdrop-blur-sm border border-[#0066ff]/20' 
              : 'bg-zinc-900 border border-zinc-700'
          }`}
        >
          {Object.values(THEMES).map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => {
                setTheme(themeOption)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 ${
                isPCV 
                  ? `hover:bg-[#0066ff]/10 ${theme === themeOption ? 'text-[#0066ff]' : 'text-[#0066ff]/60'}` 
                  : `hover:bg-zinc-800 ${theme === themeOption ? 'text-white' : 'text-zinc-400'}`
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                theme === themeOption 
                  ? (isPCV ? 'bg-[#0066ff]' : 'bg-white') 
                  : 'bg-transparent'
              }`} />
              {THEME_LABELS[themeOption]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
