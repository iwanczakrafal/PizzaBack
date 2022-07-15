-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 15 Lip 2022, 18:48
-- Wersja serwera: 10.4.18-MariaDB
-- Wersja PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `nest_pizza`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `option_item`
--

CREATE TABLE `option_item` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `option_item`
--

INSERT INTO `option_item` (`id`, `name`, `price`) VALUES
('246e2d6b-56f0-4224-8afd-686948ec2313', 'Cheese', 2),
('87d90411-614d-477d-b9ee-633473aa886a', 'Olives', 3),
('d43c945c-3c2c-4ecf-a9a5-2aac3aeb2434', 'Pepper', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `product_in_basket`
--

CREATE TABLE `product_in_basket` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `count` int(11) NOT NULL DEFAULT 1,
  `productItemId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `optionId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `product_in_basket`
--

INSERT INTO `product_in_basket` (`id`, `count`, `productItemId`, `optionId`, `userId`) VALUES
('9b112a16-2916-4da3-a21d-e1ccd34ad749', 1, '2a57591b-c370-49bd-94db-1028fbda1949', NULL, '807d82c0-5bab-4cb2-bd1f-b30e04205c76');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `product_item`
--

CREATE TABLE `product_item` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `isSpecial` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `product_item`
--

INSERT INTO `product_item` (`id`, `name`, `description`, `photo`, `price`, `createdAt`, `isSpecial`) VALUES
('14f7213d-92c8-4613-a65f-1ce6b79b8379', 'Diavola', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupid.Lorem ipsum dolor sit amet, consectetur adipisicing elit.', '4a9871a2-70e7-409d-ba6c-7cc681a43835.png', 22, '2022-07-15 10:07:45', 0),
('2a57591b-c370-49bd-94db-1028fbda1949', 'Margherita', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupid.Lorem ipsum dolor sit amet, consectetur adipisicing elit.', '8734dbf0-c339-496a-8226-aba10cc66e6f.png', 15, '2022-07-15 10:05:53', 0),
('2f43fbd1-36d4-40ba-af18-aec60cc5384b', 'Carbonara', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupid.Lorem ipsum dolor sit amet, consectetur adipisicing elit.', '026057c6-cb5a-4b6e-8ad3-2f0c18d44b9a.png', 21, '2022-07-15 10:06:50', 0),
('606f1ed8-c7aa-4899-a3b1-ac3bc0f27d84', 'Pepperoni', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupid.Lorem ipsum dolor sit amet, consectetur adipisicing elit.', '0b7a9328-4cec-479b-bb38-a9b0fbe70a5a.png', 21, '2022-07-15 09:52:19', 0),
('6e318228-9b68-4a07-8517-f702528c29cb', 'Capricciosa', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupid.Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'cc011a30-c216-4955-853b-b3e733d5234a.png', 23, '2022-07-15 10:07:22', 0),
('908fc37a-bb41-4fa0-b481-7d9414a2581d', 'Americana', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupid.Lorem ipsum dolor sit amet, consectetur adipisicing elit.', '2cbc5ab8-bbd5-4963-ba64-ea36dbef4307.png', 25, '2022-07-15 10:05:19', 1),
('a80c33f6-249b-4633-b744-cff4cadad321', 'Veggie Supreme', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupid.Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'abcbbef8-0c92-4622-8dd0-bdd738db6934.png', 26, '2022-07-15 10:08:18', 1),
('da7caa43-1714-4a5f-b7ab-00fef03c97c2', 'Toscana', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cupid.Lorem ipsum dolor sit amet, consectetur adipisicing elit.', '6bd18e4e-b18a-4d56-bcbf-dbb46e51aa31.png', 27, '2022-07-15 10:08:45', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`id`, `name`, `lastName`, `email`, `passwordHash`, `tokenId`, `isAdmin`, `createdAt`) VALUES
('4f20e055-a644-4ef9-ab69-f81f38e6bcae', 'Admin', 'AdminAdmin', 'admin@gmail.com', '84b82ab31415bcb501ca4a2ba62fdf97d8574868bba59c7e33d22ee05ddcf2587812965ed7f710abb386dda76a883b6ff2e8f6972f16a1906b6cf6efea642eb0', '', 1, '2022-07-11 17:48:48'),
('807d82c0-5bab-4cb2-bd1f-b30e04205c76', 'Tom', 'TomTom', 'tom@gmail.com', 'b17ea425f5fcd21aa5d4e7f464613bde957151047140b88eadeab5378527ee03b5ef08d0c8eb0906187c6eb18dc60aa896958be62704a9acbfd24cbfc70a6d64', '701e6837-8948-4982-ad37-4972aea3002d', 0, '2022-07-15 13:34:08');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `option_item`
--
ALTER TABLE `option_item`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `product_in_basket`
--
ALTER TABLE `product_in_basket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_896ca32de5a524bc3d57d7c21ad` (`productItemId`),
  ADD KEY `FK_5f459cf0e35d0890cdc4e91fee2` (`optionId`),
  ADD KEY `FK_a818d89cd443dc9d584c383aaf5` (`userId`);

--
-- Indeksy dla tabeli `product_item`
--
ALTER TABLE `product_item`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `product_in_basket`
--
ALTER TABLE `product_in_basket`
  ADD CONSTRAINT `FK_5f459cf0e35d0890cdc4e91fee2` FOREIGN KEY (`optionId`) REFERENCES `option_item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_896ca32de5a524bc3d57d7c21ad` FOREIGN KEY (`productItemId`) REFERENCES `product_item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a818d89cd443dc9d584c383aaf5` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
