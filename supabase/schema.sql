-- ともログ Supabase schema
-- Supabase SQL Editor で実行してください。

create extension if not exists "pgcrypto";

create type public.friendship_status as enum ('pending', 'accepted', 'blocked');
create type public.visibility_level as enum ('public', 'friends', 'close_friends', 'private');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  nickname text,
  avatar_url text,
  birthday date,
  prefecture text,
  occupation text,
  school text,
  personality_type text,
  bio text,
  interests text[] not null default '{}',
  instagram text,
  x_handle text,
  tiktok text,
  profile_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.profile_visibility (
  user_id uuid not null references public.profiles(id) on delete cascade,
  field_name text not null,
  visibility public.visibility_level not null default 'friends',
  primary key (user_id, field_name)
);

create table public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  addressee_id uuid not null references public.profiles(id) on delete cascade,
  status public.friendship_status not null default 'pending',
  is_close_requester boolean not null default false,
  is_close_addressee boolean not null default false,
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  check (requester_id <> addressee_id)
);

create unique index friendships_unique_pair
on public.friendships (
  least(requester_id, addressee_id),
  greatest(requester_id, addressee_id)
);

create table public.manual_friends (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null,
  birthday date,
  prefecture text,
  occupation text,
  personality_type text,
  relationship_label text,
  interests text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.private_friend_notes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  friend_user_id uuid references public.profiles(id) on delete cascade,
  manual_friend_id uuid references public.manual_friends(id) on delete cascade,
  note text not null default '',
  gift_ideas text,
  next_topic text,
  last_met_on date,
  relationship_label text,
  updated_at timestamptz not null default now(),
  check (
    (friend_user_id is not null and manual_friend_id is null)
    or (friend_user_id is null and manual_friend_id is not null)
  )
);

create unique index private_notes_user_unique
on public.private_friend_notes(owner_id, friend_user_id)
where friend_user_id is not null;

create unique index private_notes_manual_unique
on public.private_friend_notes(owner_id, manual_friend_id)
where manual_friend_id is not null;

create table public.memories (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  happened_on date not null,
  place_name text,
  created_at timestamptz not null default now()
);

create table public.memory_members (
  memory_id uuid not null references public.memories(id) on delete cascade,
  friend_user_id uuid references public.profiles(id) on delete cascade,
  manual_friend_id uuid references public.manual_friends(id) on delete cascade,
  primary key (memory_id, friend_user_id, manual_friend_id),
  check (friend_user_id is not null or manual_friend_id is not null)
);

create table public.wish_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  note text,
  is_done boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.wish_members (
  wish_id uuid not null references public.wish_items(id) on delete cascade,
  friend_user_id uuid references public.profiles(id) on delete cascade,
  manual_friend_id uuid references public.manual_friends(id) on delete cascade,
  primary key (wish_id, friend_user_id, manual_friend_id),
  check (friend_user_id is not null or manual_friend_id is not null)
);

create table public.profile_update_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  field_name text not null,
  created_at timestamptz not null default now()
);

create table public.push_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  expo_push_token text not null unique,
  platform text not null,
  created_at timestamptz not null default now()
);

create or replace function public.are_friends(a uuid, b uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.friendships
    where status = 'accepted'
      and (
        (requester_id = a and addressee_id = b)
        or (requester_id = b and addressee_id = a)
      )
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.profile_visibility enable row level security;
alter table public.friendships enable row level security;
alter table public.manual_friends enable row level security;
alter table public.private_friend_notes enable row level security;
alter table public.memories enable row level security;
alter table public.memory_members enable row level security;
alter table public.wish_items enable row level security;
alter table public.wish_members enable row level security;
alter table public.profile_update_events enable row level security;
alter table public.push_devices enable row level security;

create policy "profiles self read"
on public.profiles for select
using (id = auth.uid());

create policy "profiles friends read"
on public.profiles for select
using (public.are_friends(auth.uid(), id));

create policy "profiles self update"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "visibility self all"
on public.profile_visibility for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "friendships members read"
on public.friendships for select
using (requester_id = auth.uid() or addressee_id = auth.uid());

create policy "friendships requester insert"
on public.friendships for insert
with check (requester_id = auth.uid());

create policy "friendships members update"
on public.friendships for update
using (requester_id = auth.uid() or addressee_id = auth.uid())
with check (requester_id = auth.uid() or addressee_id = auth.uid());

create policy "manual friends owner all"
on public.manual_friends for all
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "private notes owner only"
on public.private_friend_notes for all
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "memories owner all"
on public.memories for all
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "memory members owner all"
on public.memory_members for all
using (
  exists (
    select 1 from public.memories m
    where m.id = memory_id and m.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.memories m
    where m.id = memory_id and m.owner_id = auth.uid()
  )
);

create policy "wishes owner all"
on public.wish_items for all
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "wish members owner all"
on public.wish_members for all
using (
  exists (
    select 1 from public.wish_items w
    where w.id = wish_id and w.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.wish_items w
    where w.id = wish_id and w.owner_id = auth.uid()
  )
);

create policy "profile update self insert"
on public.profile_update_events for insert
with check (user_id = auth.uid());

create policy "profile update friends read"
on public.profile_update_events for select
using (user_id = auth.uid() or public.are_friends(auth.uid(), user_id));

create policy "push devices owner only"
on public.push_devices for all
using (user_id = auth.uid())
with check (user_id = auth.uid());
