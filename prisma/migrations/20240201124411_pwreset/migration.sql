-- AlterTable
ALTER TABLE `user` MODIFY `passwordResetAt` DATETIME(3) NULL,
    MODIFY `passwordResetToken` VARCHAR(191) NULL;
