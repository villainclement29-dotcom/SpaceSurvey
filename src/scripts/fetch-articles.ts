import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local for local execution outside Next.js
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import { fetchAndStoreArticles } from "../lib/fetchers";
import { prisma } from "../lib/db";

async function main() {
  console.log("Starting manual article fetch...");
  const result = await fetchAndStoreArticles();
  console.log("Done:", result);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
