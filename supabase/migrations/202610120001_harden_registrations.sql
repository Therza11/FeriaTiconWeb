alter table public.registrations
  add constraint registrations_email_format check (email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'),
  add constraint registrations_phone_length check (char_length(phone) <= 20),
  add constraint registrations_organization_length check (char_length(organization) <= 120);

revoke insert on public.registrations from anon, authenticated;
grant insert (full_name, email, phone, organization, participation, consent)
  on public.registrations to anon, authenticated;
