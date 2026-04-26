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

INSERT INTO `produkty` (`id`, `name`, `price`, `category`, `subcategory`, `image`) VALUES
(1, 'spodenki1', 89.99, 'spodenki', 'pilkarz', 'spodenki1.png'),
(2, 'spodenki2', 89.99, 'spodenki', 'pilkarz', 'spodenki2.jpg'),
(3, 'spodenki3', 89.99, 'spodenki', 'pilkarz', 'spodenki3.png'),
(4, 'koszulka1', 129.99, 'koszulki', 'pilkarz', 'koszulka1.jpeg'),
(5, 'koszulka2', 129.99, 'koszulki', 'pilkarz', 'koszulka2.jpeg'),
(6, 'koszulka3', 129.99, 'koszulki', 'pilkarz', 'koszulka3.jpeg'),
(7, 'komplet1', 199.99, 'komplety', 'pilkarz', 'komplet1.jpg'),
(8, 'komplet2', 199.99, 'komplety', 'pilkarz', 'komplet2.jpg'),
(9, 'komplet3', 199.99, 'komplety', 'pilkarz', 'komplet3.jpg'),
(10, 'misiek', 49.99, 'pluszaki', 'standard', 'misiek.jpg'),
(11, 'misiek1', 59.99, 'pluszaki', 'standard', 'misiek1.jpg'),
(12, 'misiek2', 59.99, 'pluszaki', 'standard', 'misiek2.jpg'),
(13, 'misiek3', 59.99, 'pluszaki', 'standard', 'misiek3.jpg'),
(14, 'kubek', 29.99, 'akcesoria', 'standard', 'kubek.jpg'),
(15, 'rękawice', 79.99, 'akcesoria', 'standard', 'rękawice.png'),
(16, 'komplet_bramkarz1', 249.99, 'komplety', 'bramkarz', 'komplet_bramkarz1.png'),
(17, 'koszulka_bramkarz1', 149.99, 'koszulki', 'bramkarz', 'koszulka_bramkarz1.png'),
(18, 'spodenki_bramkarz1', 99.99, 'spodenki', 'bramkarz', 'spodenki_bramkarz1.png'),
(19, 'komplet_bramkarz2', 249.99, 'komplety', 'bramkarz', 'komplet_bramkarz2.png'),
(20, 'koszulka_bramkarz2', 149.99, 'koszulki', 'bramkarz', 'koszulka_bramkarz2.png'),
(21, 'spodenki_bramkarz2', 99.99, 'spodenki', 'bramkarz', 'spodenki_bramkarz2.png'),
(22, 'komplet_bramkarz3', 249.99, 'komplety', 'bramkarz', 'komplet_bramkarz3.png'),
(23, 'koszulka_bramkarz3', 149.99, 'koszulki', 'bramkarz', 'koszulka_bramkarz3.png'),
(24, 'spodenki_bramkarz3', 99.99, 'spodenki', 'bramkarz', 'spodenki_bramkarz3.png'),
(25, 'misiek_bramkarz1', 69.99, 'pluszaki', 'bramkarz', 'misiek_bramkarz1.png'),
(26, 'misiek_bramkarz2', 69.99, 'pluszaki', 'bramkarz', 'misiek_bramkarz2.png'),
(27, 'misiek_bramkarz3', 69.99, 'pluszaki', 'bramkarz', 'misiek_bramkarz3.png');

INSERT INTO `drużyna` (`ID`, `Imie`, `Nazwisko`, `Pozycja`, `Numer`, `Waga`, `Wzrost`, `Kraj`, `Data_Urodzenia`, `Mecze`, `Bramki`, `Asysty`) VALUES

