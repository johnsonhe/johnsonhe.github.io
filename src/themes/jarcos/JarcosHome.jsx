import { useState, useEffect, useRef, useCallback } from 'react'
import JarcosLayout from './JarcosLayout'

// Gallery images that will be used as backgrounds
const backgroundImages = [
  { src: '/images/visions/vision-1.jpg', alt: 'Vision 1' },
  { src: '/images/visions/vision-2.jpg', alt: 'Vision 2' },
  { src: '/images/visions/vision-3.jpg', alt: 'Vision 3' },
  { src: '/images/visions/vision-4.jpg', alt: 'Vision 4' },
  { src: '/images/visions/vision-5.jpg', alt: 'Vision 5' },
]

export default function JarcosHome() {
  const [imageIndex, setImageIndex] = useState(0)
  const positionRef = useRef({ x: 100, y: 100 })
  const velocityRef = useRef({ x: 1.5, y: 1.1 })
  const bounceCountRef = useRef(0)
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [, forceUpdate] = useState(0)

  const nextImage = useCallback(() => {
    setImageIndex(prev => (prev + 1) % backgroundImages.length)
  }, [])

  const handleClick = () => {
    bounceCountRef.current = 0
    nextImage()
  }

  useEffect(() => {
    let animationId

    const animate = () => {
      if (!containerRef.current || !imageRef.current) {
        animationId = requestAnimationFrame(animate)
        return
      }

      const container = containerRef.current.getBoundingClientRect()
      const imgRect = imageRef.current.getBoundingClientRect()
      const imgWidth = imgRect.width || 300
      const imgHeight = imgRect.height || 200
      
      const maxX = container.width - imgWidth
      const maxY = container.height - imgHeight

      let newX = positionRef.current.x + velocityRef.current.x
      let newY = positionRef.current.y + velocityRef.current.y
      let bounced = false

      // Bounce off edges
      if (newX <= 0) {
        velocityRef.current.x = Math.abs(velocityRef.current.x)
        newX = 0
        bounced = true
      } else if (newX >= maxX) {
        velocityRef.current.x = -Math.abs(velocityRef.current.x)
        newX = maxX
        bounced = true
      }
      
      if (newY <= 0) {
        velocityRef.current.y = Math.abs(velocityRef.current.y)
        newY = 0
        bounced = true
      } else if (newY >= maxY) {
        velocityRef.current.y = -Math.abs(velocityRef.current.y)
        newY = maxY
        bounced = true
      }

      // Count bounces and switch image every 3
      if (bounced) {
        bounceCountRef.current++
        if (bounceCountRef.current >= 3) {
          bounceCountRef.current = 0
          nextImage()
        }
      }

      positionRef.current = { x: newX, y: newY }
      forceUpdate(n => n + 1)

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [nextImage])

  return (
    <JarcosLayout fullHeight>
      <div 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-black cursor-pointer"
        onClick={handleClick}
      >
        {/* Bouncing Image */}
        <div
          ref={imageRef}
          className="absolute rounded-lg overflow-hidden shadow-2xl"
          style={{
            left: positionRef.current.x,
            top: positionRef.current.y,
          }}
        >
          <img
            src={backgroundImages[imageIndex].src}
            alt={backgroundImages[imageIndex].alt}
            className="max-w-[40vw] max-h-[50vh] w-auto h-auto"
          />
        </div>

        {/* Large "JOHNSON HE" Text at Bottom - scales to fit viewport */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none pb-6"
          style={{ mixBlendMode: 'difference' }}
        >
          <h1 
            className="text-white select-none w-full text-center uppercase"
            style={{ 
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: '800',
              fontSize: 'min(15vw, calc((100vw - 64px) / 5))',
              lineHeight: '0.9',
              letterSpacing: '-0.02em',
              padding: '0 32px'
            }}
          >
            JOHNSON HE
          </h1>
        </div>

      </div>
    </JarcosLayout>
  )
}
