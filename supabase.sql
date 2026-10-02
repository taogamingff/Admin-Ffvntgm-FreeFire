create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  type text not null default 'info',
  link text not null default '',
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists notifications_created_idx on public.notifications(created_at desc);
create index if not exists notifications_expires_idx on public.notifications(expires_at);

alter table public.notifications enable row level security;

-- API dùng service-role key ở server nên không cần mở public INSERT/UPDATE/DELETE.
-- GET từ browser đi qua Vercel API, không truy cập trực tiếp Supabase.
