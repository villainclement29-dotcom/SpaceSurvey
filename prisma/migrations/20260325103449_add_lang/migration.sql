-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publishedAt" DATETIME NOT NULL,
    "source" TEXT NOT NULL,
    "sourceFeed" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'en',
    "fetchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Article" ("category", "description", "fetchedAt", "id", "imageUrl", "publishedAt", "source", "sourceFeed", "title", "url") SELECT "category", "description", "fetchedAt", "id", "imageUrl", "publishedAt", "source", "sourceFeed", "title", "url" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_url_key" ON "Article"("url");
CREATE INDEX "Article_publishedAt_idx" ON "Article"("publishedAt");
CREATE INDEX "Article_category_idx" ON "Article"("category");
CREATE INDEX "Article_source_idx" ON "Article"("source");
CREATE INDEX "Article_lang_idx" ON "Article"("lang");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
