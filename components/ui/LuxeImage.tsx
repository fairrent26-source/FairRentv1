import { cn } from "@/lib/utils";

interface LuxeImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

/** Unsplash / luxury images with subtle grayscale and brightness to sit on Obsidian. */
export function LuxeImage({ src, alt, className, imgClassName }: LuxeImageProps) {
  return (
    <div className={cn("relative aspect-video w-full overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover grayscale-[0.15] brightness-90", imgClassName)}
      />
    </div>
  );
}
