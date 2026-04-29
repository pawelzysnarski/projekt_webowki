/*
  Warnings:

  - You are about to drop the `użytkownik` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `użytkownik`;

-- CreateTable
CREATE TABLE `uzytkownicy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imie` VARCHAR(100) NOT NULL,
    `nazwisko` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `haslo` VARCHAR(255) NOT NULL,
    `data_rej` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `karnet_id` INTEGER NULL,

    UNIQUE INDEX `uzytkownicy_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `uzytkownicy` ADD CONSTRAINT `uzytkownicy_karnet_id_fkey` FOREIGN KEY (`karnet_id`) REFERENCES `karnety`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
