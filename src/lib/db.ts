import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

function getDbPath() {
  const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
  const filePath = rawUrl.replace(/^file:/, "");
  return path.resolve(process.cwd(), filePath);
}

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url: getDbPath() });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
