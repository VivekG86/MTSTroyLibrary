-- Migration 0004 — allow 'video' as a review_type
-- SQLite can't alter a CHECK constraint in place, so the table is rebuilt:
-- create a new table with the widened constraint, copy every row, then swap.
-- Skip on a fresh database created from the current 0001 (it already allows 'video').
--
-- Run locally first:
--   wrangler d1 execute mts-troy --local --file=migrations/0004_allow_video_review_type.sql
--
-- Then run against production BEFORE deploying the video review feature:
--   wrangler d1 execute mts-troy --remote --file=migrations/0004_allow_video_review_type.sql

CREATE TABLE reviews_new (
  id              TEXT    PRIMARY KEY,
  student_name    TEXT    NOT NULL,
  grade           TEXT    NOT NULL DEFAULT '',
  book_id         TEXT    NOT NULL,
  book_title      TEXT    NOT NULL,
  author          TEXT    NOT NULL,
  isbn            TEXT,
  rating          INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_type     TEXT    NOT NULL CHECK (review_type IN ('image', 'audio', 'video')),
  drive_file_id   TEXT,
  drive_file_name TEXT,
  drive_url       TEXT,
  status          TEXT    NOT NULL DEFAULT 'PENDING',
  created_at      TEXT    NOT NULL,
  organization    TEXT    NOT NULL DEFAULT 'MTS',
  school_location TEXT    NOT NULL DEFAULT 'Troy'
);

INSERT INTO reviews_new
  (id, student_name, grade, book_id, book_title, author, isbn, rating, review_type,
   drive_file_id, drive_file_name, drive_url, status, created_at, organization, school_location)
SELECT
   id, student_name, grade, book_id, book_title, author, isbn, rating, review_type,
   drive_file_id, drive_file_name, drive_url, status, created_at, organization, school_location
FROM reviews;

DROP TABLE reviews;
ALTER TABLE reviews_new RENAME TO reviews;
