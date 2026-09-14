import { getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  getDb().get(sql`SELECT 1`);

  return Response.json({ status: "ok", database: "sqlite" });
}
