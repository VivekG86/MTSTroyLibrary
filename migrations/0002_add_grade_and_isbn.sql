-- Migration 0002 — add `grade` and `isbn` to an existing reviews table.
-- Only needed for databases created before migration 0001 gained these columns.
-- Skip this on a fresh database (0001 already includes both columns) — running it
-- there will error with "duplicate column name", which is safe to ignore.
--
-- Run locally:
--   wrangler d1 execute mts-troy --local --file=migrations/0002_add_grade_and_isbn.sql
-- Run against production:
--   wrangler d1 execute mts-troy --remote --file=migrations/0002_add_grade_and_isbn.sql

ALTER TABLE reviews ADD COLUMN grade TEXT NOT NULL DEFAULT '';
ALTER TABLE reviews ADD COLUMN isbn  TEXT;
