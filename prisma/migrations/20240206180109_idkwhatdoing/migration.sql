/*
  Warnings:

  - You are about to drop the column `isFavorite` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[favoriteListId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `isFavorite`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `favoriteListId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `favoriteList` (
    `id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `favoriteList_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductTofavoriteList` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductTofavoriteList_AB_unique`(`A`, `B`),
    INDEX `_ProductTofavoriteList_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_favoriteListId_key` ON `User`(`favoriteListId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_favoriteListId_fkey` FOREIGN KEY (`favoriteListId`) REFERENCES `favoriteList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductTofavoriteList` ADD CONSTRAINT `_ProductTofavoriteList_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductTofavoriteList` ADD CONSTRAINT `_ProductTofavoriteList_B_fkey` FOREIGN KEY (`B`) REFERENCES `favoriteList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
