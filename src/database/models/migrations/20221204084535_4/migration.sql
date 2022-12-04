-- AlterTable
ALTER TABLE `schedule` MODIFY `ScheduleType` ENUM('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NULL;
