import type { NextApiRequest, NextApiResponse } from 'next';
import { createServiceClient } from '../../../lib/serverSupabase';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServiceClient();

  const [{ count: movieCount }, { count: userCount }, { count: watchlistCount }] = await Promise.all([
    supabase.from('movies').select('*', { count: 'exact', head: true }),
    supabase.from('user_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('watchlist_items').select('*', { count: 'exact', head: true }),
  ]);

  return res.status(200).json({ movies: movieCount ?? 0, users: userCount ?? 0, watchlists: watchlistCount ?? 0 });
}
