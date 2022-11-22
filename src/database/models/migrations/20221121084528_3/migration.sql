/*
  Warnings:

  - The `DeletedAt` column on the `schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `DeletedAt`,
    ADD COLUMN `DeletedAt` DATETIME(3) NULL;
