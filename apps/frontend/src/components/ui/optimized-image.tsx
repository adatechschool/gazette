import { Image, ImageProps } from '@chakra-ui/react'
import NextImage from 'next/image'
import { memo } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'as'> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
}

// Optimisation : générer un placeholder SVG plus efficace
function generatePlaceholder(width: number, height: number) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#999" text-anchor="middle" dy=".3em">
        Chargement...
      </text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export const OptimizedImage = memo(({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false,
  quality = 75,
  ...props
}: OptimizedImageProps) => {
  // Optimisation : générer le placeholder une seule fois
  const placeholder = generatePlaceholder(width, height)

  return (
    <Image
      as={NextImage}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      placeholder="blur"
      blurDataURL={placeholder}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  )
})

OptimizedImage.displayName = 'OptimizedImage'
