-- Migration 0002 — add the `isbn` column to an existing reviews table.
-- Only needed for databases created before migration 0001 gained `isbn`.
-- Skip on a fresh database (0001 already includes it); running it there errors
-- with "duplicate column name", which is safe to ignore.
--
-- Run against production:
--   wrangler d1 execute mts-troy --remote --file=migrations/0002_add_grade_and_isbn.sql
-- Run locally:
--   wrangler d1 execute mts-troy --local  --file=migrations/0002_add_grade_and_isbn.sql

ALTER TABLE reviews ADD COLUMN isbn TEXT;
