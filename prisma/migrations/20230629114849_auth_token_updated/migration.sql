/*
  Warnings:

  - You are about to drop the column `phoneToken` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `token` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "emailToken" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_token" ("createdAt", "emailToken", "expires", "id", "type", "updatedAt", "userId", "valid") SELECT "createdAt", "emailToken", "expires", "id", "type", "updatedAt", "userId", "valid" FROM "token";
DROP TABLE "token";
ALTER TABLE "new_token" RENAME TO "token";
CREATE UNIQUE INDEX "token_emailToken_key" ON "token"("emailToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
