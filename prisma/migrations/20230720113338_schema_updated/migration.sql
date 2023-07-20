/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `parcelId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Parcel` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Parcel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("address", "createdAt", "email", "id", "image", "name", "phone", "updatedAt") SELECT "address", "createdAt", "email", "id", "image", "name", "phone", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "dispatcherId" INTEGER NOT NULL,
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
    CONSTRAINT "Order_dispatcherId_fkey" FOREIGN KEY ("dispatcherId") REFERENCES "Dispatcher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "customerNotified", "dispatcherId", "doubleCheck", "dropoffTime", "endLocation", "id", "pickupTime", "startLocation", "status", "updatedAt", "userId") SELECT "createdAt", "customerNotified", "dispatcherId", "doubleCheck", "dropoffTime", "endLocation", "id", "pickupTime", "startLocation", "status", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Parcel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
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
    CONSTRAINT "Parcel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Parcel_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Parcel" ("createdAt", "description", "fragile", "height", "id", "image", "length", "type", "updatedAt", "userId", "weight", "width") SELECT "createdAt", "description", "fragile", "height", "id", "image", "length", "type", "updatedAt", "userId", "weight", "width" FROM "Parcel";
DROP TABLE "Parcel";
ALTER TABLE "new_Parcel" RENAME TO "Parcel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
