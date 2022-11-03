/*
  Warnings:

  - The primary key for the `scheduledtasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Frequenct` on the `scheduler` table. All the data in the column will be lost.
  - Added the required column `Frequency` to the `Scheduler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `scheduledtasks` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `scheduler` DROP COLUMN `Frequenct`,
    ADD COLUMN `Frequency` INTEGER NOT NULL;
