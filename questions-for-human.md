# Questions for Human — Process-to-Product OS

## Q1: Supabase Project
**Question:** Do you have a Supabase project already, or should we create one?
**Assumption:** You'll create a Supabase project and provide credentials. The migration file is ready at `supabase/migrations/001_initial_schema.sql`.
**Impact:** Blocks end-to-end testing but not development.

## Q2: Auth for V1 Pilots
**Question:** For pilot firms, should we use Supabase email/password auth, or magic links, or Google OAuth?
**Assumption:** Email/password with magic link option. Can add Google OAuth easily.
**Impact:** Low — all auth methods are quick to add with Supabase.

## Q3: Topo Advisors Seed Data
**Question:** Do you have the Topo Advisors workflow data from the consulting engagement to seed as pilot data?
**Assumption:** We'll create sample seed data based on a generic CFO workflow. Real data can replace it.
**Impact:** Helpful for demos but not blocking.
