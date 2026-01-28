import { useTheme } from '../context/ThemeContext'
import PCVHome from '../themes/pcv/PCVHome'
import JarcosHome from '../themes/jarcos/JarcosHome'

export default function Home() {
  const { isPCV, isJarcos } = useTheme()

  if (isPCV) return <PCVHome />
  if (isJarcos) return <JarcosHome />
  
  return null
}
