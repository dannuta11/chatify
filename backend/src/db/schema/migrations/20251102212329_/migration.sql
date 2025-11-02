/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "Products_category_id_fkey";

-- DropTable
DROP TABLE "public"."Categories";

-- DropTable
DROP TABLE "public"."Products";
