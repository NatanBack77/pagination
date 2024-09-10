/*
  Warnings:

  - Added the required column `bairro` to the `Cep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complemento` to the `Cep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidade` to the `Cep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `Cep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Cep` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);
INSERT INTO "new_Cep" ("cep", "id") SELECT "cep", "id" FROM "Cep";
DROP TABLE "Cep";
ALTER TABLE "new_Cep" RENAME TO "Cep";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
