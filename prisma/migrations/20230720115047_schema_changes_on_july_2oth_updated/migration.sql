-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parcel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "weight" TEXT,
    "height" TEXT,
    "width" TEXT,
    "length" TEXT,
    "fragile" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Parcel_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Parcel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Parcel" ("createdAt", "description", "fragile", "height", "id", "image", "length", "orderId", "type", "updatedAt", "userId", "weight", "width") SELECT "createdAt", "description", "fragile", "height", "id", "image", "length", "orderId", "type", "updatedAt", "userId", "weight", "width" FROM "Parcel";
DROP TABLE "Parcel";
ALTER TABLE "new_Parcel" RENAME TO "Parcel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
