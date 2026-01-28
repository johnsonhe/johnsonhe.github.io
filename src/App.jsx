import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import ThemeSwitcher from './components/ThemeSwitcher'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Visions from './pages/Visions'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function AppContent() {
  const { theme } = useTheme()
  
  return (
    <div className={`min-h-screen theme-transition theme-${theme}`}>
      <Navigation />
      <ThemeSwitcher />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visions" element={<Visions />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
