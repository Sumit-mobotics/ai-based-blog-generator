-- AI Blog Generator - Database Schema
-- Run this once in your Neon SQL Editor to create the tables

CREATE TABLE IF NOT EXISTS users (
  id               TEXT        PRIMARY KEY,
  email            TEXT        UNIQUE NOT NULL,
  name             TEXT        NOT NULL,
  password_hash    TEXT        NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  plan             TEXT        NOT NULL DEFAULT 'free',
  generations_count INTEGER    NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS generations (
  id         TEXT        PRIMARY KEY,
  user_id    TEXT        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt     TEXT        NOT NULL,
  tone       TEXT        NOT NULL,
  audience   TEXT        NOT NULL,
  content    JSONB       NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);
