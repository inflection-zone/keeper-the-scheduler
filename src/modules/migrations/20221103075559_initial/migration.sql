-- CreateTable
CREATE TABLE `Scheduler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SchedulerName` VARCHAR(191) NOT NULL,
    `Frequenct` INTEGER NOT NULL,
    `Minutes` INTEGER NOT NULL,
    `Hours` INTEGER NOT NULL,
    `DayOfMonth` INTEGER NOT NULL,
    `Month` INTEGER NOT NULL,
    `DayOfWeek` INTEGER NOT NULL,
    `StartDate` DATETIME(3) NOT NULL,
    `EndDate` DATETIME(3) NOT NULL,
    `HookUri` VARCHAR(191) NOT NULL,
    `CronRegEx` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduledTasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TriggerTime` DATETIME(3) NOT NULL,
    `HookUri` VARCHAR(191) NOT NULL,
    `Retries` INTEGER NOT NULL,
    `Status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'QUEUED') NOT NULL,
    `schedulerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScheduledTasks` ADD CONSTRAINT `ScheduledTasks_schedulerId_fkey` FOREIGN KEY (`schedulerId`) REFERENCES `Scheduler`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
