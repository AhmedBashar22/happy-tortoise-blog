import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'

const ThumbnailDisplay = ({
  src,
  alt,
  height,
  width,
}: {
  src: string | StaticImport
  alt: string
  width?: number
  height?: number
}) => {
  return (
    <div className="relative bg-background overflow-clip flex justify-center items-center aspect-video w-full h-full">
      <ImageIcon className="text-foreground w-1/2" />
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full h-full object-cover z-10 blur-lg"
      />
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full h-full object-contain z-20"
      />
    </div>
  )
}

export default ThumbnailDisplay
