import fs from 'fs/promises';
import path from 'path';
import { User, ContentGeneration, GenerationSummary } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const GENERATIONS_FILE = path.join(DATA_DIR, 'generations.json');

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJSON<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
}

async function writeJSON<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Users ────────────────────────────────────────────────────────────────────

export async function createUser(
  user: Pick<User, 'email' | 'name' | 'passwordHash'>
): Promise<User> {
  const users = await readJSON<User[]>(USERS_FILE, []);

  const newUser: User = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    plan: 'free',
    generationsCount: 0,
  };

  users.push(newUser);
  await writeJSON(USERS_FILE, users);
  return newUser;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readJSON<User[]>(USERS_FILE, []);
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await readJSON<User[]>(USERS_FILE, []);
  return users.find((u) => u.id === id) ?? null;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const users = await readJSON<User[]>(USERS_FILE, []);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  await writeJSON(USERS_FILE, users);
  return users[index];
}

// ── Generations ───────────────────────────────────────────────────────────────

export async function saveGeneration(
  generation: Omit<ContentGeneration, 'id' | 'createdAt'>
): Promise<ContentGeneration> {
  const generations = await readJSON<ContentGeneration[]>(GENERATIONS_FILE, []);

  const newGen: ContentGeneration = {
    ...generation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  // Most recent first; cap per-user history at 100 entries
  generations.unshift(newGen);
  const trimmed = generations.filter((g) => g.userId !== generation.userId).concat(
    generations.filter((g) => g.userId === generation.userId).slice(0, 100)
  );

  await writeJSON(GENERATIONS_FILE, trimmed);
  return newGen;
}

export async function getGenerationsByUserId(userId: string): Promise<GenerationSummary[]> {
  const generations = await readJSON<ContentGeneration[]>(GENERATIONS_FILE, []);
  return generations
    .filter((g) => g.userId === userId)
    .map((g) => ({
      id: g.id,
      prompt: g.prompt,
      tone: g.tone,
      audience: g.audience,
      blogTitle: g.content.blogPost.title,
      createdAt: g.createdAt,
    }));
}

export async function getGenerationById(id: string): Promise<ContentGeneration | null> {
  const generations = await readJSON<ContentGeneration[]>(GENERATIONS_FILE, []);
  return generations.find((g) => g.id === id) ?? null;
}

export async function deleteGeneration(id: string, userId: string): Promise<boolean> {
  const generations = await readJSON<ContentGeneration[]>(GENERATIONS_FILE, []);
  const initial = generations.length;
  const filtered = generations.filter((g) => !(g.id === id && g.userId === userId));
  if (filtered.length === initial) return false;
  await writeJSON(GENERATIONS_FILE, filtered);
  return true;
}
