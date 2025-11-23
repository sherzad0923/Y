import useSWR from 'swr';
import Layout from '../../components/Layout';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const AdminPage = () => {
  const { data } = useSWR('/api/admin/dashboard-stats', fetcher);

  return (
    <Layout>
      <div className="section-title">Admin Dashboard</div>
      <p className="tagline">Manage catalog, featured slots, and moderation</p>
      <div className="grid">
        <div className="card" style={{ padding: 16 }}>
          <div className="badge">Movies</div>
          <h3>{data?.movies ?? '—'}</h3>
          <p>Total titles in catalog</p>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div className="badge">Users</div>
          <h3>{data?.users ?? '—'}</h3>
          <p>Accounts registered</p>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div className="badge">Watchlists</div>
          <h3>{data?.watchlists ?? '—'}</h3>
          <p>Items saved</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
