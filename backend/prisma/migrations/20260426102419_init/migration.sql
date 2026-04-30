-- CreateTable
CREATE TABLE `mecze` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `przeciwnik` VARCHAR(100) NOT NULL,
    `czy_domowy` BOOLEAN NOT NULL,
    `data_meczu` DATETIME(0) NOT NULL,
    `id_terminarza` INTEGER NULL,

    UNIQUE INDEX `mecze_id_terminarza_key`(`id_terminarza`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `miejsca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sektor` VARCHAR(10) NOT NULL,
    `rzad` VARCHAR(5) NOT NULL,
    `numer` INTEGER NOT NULL,
    `czy_zajete` BOOLEAN NOT NULL DEFAULT false,
    `cena` DECIMAL(10, 2) NOT NULL,
    `typ_biletu` VARCHAR(50) NOT NULL,
    `id_meczu` INTEGER NOT NULL,

    UNIQUE INDEX `miejsca_id_meczu_sektor_rzad_numer_key`(`id_meczu`, `sektor`, `rzad`, `numer`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bilety` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_meczu` INTEGER NOT NULL,
    `id_miejsca` INTEGER NOT NULL,
    `imie` VARCHAR(100) NOT NULL,
    `nazwisko` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `data_zakupu` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `czy_oplacony` BOOLEAN NOT NULL DEFAULT false,
    `cena` DECIMAL(10, 2) NOT NULL,
    `typ_biletu` VARCHAR(50) NOT NULL,
    `kod_biletu` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `bilety_id_miejsca_key`(`id_miejsca`),
    UNIQUE INDEX `bilety_kod_biletu_key`(`kod_biletu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `karnety` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imie` VARCHAR(100) NOT NULL,
    `nazwisko` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `typ_karnetu` VARCHAR(50) NOT NULL,
    `data_zakupu` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `czy_oplacony` BOOLEAN NOT NULL DEFAULT false,
    `cena` DECIMAL(10, 2) NOT NULL,
    `sezon` VARCHAR(9) NOT NULL,
    `kod_karnetu` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `karnety_kod_karnetu_key`(`kod_karnetu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mecze` ADD CONSTRAINT `mecze_id_terminarza_fkey` FOREIGN KEY (`id_terminarza`) REFERENCES `terminarz`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `miejsca` ADD CONSTRAINT `miejsca_id_meczu_fkey` FOREIGN KEY (`id_meczu`) REFERENCES `mecze`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bilety` ADD CONSTRAINT `bilety_id_meczu_fkey` FOREIGN KEY (`id_meczu`) REFERENCES `mecze`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bilety` ADD CONSTRAINT `bilety_id_miejsca_fkey` FOREIGN KEY (`id_miejsca`) REFERENCES `miejsca`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
