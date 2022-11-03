-- CreateTable
CREATE TABLE `Scheduler` (
    `id` VARCHAR(191) NOT NULL,
    `SchedulerName` VARCHAR(191) NOT NULL,
    `SchedulerType` ENUM('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL,
    `Frequency` INTEGER NOT NULL,
    `Minutes` INTEGER NULL,
    `Hours` INTEGER NULL,
    `DayOfMonth` INTEGER NULL,
    `Month` INTEGER NULL,
    `DayOfWeek` INTEGER NULL,
    `StartDate` DATETIME(3) NOT NULL,
    `EndDate` DATETIME(3) NOT NULL,
    `HookUri` VARCHAR(191) NOT NULL,
    `CronRegEx` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduledTasks` (
    `id` VARCHAR(191) NOT NULL,
    `TriggerTime` DATETIME(3) NOT NULL,
    `HookUri` VARCHAR(191) NOT NULL,
    `Retries` INTEGER NOT NULL,
    `Status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'QUEUED') NOT NULL,
    `schedulerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScheduledTasks` ADD CONSTRAINT `ScheduledTasks_schedulerId_fkey` FOREIGN KEY (`schedulerId`) REFERENCES `Scheduler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
