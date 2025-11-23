import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export interface HeroSlide {
  id: string;
  title: string;
  backdrop_url: string;
  tagline?: string;
  genres?: string[];
  playback_url?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const slide = slides[active];

  return (
    <div className="hero" aria-label="Featured carousel">
      <Image src={slide.backdrop_url} alt={slide.title} layout="fill" objectFit="cover" priority />
      <div className="hero-content">
        <div className="badge">Featured</div>
        <div className="hero-title">{slide.title}</div>
        <p className="tagline">{slide.tagline || 'Hand-picked for you by Yama\'s curators.'}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          {slide.genres?.map((genre) => (
            <span key={genre} className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>
              {genre}
            </span>
          ))}
        </div>
        <div className="hero-buttons">
          <button style={{ background: 'var(--accent)', color: '#000' }}>Play</button>
          <button style={{ background: 'transparent', border: '1px solid var(--text)', color: 'var(--text)' }}>Info</button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
