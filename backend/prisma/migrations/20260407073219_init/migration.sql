-- CreateTable
CREATE TABLE `klub` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(100) NOT NULL,
    `miasto` VARCHAR(100) NOT NULL,
    `stadion` VARCHAR(255) NOT NULL,
    `herb` VARCHAR(100) NOT NULL,
    `skrot` VARCHAR(10) NOT NULL,
    `Siła` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tabela` (
    `ID_Klubu` INTEGER NOT NULL,
    `Mecze` INTEGER NOT NULL,
    `Zwycięstwa` INTEGER NOT NULL,
    `Remisy` INTEGER NOT NULL,
    `Porażki` INTEGER NOT NULL,
    `Gole_Zdobyte` INTEGER NOT NULL,
    `Gole_Stracone` INTEGER NOT NULL,
    `Bilans_Bramek` INTEGER NOT NULL,
    `Punkty` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Klubu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `terminarz` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Gospodarza` INTEGER NOT NULL,
    `ID_Gościa` INTEGER NOT NULL,
    `Data_Spotkania` DATETIME(0) NOT NULL,

    INDEX `ID_Gospodarza`(`ID_Gospodarza`),
    INDEX `ID_Gościa`(`ID_Gościa`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wyniki` (
    `ID_meczu` INTEGER NOT NULL,
    `Bramki_Gospodarzy` INTEGER NOT NULL,
    `Bramki_Gości` INTEGER NOT NULL,

    PRIMARY KEY (`ID_meczu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tabela` ADD CONSTRAINT `tabela_ibfk_1` FOREIGN KEY (`ID_Klubu`) REFERENCES `klub`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `terminarz` ADD CONSTRAINT `terminarz_ibfk_1` FOREIGN KEY (`ID_Gospodarza`) REFERENCES `klub`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `terminarz` ADD CONSTRAINT `terminarz_ibfk_2` FOREIGN KEY (`ID_Gościa`) REFERENCES `klub`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `wyniki` ADD CONSTRAINT `wyniki_ibfk_1` FOREIGN KEY (`ID_meczu`) REFERENCES `terminarz`(`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
