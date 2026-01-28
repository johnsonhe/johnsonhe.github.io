import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import ImageLightbox from '../components/ImageLightbox'
import PCVLayout from '../themes/pcv/PCVLayout'
import JarcosLayout from '../themes/jarcos/JarcosLayout'

// Gallery images with mixed aspect ratios
const galleryImages = [
  { 
    src: '/images/visions/vision-1.jpg', 
    alt: 'Vision 1', 
    caption: 'Moss Cave Kitchen',
    aspectRatio: 'landscape'
  },
  { 
    src: '/images/visions/vision-2.jpg', 
    alt: 'Vision 2', 
    caption: 'Quarry Dining',
    aspectRatio: 'portrait'
  },
  { 
    src: '/images/visions/vision-3.jpg', 
    alt: 'Vision 3', 
    caption: 'Jungle Retreat',
    aspectRatio: 'portrait'
  },
  { 
    src: '/images/visions/vision-4.jpg', 
    alt: 'Vision 4', 
    caption: 'Crimson Cozy',
    aspectRatio: 'portrait'
  },
  { 
    src: '/images/visions/vision-5.jpg', 
    alt: 'Vision 5', 
    caption: 'Bamboo Sanctuary',
    aspectRatio: 'portrait'
  },
]

function GalleryContent() {
  const { isPCV } = useTheme()
  const [selectedImage, setSelectedImage] = useState(null)

  const getAspectRatioClass = (ratio) => {
    switch (ratio) {
      case 'portrait': return 'aspect-[3/4]'
      case 'square': return 'aspect-square'
      case 'wide': return 'aspect-video'
      case 'landscape': 
      default: return 'aspect-[4/3]'
    }
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-12 animate-fade-in">
        <h1 className={`${
          isPCV 
            ? 'font-mono text-xs tracking-wider' 
            : 'font-display text-4xl md:text-5xl font-bold uppercase tracking-tight'
        }`}>
          {isPCV ? 'VISIONS' : 'VISIONS'}
        </h1>
        <p className={`mt-4 ${
          isPCV 
            ? 'font-mono text-xs text-[#0066ff]/70' 
            : 'font-body text-lg text-white/60'
        }`}>
          A collection of visual experiments and digital explorations.
        </p>
      </div>

      {/* Gallery Grid - One image per row with alternating offsets */}
      <div className="space-y-8 md:space-y-12">
        {galleryImages.map((image, index) => (
          <div 
            key={index}
            className={`
              animate-slide-up max-w-md
              ${index % 2 === 0 
                ? 'md:mr-auto md:ml-0' 
                : 'md:ml-auto md:mr-0'
              }
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <button
              onClick={() => setSelectedImage(image)}
              className={`
                block w-full overflow-hidden rounded-lg transition-all duration-300
                ${isPCV 
                  ? 'hover:opacity-80' 
                  : 'hover:shadow-2xl hover:shadow-white/10'
                }
                group
              `}
            >
              <div className={`relative ${getAspectRatioClass(image.aspectRatio)} overflow-hidden`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay with caption */}
                <div className={`
                  absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  ${isPCV 
                    ? 'bg-gradient-to-t from-black/80 to-transparent' 
                    : 'bg-gradient-to-t from-black/80 to-transparent'
                  }
                `}>
                  <span className={`${
                    isPCV 
                      ? 'font-mono text-xs text-white' 
                      : 'font-body text-lg text-white'
                  }`}>
                    {image.caption}
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <ImageLightbox 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  )
}

export default function Visions() {
  const { isPCV, isJarcos } = useTheme()

  if (isPCV) {
    return (
      <PCVLayout>
        <GalleryContent />
      </PCVLayout>
    )
  }

  if (isJarcos) {
    return (
      <JarcosLayout>
        <div className="max-w-5xl mx-auto">
          <GalleryContent />
        </div>
      </JarcosLayout>
    )
  }

  return null
}
