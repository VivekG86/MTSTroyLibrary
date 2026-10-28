-- Migration 0001 — initial reviews table (canonical schema)
-- Uses CREATE TABLE IF NOT EXISTS so re-running is safe on a fresh database.
--
-- Run locally:
--   npm run db:migrate:local
--   (wrangler d1 execute mts-troy --local --file=migrations/0001_initial_reviews_table.sql)
-- Run against production (first-time setup of a NEW database):
--   wrangler d1 execute mts-troy --remote --file=migrations/0001_initial_reviews_table.sql

CREATE TABLE IF NOT EXISTS reviews (
  id              TEXT    PRIMARY KEY,               -- e.g. REV-2026-000001
  student_name    TEXT    NOT NULL,
  grade           TEXT    NOT NULL DEFAULT '',
  book_id         TEXT    NOT NULL,
  book_title      TEXT    NOT NULL,
  author          TEXT    NOT NULL,
  isbn            TEXT,                              -- ISBN-13 or ISBN-10, may be absent (manual entries)
  rating          INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_type     TEXT    NOT NULL CHECK (review_type IN ('image', 'audio', 'video')),
  drive_file_id   TEXT,                              -- populated in Phase 2 (Google Drive)
  drive_file_name TEXT,                              -- filename reserved now for Phase 2 upload
  drive_url       TEXT,                              -- populated in Phase 2
  status          TEXT    NOT NULL DEFAULT 'PENDING',
  created_at      TEXT    NOT NULL                   -- ISO-8601 UTC timestamp
);
