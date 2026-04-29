/*
  Warnings:

  - Added the required column `image_back` to the `produkty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_front` to the `produkty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nagłówek` to the `wiadomości` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produkty` ADD COLUMN `image_back` VARCHAR(255) NOT NULL,
    ADD COLUMN `image_front` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `wiadomości` ADD COLUMN `Data` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN `Nagłówek` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `punkty_scoutingowe` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `szerokosc_geograficzna` DECIMAL(9, 6) NULL,
    `dlugosc_geograficzna` DECIMAL(9, 6) NULL,
    `miejsce` VARCHAR(255) NULL,
    `data` DATE NULL,
    `Ilosc_miejsca` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zapis` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Punktu` INTEGER NOT NULL,
    `Imie` VARCHAR(30) NOT NULL,
    `Nazwisko` VARCHAR(50) NOT NULL,
    `Wiek` INTEGER NOT NULL,
    `Email` VARCHAR(70) NOT NULL,

    INDEX `ID_Punktu`(`ID_Punktu`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `zapis` ADD CONSTRAINT `zapis_ibfk_1` FOREIGN KEY (`ID_Punktu`) REFERENCES `punkty_scoutingowe`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
