# Decisions Log — Process-to-Product OS

## D1: Supabase for backend
**Date:** 2026-03-14
**Decision:** Use Supabase (Postgres + RLS) for database, auth, and real-time
**Rationale:** Multi-tenant SaaS requires row-level security. Supabase provides Postgres, Auth, and real-time subscriptions in one service. RLS policies enforce org-scoped data isolation without application-level checks.
**Consequences:** Vendor dependency on Supabase. Standard Postgres under the hood — migration to self-hosted Postgres is straightforward.

## D2: Claude Sonnet 4 as primary model
**Date:** 2026-03-14
**Decision:** Use `claude-sonnet-4-6` for all AI operations
**Rationale:** Structured JSON generation for scoring, blueprints, and deliverables. Good balance of quality, speed, and cost. Upgrade path to Opus for complex analysis.
**Consequences:** ~$0.10-0.30 per AI operation depending on context size.

## D3: shadcn/ui v4 with base-ui
**Date:** 2026-03-14
**Decision:** Use latest shadcn/ui v4 which uses @base-ui/react instead of Radix
**Rationale:** Latest component library version. Uses `render` prop pattern instead of `asChild`.
**Consequences:** Created `LinkButton` utility component since Button no longer supports `asChild`. All Link+Button patterns use this utility.

## D4: Org-based RBAC via Supabase Auth
**Date:** 2026-03-14
**Decision:** Three roles (owner, operator, reviewer) scoped to organization
**Rationale:** Matches the pilot use case — firm owners manage, operators run workflows, reviewers approve deliverables.
**Consequences:** All RLS policies check org membership through the users table.

## D5: Direct Anthropic SDK (not Vercel AI SDK)
**Date:** 2026-03-14
**Decision:** Use @anthropic-ai/sdk directly for AI calls instead of Vercel AI SDK
**Rationale:** All AI calls return structured JSON, not streamed text. Direct SDK gives better control over response parsing and error handling. Can add streaming later for deliverable generation.
**Consequences:** No streaming for V1 AI responses. Acceptable for structured JSON operations.
