-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2026 at 04:13 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chaber`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `klub`
--

CREATE TABLE `klub` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) NOT NULL,
  `miasto` varchar(100) NOT NULL,
  `stadion` varchar(255) NOT NULL,
  `herb` varchar(100) NOT NULL,
  `skrot` varchar(10) NOT NULL,
  `Siła` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `klub`
--

INSERT INTO `klub` (`id`, `nazwa`, `miasto`, `stadion`, `herb`, `skrot`, `Siła`) VALUES
(1, 'Chaber Pobiedziska', 'Pobiedziska', 'Arena imienia Tomasza Piotrkowskiego', 'chaber.png', 'CHP', 95),
(2, 'Zatyłek Pobiedziska', 'Pobiedziska', 'Fanservice Stadium', 'zatylek.png', 'ZAP', 89),
(3, 'Ćwikła Opalenica', 'Opalenica', 'Pole Buraków', 'cwikla.png', 'OPA', 74),
(4, 'Maczeta Dębiec', 'Dębiec', 'Arena Za Garażami', 'maczeta.png', 'MAD', 77),
(5, 'Piotrki Tomaszów', 'Tomaszów', 'CWL Arena', 'piotrki.png', 'PIT', 10),
(6, 'Tęczowi Grecja', 'Grecja', 'Olimp', 'teczowi.png', 'TGR', 81),
(7, 'Lustro Puszczykowo', 'Puszczykowo', 'Stadion Szklanek i Garnków', 'lustro.png', 'LPU', 67),
(8, 'Drzwi Chludowo', 'Chludowo', 'Arena Dworcowa', 'drzwi.png', 'DCH', 54),
(9, 'Lodówka Luboń', 'Luboń', 'Stadion imienia Górki Papieskiej', 'lodowka.png', 'LOL', 52),
(10, 'Stypa Budapeszt', 'Budapeszt', 'Stadion Miejski 5m^2', 'stypa.png', 'STB', 61),
(11, 'Rajdowcy Zbąszynek', 'Zbąszynek', 'Arena Wyścigów Rajdowych', 'rajdowcy.png', 'RAZ', 68),
(12, 'Karni Wronki', 'Wronki', 'Stadion Obok Zakładu Karnego', 'karni.png', 'KAW', 65),
(13, 'Insomnia Pobiedziska', 'Pobiedziska', 'Arena Głębokiego Snu', 'insomnia.png', 'INP', 73),
(14, 'Tchórze Marianowo', 'Marianowo', 'Stadion imienia Uciekinierów i Tchórzy', 'tchorze.png', 'TMA', 43),
(15, 'Bidul Dębiec', 'Dębiec', 'Arena Bursa 2', 'bidul.png', 'BID', 56),
(16, 'Mleczni Ptaki', 'Ptaki', 'Stadion Cytatów i Mądrości', 'mleczni.png', 'MLP', 76);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tabela`
--

CREATE TABLE `tabela` (
  `ID_Klubu` int(11) NOT NULL,
  `Mecze` int(11) NOT NULL,
  `Zwycięstwa` int(11) NOT NULL,
  `Remisy` int(11) NOT NULL,
  `Porażki` int(11) NOT NULL,
  `Gole_Zdobyte` int(11) NOT NULL,
  `Gole_Stracone` int(11) NOT NULL,
  `Bilans_Bramek` int(11) NOT NULL,
  `Punkty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tabela`
--

INSERT INTO `tabela` (`ID_Klubu`, `Mecze`, `Zwycięstwa`, `Remisy`, `Porażki`, `Gole_Zdobyte`, `Gole_Stracone`, `Bilans_Bramek`, `Punkty`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 0, 0, 0, 0, 0, 0, 0, 0),
(3, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 0, 0, 0, 0, 0, 0, 0, 0),
(11, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 0, 0, 0, 0, 0, 0, 0, 0),
(13, 0, 0, 0, 0, 0, 0, 0, 0),
(14, 0, 0, 0, 0, 0, 0, 0, 0),
(15, 0, 0, 0, 0, 0, 0, 0, 0),
(16, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `terminarz`
--

CREATE TABLE `terminarz` (
  `ID` int(11) NOT NULL,
  `ID_Gospodarza` int(11) NOT NULL,
  `ID_Gościa` int(11) NOT NULL,
  `Data_Spotkania` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyniki`
--

CREATE TABLE `wyniki` (
  `ID_meczu` int(11) NOT NULL,
  `Bramki_Gospodarzy` int(11) NOT NULL,
  `Bramki_Gości` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `klub`
--
ALTER TABLE `klub`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `tabela`
--
ALTER TABLE `tabela`
  ADD PRIMARY KEY (`ID_Klubu`);

--
-- Indeksy dla tabeli `terminarz`
--
ALTER TABLE `terminarz`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Gospodarza` (`ID_Gospodarza`),
  ADD KEY `ID_Gościa` (`ID_Gościa`);

--
-- Indeksy dla tabeli `wyniki`
--
ALTER TABLE `wyniki`
  ADD KEY `ID_meczu` (`ID_meczu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `klub`
--
ALTER TABLE `klub`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `terminarz`
--
ALTER TABLE `terminarz`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tabela`
--
ALTER TABLE `tabela`
  ADD CONSTRAINT `tabela_ibfk_1` FOREIGN KEY (`ID_Klubu`) REFERENCES `klub` (`id`);

--
-- Constraints for table `terminarz`
--
ALTER TABLE `terminarz`
  ADD CONSTRAINT `terminarz_ibfk_1` FOREIGN KEY (`ID_Gospodarza`) REFERENCES `klub` (`id`),
  ADD CONSTRAINT `terminarz_ibfk_2` FOREIGN KEY (`ID_Gościa`) REFERENCES `klub` (`id`);

--
-- Constraints for table `wyniki`
--
ALTER TABLE `wyniki`
  ADD CONSTRAINT `wyniki_ibfk_1` FOREIGN KEY (`ID_meczu`) REFERENCES `terminarz` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
