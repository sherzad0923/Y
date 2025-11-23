import { createClient } from '@supabase/supabase-js';

export const createServiceClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, serviceRole, { auth: { autoRefreshToken: false, persistSession: false } });
};

export const createAnonClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
};
