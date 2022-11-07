/*
  Warnings:

  - You are about to drop the column `SchedulerName` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `SchedulerType` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `SchedulerId` on the `scheduletask` table. All the data in the column will be lost.
  - Added the required column `ScheduleName` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ScheduleType` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ScheduleId` to the `ScheduleTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `scheduletask` DROP FOREIGN KEY `ScheduleTask_SchedulerId_fkey`;

-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `SchedulerName`,
    DROP COLUMN `SchedulerType`,
    ADD COLUMN `ScheduleName` VARCHAR(191) NOT NULL,
    ADD COLUMN `ScheduleType` ENUM('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL;

-- AlterTable
ALTER TABLE `scheduletask` DROP COLUMN `SchedulerId`,
    ADD COLUMN `ScheduleId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ScheduleTask` ADD CONSTRAINT `ScheduleTask_ScheduleId_fkey` FOREIGN KEY (`ScheduleId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
