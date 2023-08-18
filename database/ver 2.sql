-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.33 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for video_catelog
DROP DATABASE IF EXISTS `video_catelog`;
CREATE DATABASE IF NOT EXISTS `video_catelog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `video_catelog`;

-- Dumping structure for table video_catelog.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `prod_id` int DEFAULT NULL,
  `trans_id` int DEFAULT NULL,
  `order_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table video_catelog.order: ~0 rows (approximately)

-- Dumping structure for table video_catelog.product
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `video_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img_path` varchar(5000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `length` int unsigned DEFAULT '0',
  `cost` decimal(20,6) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table video_catelog.product: ~7 rows (approximately)
INSERT INTO `product` (`id`, `video_title`, `creator`, `description`, `img_path`, `length`, `cost`) VALUES
	(1, 'Meet Me 247', 'Cindy Castle', 'This is a vodeo a bout cat fishing eh', 'http://digitalcorz.com//uploads/post%20image/88/3888.png', 24, 24.800000),
	(2, 'The Secret Life Of Judy Tailor', 'Judy Tailor', 'This is a vodeo a bout dumb stuff', 'http://digitalcorz.com//uploads/post%20image/70/Yy247gYvzaMZXprhZHXy4E.jpg', 45, 29.990000),
	(3, 'A series of unfortunate events', 'lemoney snicket', 'A story about 3 kids who are orphans', 'http://digitalcorz.com//uploads/post%20image/82/cbc-1.jpg', 60, 25.500000),
	(4, 'James Bond and the Sneaky Adventures', 'James Smith', 'This is a movie about james bond', 'http://digitalcorz.com//uploads/post%20image/71/THmxKzzqi6JZJhwKT2yLM6.jpg', 50, 74.000000),
	(5, 'The Ime', 'Nill Sidn', 'About the time the world knew', 'https://digitalcorz.com//uploads/news-image/61/phone_flip.jpg?w=960&cbr=1&q=90&fit=max', 3, 14.000000),
	(6, 'A lick in Time', 'Brody Sqey', 'This is a made up description', 'http://digitalcorz.com//uploads/post%20image/74/GettyImages-1207206237-(1).jpg', 1, 1.000000),
	(7, 'Soul of the Feet', 'Chris Bol', 'The sound of feet', 'http://digitalcorz.com//uploads/post%20image/101/5qdcav0o_twitter-threads_625x300_06_July_23.png', 112, 22.000000);

-- Dumping structure for table video_catelog.transaction
DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `trans_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `video_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table video_catelog.transaction: ~0 rows (approximately)

-- Dumping structure for table video_catelog.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `other` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table video_catelog.user: ~2 rows (approximately)
INSERT INTO `user` (`id`, `name`, `username`, `email`, `password`, `token`, `other`, `created_at`) VALUES
	(1, 'James', 'jbond', 'jbond@gmail.com', 'password123', '993ab841-a33a-4d39-9c59-aabb6b7b4e0e', NULL, NULL),
	(2, 'Alex', 'arosen', 'arose@gmail.com', 'password123', 's66fiw1-a33a-4d39-9c59-ooi87ythjm', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
