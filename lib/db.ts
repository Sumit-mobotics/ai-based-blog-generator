import { neon } from '@neondatabase/serverless';
import { User, ContentGeneration, GenerationSummary } from '@/types';

const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(process.env.DATABASE_URL);
};

function toISOString(val: unknown): string {
  if (val instanceof Date) return val.toISOString();
  return String(val);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    passwordHash: row.password_hash,
    createdAt: toISOString(row.created_at),
    plan: row.plan as 'free' | 'pro',
    generationsCount: row.generations_count,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToGeneration(row: any): ContentGeneration {
  return {
    id: row.id,
    userId: row.user_id,
    prompt: row.prompt,
    tone: row.tone,
    audience: row.audience,
    content: row.content as ContentGeneration['content'],
    createdAt: toISOString(row.created_at),
  };
}

// ── Users ────────────────────────────────────────────────────────────────────

export async function createUser(
  user: Pick<User, 'email' | 'name' | 'passwordHash'>
): Promise<User> {
  const db = getDb();
  const id = crypto.randomUUID();
  const rows = await db`
    INSERT INTO users (id, email, name, password_hash, plan, generations_count)
    VALUES (${id}, ${user.email}, ${user.name}, ${user.passwordHash}, 'free', 0)
    RETURNING *
  `;
  return rowToUser(rows[0]);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = getDb();
  const rows = await db`SELECT * FROM users WHERE LOWER(email) = LOWER(${email})`;
  return rows[0] ? rowToUser(rows[0]) : null;
}

export async function getUserById(id: string): Promise<User | null> {
  const db = getDb();
  const rows = await db`SELECT * FROM users WHERE id = ${id}`;
  return rows[0] ? rowToUser(rows[0]) : null;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const db = getDb();
  if (updates.generationsCount !== undefined && updates.plan !== undefined) {
    const rows = await db`
      UPDATE users SET generations_count = ${updates.generationsCount}, plan = ${updates.plan}
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] ? rowToUser(rows[0]) : null;
  }
  if (updates.generationsCount !== undefined) {
    const rows = await db`
      UPDATE users SET generations_count = ${updates.generationsCount}
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] ? rowToUser(rows[0]) : null;
  }
  if (updates.plan !== undefined) {
    const rows = await db`
      UPDATE users SET plan = ${updates.plan}
      WHERE id = ${id} RETURNING *
    `;
    return rows[0] ? rowToUser(rows[0]) : null;
  }
  return getUserById(id);
}

// ── Generations ───────────────────────────────────────────────────────────────

export async function saveGeneration(
  generation: Omit<ContentGeneration, 'id' | 'createdAt'>
): Promise<ContentGeneration> {
  const db = getDb();
  const id = crypto.randomUUID();
  const rows = await db`
    INSERT INTO generations (id, user_id, prompt, tone, audience, content)
    VALUES (${id}, ${generation.userId}, ${generation.prompt}, ${generation.tone}, ${generation.audience}, ${JSON.stringify(generation.content)})
    RETURNING *
  `;
  return rowToGeneration(rows[0]);
}

export async function getGenerationsByUserId(userId: string): Promise<GenerationSummary[]> {
  const db = getDb();
  const rows = await db`
    SELECT * FROM generations
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 100
  `;
  return rows.map((row) => ({
    id: row.id,
    prompt: row.prompt,
    tone: row.tone,
    audience: row.audience,
    blogTitle: (row.content as ContentGeneration['content']).blogPost.title,
    createdAt: toISOString(row.created_at),
  }));
}

export async function getGenerationById(id: string): Promise<ContentGeneration | null> {
  const db = getDb();
  const rows = await db`SELECT * FROM generations WHERE id = ${id}`;
  return rows[0] ? rowToGeneration(rows[0]) : null;
}

export async function deleteGeneration(id: string, userId: string): Promise<boolean> {
  const db = getDb();
  const rows = await db`
    DELETE FROM generations WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;
  return rows.length > 0;
}
