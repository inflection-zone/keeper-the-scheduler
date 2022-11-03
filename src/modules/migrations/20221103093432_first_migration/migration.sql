/*
  Warnings:

  - The primary key for the `scheduler` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Scheduler` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `scheduledtasks` DROP FOREIGN KEY `ScheduledTasks_schedulerId_fkey`;

-- AlterTable
ALTER TABLE `scheduledtasks` MODIFY `schedulerId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `scheduler` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `ScheduledTasks` ADD CONSTRAINT `ScheduledTasks_schedulerId_fkey` FOREIGN KEY (`schedulerId`) REFERENCES `Scheduler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
