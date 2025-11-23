import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface MovieCardProps {
  id: string;
  title: string;
  poster_url: string;
  is_original?: boolean;
  progress?: number;
  badge?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster_url, is_original, progress, badge }) => {
  return (
    <Link href={`/movie/${id}`} className="card" aria-label={`${title} card`}>
      <Image src={poster_url} alt={title} width={300} height={450} />
      {is_original && (
        <div className="badge" style={{ position: 'absolute', top: 12, left: 12 }}>
          Original
        </div>
      )}
      {badge && (
        <div className="badge" style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,215,0,0.2)' }}>
          {badge}
        </div>
      )}
      {typeof progress === 'number' && progress > 0 && (
        <div className="progress-bar" style={{ width: `${progress}%` }} aria-label="progress" />
      )}
      <div style={{ padding: '12px' }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
