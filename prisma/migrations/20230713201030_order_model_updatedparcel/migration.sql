/*
  Warnings:

  - You are about to drop the column `dueTime` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the column `pickupTime` on the `Parcel` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Parcel` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parcel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "weight" TEXT,
    "height" TEXT,
    "width" TEXT,
    "length" TEXT,
    "fragile" BOOLEAN NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Parcel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Parcel" ("createdAt", "description", "fragile", "height", "id", "image", "length", "price", "updatedAt", "userId", "weight", "width") SELECT "createdAt", "description", "fragile", "height", "id", "image", "length", "price", "updatedAt", "userId", "weight", "width" FROM "Parcel";
DROP TABLE "Parcel";
ALTER TABLE "new_Parcel" RENAME TO "Parcel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
