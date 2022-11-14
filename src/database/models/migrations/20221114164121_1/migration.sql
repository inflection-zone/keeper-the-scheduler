/*
  Warnings:

  - You are about to alter the column `TriggerTime` on the `scheduletask` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `scheduletask` MODIFY `TriggerTime` DATETIME(3) NOT NULL;
