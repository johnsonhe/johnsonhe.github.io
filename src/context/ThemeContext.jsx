import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export const THEMES = {
  PCV: 'pcv',
  JARCOS: 'jarcos',
}

export const THEME_NAMES = {
  [THEMES.PCV]: 'P.CV',
  [THEMES.JARCOS]: 'Jarcos',
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage or default to 'pcv'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme')
      return saved && Object.values(THEMES).includes(saved) ? saved : THEMES.PCV
    }
    return THEMES.PCV
  })

  useEffect(() => {
    // Persist theme to localStorage
    localStorage.setItem('portfolio-theme', theme)
    
    // Update document class for theme-specific styles
    document.documentElement.classList.remove('theme-pcv', 'theme-jarcos')
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme])

  const value = {
    theme,
    setTheme,
    isPCV: theme === THEMES.PCV,
    isJarcos: theme === THEMES.JARCOS,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
