import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import { originals } from '../../data/mockContent';

interface MoviePageProps {
  id: string;
}

const MoviePage = ({ id }: MoviePageProps) => {
  const movie = originals.find((m) => m.id === id) || originals[0];
  return (
    <Layout>
      <div className="hero" style={{ minHeight: 320 }}>
        <img src={movie.poster_url} alt={movie.title} />
        <div className="hero-content">
          <div className="badge">{movie.is_original ? "Yama's Original" : 'Movie'}</div>
          <div className="hero-title">{movie.title}</div>
          <p className="tagline">A richly detailed synopsis pulled from Supabase movies table.</p>
          <div className="hero-buttons">
            <button style={{ background: 'var(--accent)', color: '#000' }}>Play</button>
            <button style={{ background: 'transparent', border: '1px solid var(--text)', color: 'var(--text)' }}>Add to Watchlist</button>
          </div>
        </div>
      </div>
      <section>
        <div className="section-title">Ratings & Reviews</div>
        <div className="card" style={{ padding: 16 }}>
          <p>Average rating: 4.5/5 (example)</p>
          <p>Group rating: 4.7/5 with sentiments like "+1 for soundtrack"</p>
        </div>
      </section>
      <section>
        <div className="section-title">Similar Titles</div>
        <div className="row-scroll">
          {originals.map((m) => (
            <MovieCard key={m.id} {...m} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async ({ params }) => {
  return { props: { id: params?.id as string } };
};

export default MoviePage;
