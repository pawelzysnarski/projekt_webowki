/*
  Warnings:

  - Added the required column `Numer_Kolejki` to the `terminarz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `terminarz` ADD COLUMN `Numer_Kolejki` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `akapity` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Wiadomości` INTEGER NOT NULL,
    `Treść` VARCHAR(1000) NOT NULL,

    INDEX `ID_Wiadomości`(`ID_Wiadomości`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drużyna` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Imie` VARCHAR(40) NOT NULL,
    `Nazwisko` VARCHAR(40) NOT NULL,
    `Pozycja` VARCHAR(30) NOT NULL,
    `Numer` INTEGER NOT NULL,
    `Waga` INTEGER NOT NULL,
    `Wzrost` INTEGER NOT NULL,
    `Kraj` VARCHAR(50) NOT NULL,
    `Data_Urodzenia` DATE NULL,
    `Mecze` INTEGER NOT NULL,
    `Bramki` INTEGER NOT NULL,
    `Asysty` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personel` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Imie` VARCHAR(40) NOT NULL,
    `Nazwisko` VARCHAR(40) NOT NULL,
    `Profesja` VARCHAR(100) NOT NULL,
    `Kraj` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `użytkownik` (
    `ID` INTEGER NOT NULL,
    `Login` VARCHAR(255) NOT NULL,
    `Hasło` VARCHAR(255) NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wiadomości` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Zdjęcie` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `akapity` ADD CONSTRAINT `akapity_ibfk_1` FOREIGN KEY (`ID_Wiadomości`) REFERENCES `wiadomości`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
