-- Yama's Supabase schema
-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Base user profile table linked to auth.users
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  role text check (role in ('user','moderator','admin','super_admin')) default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  age int default 18,
  avatar_url text,
  is_kid_profile boolean default false,
  pin_code text,
  max_age_rating text default 'PG',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.movies (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  year int,
  duration_minutes int,
  age_rating text default 'PG-13',
  is_original boolean default false,
  cloudflare_video_id text,
  playback_url text,
  poster_url text,
  backdrop_url text,
  trailer_url text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.genres (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null
);

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  description text
);

create table if not exists public.movie_genres (
  id uuid primary key default uuid_generate_v4(),
  movie_id uuid references public.movies(id) on delete cascade,
  genre_id uuid references public.genres(id) on delete cascade
);

create table if not exists public.movie_categories (
  id uuid primary key default uuid_generate_v4(),
  movie_id uuid references public.movies(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade
);

create table if not exists public.watchlist_items (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  movie_id uuid references public.movies(id) on delete cascade,
  added_at timestamptz default now()
);

create table if not exists public.progress (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  movie_id uuid references public.movies(id) on delete cascade,
  position_seconds int default 0,
  completed boolean default false,
  updated_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  movie_id uuid references public.movies(id) on delete cascade,
  rating int check (rating >= 0 and rating <= 5),
  comment text,
  sentiment_tag text,
  created_at timestamptz default now()
);

create table if not exists public.friend_groups (
  id uuid primary key default uuid_generate_v4(),
  owner_profile_id uuid references public.profiles(id) on delete cascade,
  name text not null
);

create table if not exists public.friend_group_members (
  id uuid primary key default uuid_generate_v4(),
  friend_group_id uuid references public.friend_groups(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade
);

create table if not exists public.group_ratings (
  id uuid primary key default uuid_generate_v4(),
  friend_group_id uuid references public.friend_groups(id) on delete cascade,
  movie_id uuid references public.movies(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  rating int check (rating >= 0 and rating <= 5),
  extra_comment text,
  created_at timestamptz default now()
);

create table if not exists public.featured_slots (
  id uuid primary key default uuid_generate_v4(),
  slot_key text not null,
  movie_id uuid references public.movies(id) on delete cascade,
  position int default 0,
  updated_at timestamptz default now()
);

-- RLS enabling
alter table public.user_profiles enable row level security;
alter table public.profiles enable row level security;
alter table public.watchlist_items enable row level security;
alter table public.progress enable row level security;
alter table public.reviews enable row level security;
alter table public.friend_groups enable row level security;
alter table public.friend_group_members enable row level security;
alter table public.group_ratings enable row level security;
alter table public.movies enable row level security;
alter table public.categories enable row level security;
alter table public.genres enable row level security;
alter table public.movie_genres enable row level security;
alter table public.movie_categories enable row level security;
alter table public.featured_slots enable row level security;

-- Helpers
create or replace function public.is_admin() returns boolean as $$
begin
  return exists(select 1 from public.user_profiles up where up.id = auth.uid() and up.role in ('admin','super_admin','moderator'));
end;
$$ language plpgsql security definer;

-- User profiles policies
create policy if not exists "Users can view their profile" on public.user_profiles
for select using (auth.uid() = id);

create policy if not exists "Users update own profile" on public.user_profiles
for update using (auth.uid() = id);

-- Profiles policies
create policy if not exists "Profiles belong to user" on public.profiles
for all using (auth.uid() = user_id);

-- Watchlist policies
create policy if not exists "Watchlist readable by owner" on public.watchlist_items
for select using (profile_id in (select id from public.profiles where user_id = auth.uid()));

create policy if not exists "Watchlist insert by owner" on public.watchlist_items
for insert with check (profile_id in (select id from public.profiles where user_id = auth.uid()));

create policy if not exists "Watchlist delete by owner" on public.watchlist_items
for delete using (profile_id in (select id from public.profiles where user_id = auth.uid()));

-- Progress policies
create policy if not exists "Progress by owner" on public.progress
for all using (profile_id in (select id from public.profiles where user_id = auth.uid()));

-- Reviews policies
create policy if not exists "Reviews by owner" on public.reviews
for all using (profile_id in (select id from public.profiles where user_id = auth.uid()));

-- Friend group policies
create policy if not exists "Friend groups by owner" on public.friend_groups
for all using (owner_profile_id in (select id from public.profiles where user_id = auth.uid()));

create policy if not exists "Friend group members visible" on public.friend_group_members
for select using (friend_group_id in (select id from public.friend_groups fg where fg.owner_profile_id in (select id from public.profiles where user_id = auth.uid())) or profile_id in (select id from public.profiles where user_id = auth.uid()));

create policy if not exists "Friend group members insert" on public.friend_group_members
for insert with check (friend_group_id in (select id from public.friend_groups fg where fg.owner_profile_id in (select id from public.profiles where user_id = auth.uid())));

-- Group ratings policies
create policy if not exists "Group ratings ownership" on public.group_ratings
for all using (profile_id in (select id from public.profiles where user_id = auth.uid()));

-- Catalog read policies
create policy if not exists "Movies public read" on public.movies
for select using (is_published = true or is_admin());

create policy if not exists "Genres read" on public.genres
for select using (true);

create policy if not exists "Categories read" on public.categories
for select using (true);

create policy if not exists "Movie genres read" on public.movie_genres
for select using (true);

create policy if not exists "Movie categories read" on public.movie_categories
for select using (true);

create policy if not exists "Featured slots read" on public.featured_slots
for select using (true);

-- Admin write policies
create policy if not exists "Admins manage movies" on public.movies
for all using (is_admin());

create policy if not exists "Admins manage genres" on public.genres
for all using (is_admin());

create policy if not exists "Admins manage categories" on public.categories
for all using (is_admin());

create policy if not exists "Admins manage movie genres" on public.movie_genres
for all using (is_admin());

create policy if not exists "Admins manage movie categories" on public.movie_categories
for all using (is_admin());

create policy if not exists "Admins manage featured slots" on public.featured_slots
for all using (is_admin());

-- Trigger to update timestamps
create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_timestamp_user_profiles
before update on public.user_profiles
for each row execute procedure public.touch_updated_at();

create trigger set_timestamp_profiles
before update on public.profiles
for each row execute procedure public.touch_updated_at();

create trigger set_timestamp_movies
before update on public.movies
for each row execute procedure public.touch_updated_at();

create trigger set_timestamp_featured_slots
before update on public.featured_slots
for each row execute procedure public.touch_updated_at();
