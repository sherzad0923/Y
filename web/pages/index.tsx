import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import HeroCarousel from '../components/HeroCarousel';
import MovieRow from '../components/MovieRow';
import MovieCard from '../components/MovieCard';
import { featuredSlides, originals, continueWatching, yamasChoice, curatedMidHero } from '../data/mockContent';

const HomePage = () => {
  return (
    <Layout>
      <HeroCarousel slides={featuredSlides} />

      <MovieRow title="Continue Watching" movies={continueWatching} />
      <MovieRow title="Yama's Originals" movies={originals} />
      <MovieRow title="Yama's Choice" movies={yamasChoice} />

      <section>
        <div className="section-title">Trending Feature</div>
        <div className="hero" style={{ minHeight: 320 }}>
          <img src={curatedMidHero.backdrop_url} alt={curatedMidHero.title} />
          <div className="hero-content">
            <div className="badge">Trending</div>
            <div className="hero-title">{curatedMidHero.title}</div>
            <p className="tagline">Mid-feed hero slot controlled via Supabase featured_slots</p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-title">Family Challenges</div>
        <div className="grid">
          <div className="card" style={{ padding: 16 }}>
            <div className="badge">Family Epic Week</div>
            <p>Watch 3 historical epics together to unlock a badge.</p>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div className="badge">Animation Sprint</div>
            <p>Finish two animated films on a kid profile.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Stub SSR placeholder for potential Supabase fetches
  return { props: {} };
};

export default HomePage;
