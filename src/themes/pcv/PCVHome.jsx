import { useEffect, useRef } from 'react'

export default function PCVHome() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const ripplesRef = useRef([])
  const isAutoRipple = useRef(false)
  const lastRippleTime = useRef(0)
  const centerRef = useRef({ x: 0, y: 0 })
  
  const MAX_RIPPLES = 20
  const AUTO_RIPPLE_INTERVAL = 2000 // Even slower auto-ripple

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    let animationId
    
    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      centerRef.current = { 
        x: rect.width * 0.5, 
        y: rect.height * 0.6 
      }
    }
    
    resize()
    window.addEventListener('resize', resize)

    const addRipple = () => {
      const ripple = {
        radius: 0,
        maxRadius: 150,
        speed: 0.25,
        opacity: 1
      }
      
      ripplesRef.current.push(ripple)
      if (ripplesRef.current.length > MAX_RIPPLES) {
        ripplesRef.current.shift()
      }
    }

    const draw = () => {
      const rect = container.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.font = '10px "IBM Plex Mono", "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const cx = centerRef.current.x
      const cy = centerRef.current.y

      // Handle auto-ripple
      if (isAutoRipple.current) {
        const now = Date.now()
        if (now - lastRippleTime.current > AUTO_RIPPLE_INTERVAL) {
          addRipple()
          lastRippleTime.current = now
        }
      }

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        ripple.radius += ripple.speed
        ripple.opacity = Math.max(0, 1 - (ripple.radius / ripple.maxRadius) ** 0.5)
        
        if (ripple.opacity <= 0.02) return false

        const r = ripple.radius
        
        // Flat ellipse - slightly taller
        const hStretch = 6
        const vStretch = 0.55

        ctx.fillStyle = `rgba(0, 102, 255, ${ripple.opacity * 0.5})`
        
        // Draw complete ellipse with horizontal dashes
        const steps = Math.max(150, Math.floor(r * hStretch))
        
        for (let i = 0; i < steps; i++) {
          const angle = (i / steps) * Math.PI * 2
          const px = cx + Math.cos(angle) * r * hStretch
          const py = cy + Math.sin(angle) * r * vStretch
          
          if (px < -30 || px > rect.width + 30 || py < -30 || py > rect.height + 30) continue
          
          ctx.fillText('─', px, py)
        }

        return true
      })

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    const handleClick = (e) => {
      if (e.target.tagName === 'A' || e.target.closest('a')) return
      addRipple()
    }

    const handleContextMenu = (e) => {
      e.preventDefault()
      if (e.target.tagName === 'A' || e.target.closest('a')) return
      isAutoRipple.current = !isAutoRipple.current
      if (isAutoRipple.current) {
        lastRippleTime.current = 0
      }
    }

    container.addEventListener('click', handleClick)
    container.addEventListener('contextmenu', handleContextMenu)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      container.removeEventListener('click', handleClick)
      container.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-hidden bg-white text-[#0066ff] font-mono select-none cursor-crosshair relative"
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative h-full p-6 md:p-8" style={{ zIndex: 10 }}>
        <div className="mt-2">
          <h1 className="text-sm font-normal tracking-wider">JOHNSON HE</h1>
        </div>

        <div className="mt-16 space-y-1 text-xs">
          <div className="flex gap-4">
            <span className="w-16">COLUMBIA</span>
            <span className="text-[#0066ff]/70">2025 + ....</span>
          </div>
          <div className="flex gap-4">
            <span className="w-16">RTX</span>
            <span className="text-[#0066ff]/70">2023 → 2025</span>
          </div>
          <div className="flex gap-4">
            <span className="w-16">AMAZON</span>
            <span className="text-[#0066ff]/70">2022</span>
          </div>
          <div className="flex gap-4">
            <span className="w-16">CAL POLY</span>
            <span className="text-[#0066ff]/70">2019 → 2023</span>
          </div>
        </div>

        <div className="mt-12 space-y-1 text-xs">
          <div>
            <a href="/visions" className="hover:text-[#0066ff]/70 transition-colors cursor-pointer">VISIONS</a>
          </div>
          <div>
            <a href="/about" className="hover:text-[#0066ff]/70 transition-colors cursor-pointer">ABOUT</a>
          </div>
          <div>
            <a href="/projects" className="hover:text-[#0066ff]/70 transition-colors cursor-pointer">PROJECTS</a>
          </div>
        </div>

        <div className="mt-12 space-y-1 text-xs">
          <div>
            <a href="mailto:johnsonhe@columbia.edu" className="hover:text-[#0066ff]/70 transition-colors cursor-pointer">EMAIL</a>
          </div>
        </div>

        <div className="mt-12 space-y-1 text-xs">
          <div>
            <a href="https://instagram.com/jhqs_" target="_blank" rel="noopener noreferrer" className="hover:text-[#0066ff]/70 transition-colors cursor-pointer">INSTAGRAM</a>
          </div>
          <div>
            <a href="https://linkedin.com/in/johnson-he" target="_blank" rel="noopener noreferrer" className="hover:text-[#0066ff]/70 transition-colors cursor-pointer">LINKEDIN</a>
          </div>

        </div>
      </div>
    </div>
  )
}
