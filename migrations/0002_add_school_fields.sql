-- Migration 0002 — add organization and school_location columns
-- SQLite ALTER TABLE ADD COLUMN is safe: existing rows receive the DEFAULT value.
-- The DEFAULT ensures backward compatibility with any rows inserted before this migration.
--
-- Run locally first:
--   wrangler d1 execute mts-troy --local --file=migrations/0002_add_school_fields.sql
--
-- Then run against production when ready to deploy:
--   wrangler d1 execute mts-troy --remote --file=migrations/0002_add_school_fields.sql

ALTER TABLE reviews ADD COLUMN organization    TEXT NOT NULL DEFAULT 'MTS';
ALTER TABLE reviews ADD COLUMN school_location TEXT NOT NULL DEFAULT 'Troy';
