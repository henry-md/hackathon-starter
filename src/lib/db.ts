import "server-only";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

import * as schema from "@/db/schema";

const globalForDb = globalThis as typeof globalThis & {
  sqlite?: Database.Database;
};

export function getDb() {
  if (!globalForDb.sqlite) {
    const directory = path.join(process.cwd(), "data");
    mkdirSync(directory, { recursive: true });

    const db = new Database(path.join(directory, "app.db"));
    db.pragma("journal_mode = WAL");
    globalForDb.sqlite = db;
  }

  return drizzle(globalForDb.sqlite, { schema });
}