(1, 'Tomasz', 'Piotrkowski', 'Pomocnik', 67, 70, 175, 'Polska', '2007-05-05', 130, 45, 81),
(2, 'Pietro', 'Nucleus', 'Obrońca', 68, 68, 181, 'Włochy', '2002-12-31', 42, 3, 7),
(3, 'Gustaw', 'Grzybek', 'Pomocnik', 19, 76, 183, 'Polska', '1999-08-07', 95, 2, 12),
(4, 'Muhammad', 'Mahalahi', 'Napastnik', 7, 64, 190, 'Indie', '1996-04-24', 12, 3, 1),
(5, 'Doktor', 'Epstein', 'Obrońca', 33, 82, 192, 'Czechy', '2000-01-01', 45, 0, 5),
(6, 'Carlos', 'Morales', 'Pomocnik', 4, 64, 165, 'Peru', '2002-03-21', 32, 12, 11),
(7, 'Juan', 'Alcacaz', 'Obrońca', 2, 78, 193, 'Hiszpania', '2001-09-08', 123, 15, 3),
(8, 'Horsoso', 'Mambo', 'Napastnik', 10, 69, 172, 'Niemcy', '1998-07-15', 21, 20, 6),
(9, 'Joan', 'Pereira', 'Pomocnik', 92, 62, 166, 'Brazylia', '2003-08-09', 3, 0, 0),
(10, 'Rafał', 'Andrzejewski', 'Obrońca', 13, 83, 198, 'Polska', '1991-11-14', 15, 1, 0),
(11, 'Erik', 'Carl', 'Napastnik', 50, 73, 187, 'Szwajcaria', '2001-08-27', 64, 23, 9),
(12, 'Radosław', 'Królewski', 'Obrońca', 24, 68, 179, 'Polska', '1997-05-18', 82, 4, 12),
(13, 'Jan', 'Niski', 'Pomocnik', 16, 56, 162, 'Polska', '2008-02-11', 2, 0, 0),
(14, 'Yayo', 'Watermelele', 'Napastnik', 69, 69, 169, 'Republika Południowej Afryki', '1994-07-18', 102, 71, 31),
(15, 'Henryk', 'Nowak', 'Napastnik', 81, 73, 175, 'Polska', '2007-10-23', 0, 0, 0),
(16, 'Jamal', 'Chickiko', 'Pomocnik', 5, 61, 176, 'Nigeria', '2005-04-30', 4, 1, 1),
(17, 'Jude', 'Jojojo', 'Obrońca', 3, 78, 189, 'Kenia', '2002-03-26', 56, 0, 0),
(18, 'Adam', 'Nowakowski', 'Napastnik', 99, 64, 168, 'Polska', '2006-11-02', 0, 0, 0),
(19, 'John', 'Saveman', 'Bramkarz', 1, 72, 201, 'Walia', '1992-02-27', 134, 0, 2),
(20, 'Tuoko', 'Babrata', 'Bramkarz', 79, 82, 199, 'Etiopia', '2004-05-24', 5, 0, 0),
(21, 'Filip', 'Borowiak', 'Bramkarz', 23, 73, 192, 'Polska', '2003-10-27', 1, 0, 1),
(22, 'Antoti', 'Jakubiak', 'Pomocnik', 12, 68, 183, 'Polska', '2004-09-05', 3, 1, 1),
(23, 'Marco', 'Gaspario', 'Obrońca', 41, 73, 188, 'San Marino', '1998-07-13', 9, 1, 0);

