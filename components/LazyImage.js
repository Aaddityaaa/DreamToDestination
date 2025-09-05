"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Lazy-loads next/image when the wrapper enters the viewport.
 * Works with either `fill` or `width/height`.
 */
export default function LazyImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  sizes,
  priority = false, // keep false to truly lazy-load
  rootMargin = "200px", // start loading just before it becomes visible
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Guard for browsers/environments without IO (very rare)
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin, threshold: 0 }
    );

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [rootMargin]);

  // Wrapper must have a size for `fill` images to render
  const wrapperClass = fill
    ? "relative w-full h-full"
    : "inline-block";

  return (
    <div ref={ref} className={wrapperClass}>
      {isVisible ? (
        fill ? (
          <Image
            src={src}
            alt={alt}
            className={className}
            fill
            sizes={sizes || "100vw"}
            priority={priority}
            loading="lazy"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            loading="lazy"
          />
        )
      ) : (
        // Skeleton placeholder (adjust to taste)
        <div className="w-full h-full bg-gray-200/70 animate-pulse rounded-xl" />
      )}
    </div>
  );
}
