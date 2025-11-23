import React from 'react';
import MovieCard, { MovieCardProps } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: MovieCardProps[];
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  if (!movies.length) return null;
  return (
    <section>
      <div className="section-title">{title}</div>
      <div className="row-scroll">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
