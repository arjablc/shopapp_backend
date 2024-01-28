/*
  Warnings:

  - You are about to drop the column `accessToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_accessToken_key` ON `user`;

-- DropIndex
DROP INDEX `User_refreshToken_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `accessToken`,
    DROP COLUMN `refreshToken`;
