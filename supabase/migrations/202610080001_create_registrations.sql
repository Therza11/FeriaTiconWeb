create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  phone text not null default '',
  organization text not null default '',
  participation text not null check (participation in ('asistente', 'expositor', 'ponente', 'otro')),
  consent boolean not null check (consent),
  created_at timestamptz not null default now()
);

create unique index if not exists registrations_email_unique
  on public.registrations (lower(email));

alter table public.registrations enable row level security;

revoke all on public.registrations from anon, authenticated;
grant insert on public.registrations to anon, authenticated;

drop policy if exists "Anyone can register with consent" on public.registrations;
create policy "Anyone can register with consent"
  on public.registrations
  for insert
  to anon, authenticated
  with check (consent = true);