INSERT INTO `terminarz` (`ID`, `ID_Gospodarza`, `ID_Gościa`, `Data_Spotkania`, `Numer_Kolejki`) VALUES
(1, 1, 16, '2026-02-06 20:00:00', 1),
(2, 2, 15, '2026-02-06 20:30:00', 1),
(3, 3, 14, '2026-02-07 15:00:00', 1),
(4, 4, 13, '2026-02-07 17:30:00', 1),
(5, 5, 12, '2026-02-08 15:00:00', 1),
(6, 6, 11, '2026-02-08 17:30:00', 1),
(7, 7, 10, '2026-02-09 18:00:00', 1),
(8, 8, 9, '2026-02-09 20:00:00', 1),
(9, 16, 9, '2026-02-13 20:00:00', 2),
(10, 10, 8, '2026-02-13 20:30:00', 2),
(11, 11, 7, '2026-02-14 15:00:00', 2),
(12, 12, 6, '2026-02-14 17:30:00', 2),
(13, 13, 5, '2026-02-15 15:00:00', 2),
(14, 14, 4, '2026-02-15 17:30:00', 2),
(15, 15, 3, '2026-02-16 18:00:00', 2),
(16, 1, 2, '2026-02-16 20:00:00', 2),
(17, 2, 16, '2026-02-20 20:00:00', 3),
(18, 3, 1, '2026-02-20 20:30:00', 3),
(19, 4, 15, '2026-02-21 15:00:00', 3),
(20, 5, 14, '2026-02-21 17:30:00', 3),
(21, 6, 13, '2026-02-22 15:00:00', 3),
(22, 7, 12, '2026-02-22 17:30:00', 3),
(23, 8, 11, '2026-02-23 18:00:00', 3),
(24, 9, 10, '2026-02-23 20:00:00', 3),
(25, 16, 10, '2026-02-27 20:00:00', 4),
(26, 11, 9, '2026-02-27 20:30:00', 4),
(27, 12, 8, '2026-02-28 15:00:00', 4),
(28, 13, 7, '2026-02-28 17:30:00', 4),
(29, 14, 6, '2026-03-01 15:00:00', 4),
(30, 15, 5, '2026-03-01 17:30:00', 4),
(31, 1, 4, '2026-03-02 18:00:00', 4),
(32, 2, 3, '2026-03-02 20:00:00', 4),
(33, 3, 16, '2026-03-06 20:00:00', 5),
(34, 4, 2, '2026-03-06 20:30:00', 5),
(35, 5, 1, '2026-03-07 15:00:00', 5),
(36, 6, 15, '2026-03-07 17:30:00', 5),
(37, 7, 14, '2026-03-08 15:00:00', 5),
(38, 8, 13, '2026-03-08 17:30:00', 5),
(39, 9, 12, '2026-03-09 18:00:00', 5),
(40, 10, 11, '2026-03-09 20:00:00', 5),
(41, 16, 11, '2026-03-13 20:00:00', 6),
(42, 12, 10, '2026-03-13 20:30:00', 6),
(43, 13, 9, '2026-03-14 15:00:00', 6),
(44, 14, 8, '2026-03-14 17:30:00', 6),
(45, 15, 7, '2026-03-15 15:00:00', 6),
(46, 1, 6, '2026-03-15 17:30:00', 6),
(47, 2, 5, '2026-03-16 18:00:00', 6),
(48, 3, 4, '2026-03-16 20:00:00', 6),
(49, 4, 16, '2026-03-20 20:00:00', 7),
(50, 5, 3, '2026-03-20 20:30:00', 7),
(51, 6, 2, '2026-03-21 15:00:00', 7),
(52, 7, 1, '2026-03-21 17:30:00', 7),
(53, 8, 15, '2026-03-22 15:00:00', 7),
(54, 9, 14, '2026-03-22 17:30:00', 7),
(55, 10, 13, '2026-03-23 18:00:00', 7),
(56, 11, 12, '2026-03-23 20:00:00', 7),
(57, 16, 12, '2026-03-27 20:00:00', 8),
(58, 13, 11, '2026-03-27 20:30:00', 8),
(59, 14, 10, '2026-03-28 15:00:00', 8),
(60, 15, 9, '2026-03-28 17:30:00', 8),
(61, 1, 8, '2026-03-29 15:00:00', 8),
(62, 2, 7, '2026-03-29 17:30:00', 8),
(63, 3, 6, '2026-03-30 18:00:00', 8),
(64, 4, 5, '2026-03-30 20:00:00', 8),
(65, 5, 16, '2026-04-03 20:00:00', 9),
(66, 6, 4, '2026-04-03 20:30:00', 9),
(67, 7, 3, '2026-04-04 15:00:00', 9),
(68, 8, 2, '2026-04-04 17:30:00', 9),
(69, 9, 1, '2026-04-05 15:00:00', 9),
(70, 10, 15, '2026-04-05 17:30:00', 9),
(71, 11, 14, '2026-04-06 18:00:00', 9),
(72, 12, 13, '2026-04-06 20:00:00', 9),
(73, 16, 13, '2026-04-10 20:00:00', 10),
(74, 14, 12, '2026-04-10 20:30:00', 10),
(75, 15, 11, '2026-04-11 15:00:00', 10),
(76, 1, 10, '2026-04-11 17:30:00', 10),
(77, 2, 9, '2026-04-12 15:00:00', 10),
(78, 3, 8, '2026-04-12 17:30:00', 10),
(79, 4, 7, '2026-04-13 18:00:00', 10),
(80, 5, 6, '2026-04-13 20:00:00', 10),
(81, 6, 16, '2026-04-17 20:00:00', 11),
(82, 7, 5, '2026-04-17 20:30:00', 11),
(83, 8, 4, '2026-04-18 15:00:00', 11),
(84, 9, 3, '2026-04-18 17:30:00', 11),
(85, 10, 2, '2026-04-19 15:00:00', 11),
(86, 11, 1, '2026-04-19 17:30:00', 11),
(87, 12, 15, '2026-04-20 18:00:00', 11),
(88, 13, 14, '2026-04-20 20:00:00', 11),
(89, 16, 14, '2026-04-24 20:00:00', 12),
(90, 15, 13, '2026-04-24 20:30:00', 12),
(91, 1, 12, '2026-04-25 15:00:00', 12),
(92, 2, 11, '2026-04-25 17:30:00', 12),
(93, 3, 10, '2026-04-26 15:00:00', 12),
(94, 4, 9, '2026-04-26 17:30:00', 12),
(95, 5, 8, '2026-04-27 18:00:00', 12),
(96, 6, 7, '2026-04-27 20:00:00', 12),
(97, 7, 16, '2026-05-01 20:00:00', 13),
(98, 8, 6, '2026-05-01 20:30:00', 13),
(99, 9, 5, '2026-05-02 15:00:00', 13),
(100, 10, 4, '2026-05-02 17:30:00', 13),
(101, 11, 3, '2026-05-03 15:00:00', 13),
(102, 12, 2, '2026-05-03 17:30:00', 13),
(103, 13, 1, '2026-05-04 18:00:00', 13),
(104, 14, 15, '2026-05-04 20:00:00', 13),
(105, 16, 15, '2026-05-08 20:00:00', 14),
(106, 1, 14, '2026-05-08 20:30:00', 14),
(107, 2, 13, '2026-05-09 15:00:00', 14),
(108, 3, 12, '2026-05-09 17:30:00', 14),
(109, 4, 11, '2026-05-10 15:00:00', 14),
(110, 5, 10, '2026-05-10 17:30:00', 14),
(111, 6, 9, '2026-05-11 18:00:00', 14),
(112, 7, 8, '2026-05-11 20:00:00', 14),
(113, 8, 16, '2026-05-15 20:00:00', 15),
(114, 9, 7, '2026-05-15 20:30:00', 15),
(115, 10, 6, '2026-05-16 15:00:00', 15),
(116, 11, 5, '2026-05-16 17:30:00', 15),
(117, 12, 4, '2026-05-17 15:00:00', 15),
(118, 13, 3, '2026-05-17 17:30:00', 15),
(119, 14, 2, '2026-05-18 18:00:00', 15),
(120, 15, 1, '2026-05-18 20:00:00', 15),
(121, 16, 1, '2026-05-22 20:00:00', 16),
(122, 15, 2, '2026-05-22 20:30:00', 16),
(123, 14, 3, '2026-05-23 15:00:00', 16),
(124, 13, 4, '2026-05-23 17:30:00', 16),
(125, 12, 5, '2026-05-24 15:00:00', 16),
(126, 11, 6, '2026-05-24 17:30:00', 16),
(127, 10, 7, '2026-05-25 18:00:00', 16),
(128, 9, 8, '2026-05-25 20:00:00', 16),
(129, 9, 16, '2026-05-29 20:00:00', 17),
(130, 8, 10, '2026-05-29 20:30:00', 17),
(131, 7, 11, '2026-05-30 15:00:00', 17),
(132, 6, 12, '2026-05-30 17:30:00', 17),
(133, 5, 13, '2026-05-31 15:00:00', 17),
(134, 4, 14, '2026-05-31 17:30:00', 17),
(135, 3, 15, '2026-06-01 18:00:00', 17),
(136, 2, 1, '2026-06-01 20:00:00', 17),
(137, 16, 2, '2026-06-05 20:00:00', 18),
(138, 1, 3, '2026-06-05 20:30:00', 18),
(139, 15, 4, '2026-06-06 15:00:00', 18),
(140, 14, 5, '2026-06-06 17:30:00', 18),
(141, 13, 6, '2026-06-07 15:00:00', 18),
(142, 12, 7, '2026-06-07 17:30:00', 18),
(143, 11, 8, '2026-06-08 18:00:00', 18),
(144, 10, 9, '2026-06-08 20:00:00', 18),
(145, 10, 16, '2026-06-12 20:00:00', 19),
(146, 9, 11, '2026-06-12 20:30:00', 19),
(147, 8, 12, '2026-06-13 15:00:00', 19),
(148, 7, 13, '2026-06-13 17:30:00', 19),
(149, 6, 14, '2026-06-14 15:00:00', 19),
(150, 5, 15, '2026-06-14 17:30:00', 19),
(151, 4, 1, '2026-06-15 18:00:00', 19),
(152, 3, 2, '2026-06-15 20:00:00', 19),
(153, 16, 3, '2026-06-19 20:00:00', 20),
(154, 2, 4, '2026-06-19 20:30:00', 20),
(155, 1, 5, '2026-06-20 15:00:00', 20),
(156, 15, 6, '2026-06-20 17:30:00', 20),
(157, 14, 7, '2026-06-21 15:00:00', 20),
(158, 13, 8, '2026-06-21 17:30:00', 20),
(159, 12, 9, '2026-06-22 18:00:00', 20),
(160, 11, 10, '2026-06-22 20:00:00', 20),
(161, 11, 16, '2026-06-26 20:00:00', 21),
(162, 10, 12, '2026-06-26 20:30:00', 21),
(163, 9, 13, '2026-06-27 15:00:00', 21),
(164, 8, 14, '2026-06-27 17:30:00', 21),
(165, 7, 15, '2026-06-28 15:00:00', 21),
(166, 6, 1, '2026-06-28 17:30:00', 21),
(167, 5, 2, '2026-06-29 18:00:00', 21),
(168, 4, 3, '2026-06-29 20:00:00', 21),
(169, 16, 4, '2026-07-03 20:00:00', 22),
(170, 3, 5, '2026-07-03 20:30:00', 22),
(171, 2, 6, '2026-07-04 15:00:00', 22),
(172, 1, 7, '2026-07-04 17:30:00', 22),
(173, 15, 8, '2026-07-05 15:00:00', 22),
(174, 14, 9, '2026-07-05 17:30:00', 22),
(175, 13, 10, '2026-07-06 18:00:00', 22),
(176, 12, 11, '2026-07-06 20:00:00', 22),
(177, 12, 16, '2026-07-10 20:00:00', 23),
(178, 11, 13, '2026-07-10 20:30:00', 23),
(179, 10, 14, '2026-07-11 15:00:00', 23),
(180, 9, 15, '2026-07-11 17:30:00', 23),
(181, 8, 1, '2026-07-12 15:00:00', 23),
(182, 7, 2, '2026-07-12 17:30:00', 23),
(183, 6, 3, '2026-07-13 18:00:00', 23),
(184, 5, 4, '2026-07-13 20:00:00', 23),
(185, 16, 5, '2026-07-17 20:00:00', 24),
(186, 4, 6, '2026-07-17 20:30:00', 24),
(187, 3, 7, '2026-07-18 15:00:00', 24),
(188, 2, 8, '2026-07-18 17:30:00', 24),
(189, 1, 9, '2026-07-19 15:00:00', 24),
(190, 15, 10, '2026-07-19 17:30:00', 24),
(191, 14, 11, '2026-07-20 18:00:00', 24),
(192, 13, 12, '2026-07-20 20:00:00', 24),
(193, 13, 16, '2026-07-24 20:00:00', 25),
(194, 12, 14, '2026-07-24 20:30:00', 25),
(195, 11, 15, '2026-07-25 15:00:00', 25),
(196, 10, 1, '2026-07-25 17:30:00', 25),
(197, 9, 2, '2026-07-26 15:00:00', 25),
(198, 8, 3, '2026-07-26 17:30:00', 25),
(199, 7, 4, '2026-07-27 18:00:00', 25),
(200, 6, 5, '2026-07-27 20:00:00', 25),
(201, 16, 6, '2026-07-31 20:00:00', 26),
(202, 5, 7, '2026-07-31 20:30:00', 26),
(203, 4, 8, '2026-08-01 15:00:00', 26),
(204, 3, 9, '2026-08-01 17:30:00', 26),
(205, 2, 10, '2026-08-02 15:00:00', 26),
(206, 1, 11, '2026-08-02 17:30:00', 26),
(207, 15, 12, '2026-08-03 18:00:00', 26),
(208, 14, 13, '2026-08-03 20:00:00', 26),
(209, 14, 16, '2026-08-07 20:00:00', 27),
(210, 13, 15, '2026-08-07 20:30:00', 27),
(211, 12, 1, '2026-08-08 15:00:00', 27),
(212, 11, 2, '2026-08-08 17:30:00', 27),
(213, 10, 3, '2026-08-09 15:00:00', 27),
(214, 9, 4, '2026-08-09 17:30:00', 27),
(215, 8, 5, '2026-08-10 18:00:00', 27),
(216, 7, 6, '2026-08-10 20:00:00', 27),
(217, 16, 7, '2026-08-14 20:00:00', 28),
(218, 6, 8, '2026-08-14 20:30:00', 28),
(219, 5, 9, '2026-08-15 15:00:00', 28),
(220, 4, 10, '2026-08-15 17:30:00', 28),
(221, 3, 11, '2026-08-16 15:00:00', 28),
(222, 2, 12, '2026-08-16 17:30:00', 28),
(223, 1, 13, '2026-08-17 18:00:00', 28),
(224, 15, 14, '2026-08-17 20:00:00', 28),
(225, 15, 16, '2026-08-21 20:00:00', 29),
(226, 14, 1, '2026-08-21 20:30:00', 29),
(227, 13, 2, '2026-08-22 15:00:00', 29),
(228, 12, 3, '2026-08-22 17:30:00', 29),
(229, 11, 4, '2026-08-23 15:00:00', 29),
(230, 10, 5, '2026-08-23 17:30:00', 29),
(231, 9, 6, '2026-08-24 18:00:00', 29),
(232, 8, 7, '2026-08-24 20:00:00', 29),
(233, 16, 8, '2026-08-28 20:00:00', 30),
(234, 7, 9, '2026-08-28 20:30:00', 30),
(235, 6, 10, '2026-08-29 15:00:00', 30),
(236, 5, 11, '2026-08-29 17:30:00', 30),
(237, 4, 12, '2026-08-30 15:00:00', 30),
(238, 3, 13, '2026-08-30 17:30:00', 30),
(239, 2, 14, '2026-08-31 18:00:00', 30),
(240, 1, 15, '2026-08-31 20:00:00', 30);

