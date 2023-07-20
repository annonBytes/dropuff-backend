-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "dispatcherId" INTEGER NOT NULL,
    "parcelId" INTEGER NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "dropoffTime" TEXT,
    "customerNotified" BOOLEAN NOT NULL DEFAULT false,
    "doubleCheck" BOOLEAN NOT NULL DEFAULT false,
    "startLocation" TEXT,
    "endLocation" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_dispatcherId_fkey" FOREIGN KEY ("dispatcherId") REFERENCES "Dispatcher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_parcelId_fkey" FOREIGN KEY ("parcelId") REFERENCES "Parcel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "customerNotified", "dispatcherId", "doubleCheck", "dropoffTime", "endLocation", "id", "parcelId", "pickupTime", "startLocation", "status", "updatedAt", "userId") SELECT "createdAt", "customerNotified", "dispatcherId", "doubleCheck", "dropoffTime", "endLocation", "id", "parcelId", "pickupTime", "startLocation", "status", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
