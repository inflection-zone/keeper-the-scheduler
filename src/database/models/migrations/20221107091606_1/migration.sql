/*
  Warnings:

  - You are about to drop the `scheduledtasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scheduler` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `scheduledtasks` DROP FOREIGN KEY `ScheduledTasks_schedulerId_fkey`;

-- DropTable
DROP TABLE `scheduledtasks`;

-- DropTable
DROP TABLE `scheduler`;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` VARCHAR(191) NOT NULL,
    `SchedulerName` VARCHAR(191) NOT NULL,
    `SchedulerType` ENUM('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL,
    `Frequency` INTEGER NULL,
    `Minutes` INTEGER NULL,
    `Hours` INTEGER NULL,
    `DayOfMonth` INTEGER NULL,
    `Month` INTEGER NULL,
    `DayOfWeek` INTEGER NULL,
    `StartDate` DATETIME(3) NOT NULL,
    `EndDate` DATETIME(3) NOT NULL,
    `HookUri` VARCHAR(191) NOT NULL,
    `CronRegEx` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `DeletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduleTask` (
    `id` VARCHAR(191) NOT NULL,
    `TriggerTime` DATETIME(3) NOT NULL,
    `HookUri` VARCHAR(191) NOT NULL,
    `Retries` INTEGER NOT NULL,
    `Status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'QUEUED') NOT NULL,
    `SchedulerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScheduleTask` ADD CONSTRAINT `ScheduleTask_SchedulerId_fkey` FOREIGN KEY (`SchedulerId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