INSERT INTO `personel` (`ID`, `Imie`, `Nazwisko`, `Profesja`, `Kraj`) VALUES
(1, 'Erik', 'Ten Van', 'Trener', 'Holandia'),
(2, 'John', 'Carvnick', 'Asystent trenera', 'Irlandia'),
(3, 'Zbyszek', 'Spóźnialski', 'Lekarz', 'Polska'),
(4, 'Anissa', 'Woman', 'Trenerka fitness', 'Stany Zjednoczone Ameryki'),
(5, 'Jan', 'Wąski', 'Trener bramkarzy', 'Polska');


INSERT INTO `mecze` (`przeciwnik`, `czy_domowy`, `data_meczu`, `stadion`, `miasto`, `id_terminarza`) VALUES
-- Kolejka 1: Chaber (1) vs Mleczne Ptaki (16) - DOMOWY
('Mleczne Ptaki', 1, '2026-02-06 20:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 1),
-- Kolejka 2: Chaber (1) vs Zatyłek (2) - DOMOWY (derby!)
('Zatyłek Pobiedziska', 1, '2026-02-16 20:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 16),
-- Kolejka 3: Ćwikła (3) vs Chaber (1) - WYJAZDOWY
('Ćwikła Opalenica', 0, '2026-02-20 20:30:00', 'Pole Buraków', 'Opalenica', 18),
-- Kolejka 4: Chaber (1) vs Maczeta (4) - DOMOWY
('Maczeta Dębiec', 1, '2026-03-02 18:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 31),
-- Kolejka 5: Piotrki (5) vs Chaber (1) - WYJAZDOWY
('Piotrki Tomaszów', 0, '2026-03-07 15:00:00', 'CWL Arena', 'Tomaszów', 35),
-- Kolejka 6: Chaber (1) vs Tęczowi (6) - DOMOWY
('Tęczowi Grecja', 1, '2026-03-15 17:30:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 46),
-- Kolejka 7: Lustro (7) vs Chaber (1) - WYJAZDOWY
('Lustro Puszczykowo', 0, '2026-03-21 17:30:00', 'Stadion Szklanek i Garnków', 'Puszczykowo', 52),
-- Kolejka 8: Chaber (1) vs Drzwi (8) - DOMOWY
('Drzwi Chludowo', 1, '2026-03-29 15:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 61),
-- Kolejka 9: Lodówka (9) vs Chaber (1) - WYJAZDOWY
('Lodówka Luboń', 0, '2026-04-05 15:00:00', 'Stadion imienia Górki Papieskiej', 'Luboń', 69),
-- Kolejka 10: Chaber (1) vs Stypa (10) - DOMOWY
('Stypa Budapeszt', 1, '2026-04-11 17:30:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 76),
-- Kolejka 11: Rajdowcy (11) vs Chaber (1) - WYJAZDOWY
('Rajdowcy Zbąszynek', 0, '2026-04-19 17:30:00', 'Arena Wyścigów Rajdowych', 'Zbąszynek', 86),
-- Kolejka 12: Chaber (1) vs Karni (12) - DOMOWY
('Karni Wronki', 1, '2026-04-25 15:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 91),
-- Kolejka 13: Insomnia (13) vs Chaber (1) - WYJAZDOWY
('Insomnia Pobiedziska', 0, '2026-05-04 18:00:00', 'Arena Głębokiego Snu', 'Pobiedziska', 103),
-- Kolejka 14: Chaber (1) vs Tchórze (14) - DOMOWY
('Tchórze Marianowo', 1, '2026-05-08 20:30:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 106),
-- Kolejka 15: Bidul (15) vs Chaber (1) - WYJAZDOWY
('Bidul Dębiec', 0, '2026-05-18 20:00:00', 'Arena Bursa 2', 'Dębiec', 120),
-- Kolejka 16: Mleczne Ptaki (16) vs Chaber (1) - WYJAZDOWY
('Mleczne Ptaki', 0, '2026-05-22 20:00:00', 'Stadion Cytatów i Mądrości', 'Ptaki', 121),
-- Kolejka 17: Zatyłek (2) vs Chaber (1) - WYJAZDOWY (derby wyjazdowe!)
('Zatyłek Pobiedziska', 0, '2026-06-01 20:00:00', 'Fanservice Stadium', 'Pobiedziska', 136),
-- Kolejka 18: Chaber (1) vs Ćwikła (3) - DOMOWY
('Ćwikła Opalenica', 1, '2026-06-05 20:30:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 138),
-- Kolejka 19: Maczeta (4) vs Chaber (1) - WYJAZDOWY
('Maczeta Dębiec', 0, '2026-06-15 18:00:00', 'Arena Za Garażami', 'Dębiec', 151),
-- Kolejka 20: Chaber (1) vs Piotrki (5) - DOMOWY
('Piotrki Tomaszów', 1, '2026-06-20 15:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 155),
-- Kolejka 21: Tęczowi (6) vs Chaber (1) - WYJAZDOWY
('Tęczowi Grecja', 0, '2026-06-28 17:30:00', 'Olimp', 'Grecja', 166),
-- Kolejka 22: Chaber (1) vs Lustro (7) - DOMOWY
('Lustro Puszczykowo', 1, '2026-07-04 17:30:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 172),
-- Kolejka 23: Drzwi (8) vs Chaber (1) - WYJAZDOWY
('Drzwi Chludowo', 0, '2026-07-12 15:00:00', 'Arena Dworcowa', 'Chludowo', 181),
-- Kolejka 24: Chaber (1) vs Lodówka (9) - DOMOWY
('Lodówka Luboń', 1, '2026-07-19 15:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 189),
-- Kolejka 25: Stypa (10) vs Chaber (1) - WYJAZDOWY
('Stypa Budapeszt', 0, '2026-07-25 17:30:00', 'Stadion Miejski 5m^2', 'Budapeszt', 196),
-- Kolejka 26: Chaber (1) vs Rajdowcy (11) - DOMOWY
('Rajdowcy Zbąszynek', 1, '2026-08-02 17:30:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 206),
-- Kolejka 27: Karni (12) vs Chaber (1) - WYJAZDOWY
('Karni Wronki', 0, '2026-08-08 15:00:00', 'Stadion Obok Zakładu Karnego', 'Wronki', 211),
-- Kolejka 28: Chaber (1) vs Insomnia (13) - DOMOWY
('Insomnia Pobiedziska', 1, '2026-08-17 18:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 223),
-- Kolejka 29: Tchórze (14) vs Chaber (1) - WYJAZDOWY
('Tchórze Marianowo', 0, '2026-08-21 20:30:00', 'Stadion imienia Uciekinierów i Tchórzy', 'Marianowo', 226),
-- Kolejka 30: Chaber (1) vs Bidul (15) - DOMOWY (ostatnia kolejka!)
('Bidul Dębiec', 1, '2026-08-31 20:00:00', 'Arena imienia Tomasza Piotrkowskiego', 'Pobiedziska', 240);


INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu) VALUES
                                                                                      ('A1','A',1,0,50,'brazowy_los',1),('A1','A',2,0,50,'brazowy_los',1),('A1','A',3,0,50,'brazowy_los',1),('A1','A',4,0,50,'brazowy_los',1),('A1','A',5,0,50,'brazowy_los',1),('A1','A',6,0,50,'brazowy_los',1),('A1','A',7,0,50,'brazowy_los',1),('A1','A',8,0,50,'brazowy_los',1),('A1','A',9,0,50,'brazowy_los',1),('A1','A',10,0,50,'brazowy_los',1),
                                                                                      ('A1','B',1,0,52,'brazowy_los',1),('A1','B',2,0,52,'brazowy_los',1),('A1','B',3,0,52,'brazowy_los',1),('A1','B',4,0,52,'brazowy_los',1),('A1','B',5,0,52,'brazowy_los',1),('A1','B',6,0,52,'brazowy_los',1),('A1','B',7,0,52,'brazowy_los',1),('A1','B',8,0,52,'brazowy_los',1),('A1','B',9,0,52,'brazowy_los',1),('A1','B',10,0,52,'brazowy_los',1),
                                                                                      ('A1','C',1,0,54,'brazowy_los',1),('A1','C',2,0,54,'brazowy_los',1),('A1','C',3,0,54,'brazowy_los',1),('A1','C',4,0,54,'brazowy_los',1),('A1','C',5,0,54,'brazowy_los',1),('A1','C',6,0,54,'brazowy_los',1),('A1','C',7,0,54,'brazowy_los',1),('A1','C',8,0,54,'brazowy_los',1),('A1','C',9,0,54,'brazowy_los',1),('A1','C',10,0,54,'brazowy_los',1),
                                                                                      ('A1','D',1,0,56,'brazowy_los',1),('A1','D',2,0,56,'brazowy_los',1),('A1','D',3,0,56,'brazowy_los',1),('A1','D',4,0,56,'brazowy_los',1),('A1','D',5,0,56,'brazowy_los',1),('A1','D',6,0,56,'brazowy_los',1),('A1','D',7,0,56,'brazowy_los',1),('A1','D',8,0,56,'brazowy_los',1),('A1','D',9,0,56,'brazowy_los',1),('A1','D',10,0,56,'brazowy_los',1),
                                                                                      ('A1','E',1,0,58,'brazowy_los',1),('A1','E',2,0,58,'brazowy_los',1),('A1','E',3,0,58,'brazowy_los',1),('A1','E',4,0,58,'brazowy_los',1),('A1','E',5,0,58,'brazowy_los',1),('A1','E',6,0,58,'brazowy_los',1),('A1','E',7,0,58,'brazowy_los',1),('A1','E',8,0,58,'brazowy_los',1),('A1','E',9,0,58,'brazowy_los',1),('A1','E',10,0,58,'brazowy_los',1),
                                                                                      ('A1','F',1,0,60,'brazowy_los',1),('A1','F',2,0,60,'brazowy_los',1),('A1','F',3,0,60,'brazowy_los',1),('A1','F',4,0,60,'brazowy_los',1),('A1','F',5,0,60,'brazowy_los',1),('A1','F',6,0,60,'brazowy_los',1),('A1','F',7,0,60,'brazowy_los',1),('A1','F',8,0,60,'brazowy_los',1),('A1','F',9,0,60,'brazowy_los',1),('A1','F',10,0,60,'brazowy_los',1);

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'A2', rzad, numer, 0, cena, 'brazowy_los', 1 FROM miejsca WHERE sektor='A1' AND id_meczu=1;

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'A3', rzad, numer, 0, cena, 'brazowy_los', 1 FROM miejsca WHERE sektor='A1' AND id_meczu=1;

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'A4', rzad, numer, 0, cena, 'brazowy_los', 1 FROM miejsca WHERE sektor='A1' AND id_meczu=1;

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'C1', rzad, numer, 0, cena, 'brazowy_los', 1 FROM miejsca WHERE sektor='A1' AND id_meczu=1;

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'C2', rzad, numer, 0, cena, 'brazowy_los', 1 FROM miejsca WHERE sektor='A1' AND id_meczu=1;

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'C3', rzad, numer, 0, cena, 'brazowy_los', 1 FROM miejsca WHERE sektor='A1' AND id_meczu=1;

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'C4', rzad, numer, 0, cena, 'brazowy_los', 1 FROM miejsca WHERE sektor='A1' AND id_meczu=1;

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu) VALUES
                                                                                      ('B1','A',1,0,90,'srebrny_jez',1),('B1','A',2,0,90,'srebrny_jez',1),('B1','A',3,0,90,'srebrny_jez',1),('B1','A',4,0,90,'srebrny_jez',1),('B1','A',5,0,90,'srebrny_jez',1),('B1','A',6,0,90,'srebrny_jez',1),('B1','A',7,0,90,'srebrny_jez',1),('B1','A',8,0,90,'srebrny_jez',1),('B1','A',9,0,90,'srebrny_jez',1),('B1','A',10,0,90,'srebrny_jez',1),
                                                                                      ('B1','B',1,0,93,'srebrny_jez',1),('B1','B',2,0,93,'srebrny_jez',1),('B1','B',3,0,93,'srebrny_jez',1),('B1','B',4,0,93,'srebrny_jez',1),('B1','B',5,0,93,'srebrny_jez',1),('B1','B',6,0,93,'srebrny_jez',1),('B1','B',7,0,93,'srebrny_jez',1),('B1','B',8,0,93,'srebrny_jez',1),('B1','B',9,0,93,'srebrny_jez',1),('B1','B',10,0,93,'srebrny_jez',1),
                                                                                      ('B1','C',1,0,96,'srebrny_jez',1),('B1','C',2,0,96,'srebrny_jez',1),('B1','C',3,0,96,'srebrny_jez',1),('B1','C',4,0,96,'srebrny_jez',1),('B1','C',5,0,96,'srebrny_jez',1),('B1','C',6,0,96,'srebrny_jez',1),('B1','C',7,0,96,'srebrny_jez',1),('B1','C',8,0,96,'srebrny_jez',1),('B1','C',9,0,96,'srebrny_jez',1),('B1','C',10,0,96,'srebrny_jez',1),
                                                                                      ('B1','D',1,0,99,'srebrny_jez',1),('B1','D',2,0,99,'srebrny_jez',1),('B1','D',3,0,99,'srebrny_jez',1),('B1','D',4,0,99,'srebrny_jez',1),('B1','D',5,0,99,'srebrny_jez',1),('B1','D',6,0,99,'srebrny_jez',1),('B1','D',7,0,99,'srebrny_jez',1),('B1','D',8,0,99,'srebrny_jez',1),('B1','D',9,0,99,'srebrny_jez',1),('B1','D',10,0,99,'srebrny_jez',1),
                                                                                      ('B1','E',1,0,102,'srebrny_jez',1),('B1','E',2,0,102,'srebrny_jez',1),('B1','E',3,0,102,'srebrny_jez',1),('B1','E',4,0,102,'srebrny_jez',1),('B1','E',5,0,102,'srebrny_jez',1),('B1','E',6,0,102,'srebrny_jez',1),('B1','E',7,0,102,'srebrny_jez',1),('B1','E',8,0,102,'srebrny_jez',1),('B1','E',9,0,102,'srebrny_jez',1),('B1','E',10,0,102,'srebrny_jez',1),
                                                                                      ('B1','F',1,0,105,'srebrny_jez',1),('B1','F',2,0,105,'srebrny_jez',1),('B1','F',3,0,105,'srebrny_jez',1),('B1','F',4,0,105,'srebrny_jez',1),('B1','F',5,0,105,'srebrny_jez',1),('B1','F',6,0,105,'srebrny_jez',1),('B1','F',7,0,105,'srebrny_jez',1),('B1','F',8,0,105,'srebrny_jez',1),('B1','F',9,0,105,'srebrny_jez',1),('B1','F',10,0,105,'srebrny_jez',1);

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B2', rzad, numer, 0, cena, 'srebrny_jez', 1 FROM miejsca WHERE sektor='B1' AND id_meczu=1;

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu) VALUES
                                                                                      ('D1','A',1,0,150,'zloty_jelen',1),('D1','A',2,0,150,'zloty_jelen',1),('D1','A',3,0,150,'zloty_jelen',1),('D1','A',4,0,150,'zloty_jelen',1),('D1','A',5,0,150,'zloty_jelen',1),('D1','A',6,0,150,'zloty_jelen',1),('D1','A',7,0,150,'zloty_jelen',1),('D1','A',8,0,150,'zloty_jelen',1),('D1','A',9,0,150,'zloty_jelen',1),('D1','A',10,0,150,'zloty_jelen',1),
                                                                                      ('D1','B',1,0,160,'zloty_jelen',1),('D1','B',2,0,160,'zloty_jelen',1),('D1','B',3,0,160,'zloty_jelen',1),('D1','B',4,0,160,'zloty_jelen',1),('D1','B',5,0,160,'zloty_jelen',1),('D1','B',6,0,160,'zloty_jelen',1),('D1','B',7,0,160,'zloty_jelen',1),('D1','B',8,0,160,'zloty_jelen',1),('D1','B',9,0,160,'zloty_jelen',1),('D1','B',10,0,160,'zloty_jelen',1),
                                                                                      ('D1','C',1,0,170,'zloty_jelen',1),('D1','C',2,0,170,'zloty_jelen',1),('D1','C',3,0,170,'zloty_jelen',1),('D1','C',4,0,170,'zloty_jelen',1),('D1','C',5,0,170,'zloty_jelen',1),('D1','C',6,0,170,'zloty_jelen',1),('D1','C',7,0,170,'zloty_jelen',1),('D1','C',8,0,170,'zloty_jelen',1),('D1','C',9,0,170,'zloty_jelen',1),('D1','C',10,0,170,'zloty_jelen',1);

INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'D2', rzad, numer, 0, cena, 'zloty_jelen', 1 FROM miejsca WHERE sektor='D1' AND id_meczu=1;


INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT sektor, rzad, numer, 0,
       CASE WHEN id_meczu_docelowy IN (2,28) AND typ_biletu='brazowy_los' THEN cena+10
            WHEN id_meczu_docelowy IN (2,28) AND typ_biletu='srebrny_jez' THEN cena+8
            WHEN id_meczu_docelowy IN (2,28) AND typ_biletu='zloty_jelen' THEN cena+5
            ELSE cena END,
       typ_biletu, id_meczu_docelowy
FROM miejsca, (SELECT 2 as id_meczu_docelowy UNION SELECT 4 UNION SELECT 6 UNION SELECT 8 UNION SELECT 10 UNION SELECT 12 UNION SELECT 14 UNION SELECT 18 UNION SELECT 20 UNION SELECT 22 UNION SELECT 24 UNION SELECT 26 UNION SELECT 28 UNION SELECT 30) AS mecze
WHERE miejsca.id_meczu = 1;


INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 60, 'normalny', 3 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 50, 'normalny', 5 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 55, 'normalny', 7 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 55, 'normalny', 9 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 65, 'normalny', 11 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 70, 'normalny', 13 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 55, 'normalny', 15 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 65, 'normalny', 16 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 80, 'normalny', 17 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 60, 'normalny', 19 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 70, 'normalny', 21 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 50, 'normalny', 23 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 75, 'normalny', 25 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 60, 'normalny', 27 FROM miejsca WHERE sektor='A1' AND id_meczu=1;
INSERT INTO miejsca (sektor, rzad, numer, czy_zajete, cena, typ_biletu, id_meczu)
SELECT 'B1', rzad, numer, 0, 45, 'normalny', 29 FROM miejsca WHERE sektor='A1' AND id_meczu=1;