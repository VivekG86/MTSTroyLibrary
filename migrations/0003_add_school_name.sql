-- Migration 0003 — drop redundant school_name column
-- school_name was removed because organization + school_location already capture this.
--
-- Run locally first:
--   wrangler d1 execute mts-troy --local --file=migrations/0003_add_school_name.sql
--
-- Then run against production:
--   wrangler d1 execute mts-troy --remote --file=migrations/0003_add_school_name.sql

ALTER TABLE reviews DROP COLUMN school_name;
