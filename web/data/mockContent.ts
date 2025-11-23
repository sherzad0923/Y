import { HeroSlide } from '../components/HeroCarousel';
import { MovieCardProps } from '../components/MovieCard';

export const featuredSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'Sky Harbor',
    backdrop_url: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80',
    tagline: 'A gripping sci-fi saga about survival above the clouds.',
    genres: ['Sci-Fi', 'Adventure'],
    playback_url: '#',
  },
  {
    id: 'hero-2',
    title: 'Night City Pulse',
    backdrop_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Cyberpunk thriller infused with neon jazz.',
    genres: ['Thriller', 'Mystery'],
    playback_url: '#',
  },
];

export const originals: MovieCardProps[] = [
  {
    id: 'orig-1',
    title: 'Crimson Trail',
    poster_url: 'https://images.unsplash.com/photo-1529108190281-9c171187fa19?auto=format&fit=crop&w=600&q=80',
    is_original: true,
    badge: '4K',
  },
  {
    id: 'orig-2',
    title: 'Echoes of Yama',
    poster_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    is_original: true,
  },
];

export const continueWatching: MovieCardProps[] = [
  {
    id: 'cw-1',
    title: 'Deep Current',
    poster_url: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=600&q=80',
    progress: 46,
  },
  {
    id: 'cw-2',
    title: 'Quantum Drift',
    poster_url: 'https://images.unsplash.com/photo-1502133026599-9f3755a50d78?auto=format&fit=crop&w=600&q=80',
    progress: 72,
  },
];

export const yamasChoice: MovieCardProps[] = [
  {
    id: 'choice-1',
    title: 'Aurora Divide',
    poster_url: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=600&q=80',
    badge: 'Based on your tastes',
  },
  {
    id: 'choice-2',
    title: 'Moonrise Pact',
    poster_url: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=600&q=80',
    badge: 'Critics love it',
  },
];

export const curatedMidHero = featuredSlides[0];
