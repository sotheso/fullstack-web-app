-- MySQL dump 10.13  Distrib 8.0.37, for macos14 (arm64)
--
-- Host: localhost    Database: DavvvatDB
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `DavvvatDB`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `DavvvatDB` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `DavvvatDB`;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '/banner-image.jpg',
  `date` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `tags` json NOT NULL,
  `eventName` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `eventDescription` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `detailsLink` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '/details',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
INSERT INTO `Banner` VALUES (1,'/banner-image.jpg','پنجشنبه، ۲۴ فروردین','[\"دانش\", \"موزیک\"]','ایونت بساط','ایونت بساط جایی است که شور و هیجان، خلاقیت و ارتباطات در کنار هم جمع می‌شوند. در این رویداد، فرصتی خواهید داشت تا با افراد الهام‌بخش آشنا شوید، ایده‌های تازه کشف کنید و تجربه‌هایی فراموش‌نشدنی بسازید. از گفتگوهای صمیمی و کارگاه‌های آموزشی گرفته تا اجراهای زنده و فضایی پرانرژی، همه‌چیز برای یک روز خاص و وو','2025-08-11 09:27:19','2025-08-11 09:27:19','/details');
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `brandName` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `brandField` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `avatarSrc` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '/iconProfile.svg',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'آیسی مانکی همراه همیشگی شما در روزهای گرم و پرانرژی است. با ترکیبی بی‌نظیر از طعم طبیعی میوه‌ها و خنکای دلنشین، تجربه‌ای تازه از نوشیدنی‌های سالم و خوش‌طعم را برایتان رقم می‌زند. انتخابی عالی برای تمام لحظات روز','آیسی مانکی','طراوتی از دل طبیعت','/iconProfile.svg','2025-08-11 06:32:16','2025-08-11 06:32:16'),(2,'چیپس زمزم با استفاده از سیب‌زمینی‌های تازه و روش پخت منحصر‌به‌فرد، طعمی خلق می‌کند که هر بار چشیدن آن، خاطره‌ای خوشایند را زنده می‌کند. طعمی که از کودکی تا امروز همراه شما بوده و همیشه می‌ماند.','مزمز','طعمی ماندگار','/iconProfile.svg','2025-08-11 06:38:27','2025-08-11 06:38:27'),(3,'محصولات لبنی کاله با کیفیتی ممتاز و استفاده از بهترین شیر تازه، طعم واقعی و ارزش غذایی را به سفره خانواده‌ها می‌آورد. ما با نوآوری، استانداردهای بالای بهداشتی و احترام به سلیقه مشتریان، سال‌هاست اعتماد شما را به دست آورده‌ایم','کاله','انتخاب خانواده‌ها','/iconProfile.svg','2025-08-11 06:38:27','2025-08-11 06:38:27');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '/banner.png',
  `eventName` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `date` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `tags` json NOT NULL,
  `filterTag` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'بازارچه',
  `detailsLink` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '/details',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (1,'/banner.png','ایونت بساط','وقتی شب و بساط و وافور با منقل ترکیب بشن','پنجشنبه، ۲۴ فروردین','[\"بازارچه\"]','محبوب‌ترین','/details','2025-08-11 09:10:08','2025-08-11 14:15:56'),(2,'/banner.png','شب هنر و موسیقی','اجرای زنده با هنرمندان مستقل، بهمراه ورکشاپ کوتاه','شنبه، ۲۶ فروردین','[\"موزیک\", \"هنر\"]','جدید ترین','/details','2025-08-11 09:36:39','2025-08-11 09:36:39'),(3,'/banner.png','فستیوال موسیقی تابستان','یک شب پر از موسیقی زنده با بهترین بندهای شهر.','پنجشنبه، ۲۴ فروردین','[\"کنسرت\", \"زنده\"]','محبوب ترین','/details','2025-08-11 14:08:48','2025-08-11 14:08:48'),(4,'/banner.png','بازارچه آخر هفته','خرید محصولات دست‌ساز و خوردنی‌های خوشمزه.','جمعه، ۲۵ فروردین','[\"بازارچه\", \"خرید\"]','محبوب‌ ترین','/details','2025-08-11 14:08:52','2025-08-11 14:08:52'),(5,'/banner.png','ورکشاپ برنامه‌نویسی','یادگیری مفاهیم مدرن JS با مثال‌های عملی.','شنبه، ۲۶ فروردین','[\"ورکشاپ\", \"آموزش\"]','جدید ترین','/details','2025-08-11 14:08:54','2025-08-11 14:08:54'),(6,'/banner.png','نمایشگاه هنر معاصر','گالری آثار هنرمندان نوگرا و بحث پیرامون هنر امروز.','یکشنبه، ۲۷ فروردین','[\"نمایشگاه\", \"هنر\"]','محبوب ترین','/details','2025-08-11 14:08:56','2025-08-11 14:08:56'),(7,'/banner.png','شب فیلم و گفتگو','نمایش یک فیلم برگزیده و گفتگوی جمعی پس از آن.','دوشنبه، ۲۸ فروردین','[\"فیلم\", \"گپ\"]','جدید ترین','/details','2025-08-11 14:08:58','2025-08-11 14:08:58'),(8,'/banner.png','تور طبیعت‌گردی','یک روز کامل در دل طبیعت با برنامه‌های گروهی.','سه‌شنبه، ۲۹ فروردین','[\"سفر\", \"طبیعت\"]','جدید ترین','/details','2025-08-11 14:09:00','2025-08-11 14:09:00');
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_tag`
--

DROP TABLE IF EXISTS `event_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_tag` (
  `event_id` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`event_id`,`tag_id`),
  UNIQUE KEY `event_id_UNIQUE` (`event_id`),
  KEY `event_tag_f1_idx` (`tag_id`),
  CONSTRAINT `event_tag_f1` FOREIGN KEY (`tag_id`) REFERENCES `Tags` (`id`),
  CONSTRAINT `event_tag_f2` FOREIGN KEY (`event_id`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_tag`
--

LOCK TABLES `event_tag` WRITE;
/*!40000 ALTER TABLE `event_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `id` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `title` varchar(45) COLLATE utf8mb3_unicode_ci NOT NULL,
  `detail` varchar(500) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'Null',
  `addres` varchar(300) COLLATE utf8mb3_unicode_ci NOT NULL,
  `date` varchar(200) COLLATE utf8mb3_unicode_ci NOT NULL,
  `imag` json NOT NULL,
  `expire` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` tinyint NOT NULL,
  `title` varchar(45) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags`
--

DROP TABLE IF EXISTS `Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_f1_idx` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tags`
--

LOCK TABLES `Tags` WRITE;
/*!40000 ALTER TABLE `Tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `first_name` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT 'Null',
  `last_name` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT 'Null',
  `register_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `disable` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_basket_event`
--

DROP TABLE IF EXISTS `user_basket_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_basket_event` (
  `user_id` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `event_id` varchar(40) COLLATE utf8mb3_unicode_ci NOT NULL,
  `quntity` int NOT NULL,
  PRIMARY KEY (`user_id`,`event_id`),
  KEY `basket_f2` (`event_id`),
  CONSTRAINT `basket_f1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `basket_f2` FOREIGN KEY (`event_id`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_basket_event`
--

LOCK TABLES `user_basket_event` WRITE;
/*!40000 ALTER TABLE `user_basket_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_basket_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `role_id` tinyint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `user_roles_f2_idx` (`role_id`),
  CONSTRAINT `user_roles_f1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_roles_f2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb3_unicode_ci DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `username_6` (`username`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `username_7` (`username`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `username_8` (`username`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `username_9` (`username`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `username_10` (`username`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `username_11` (`username`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `username_12` (`username`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `username_13` (`username`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `username_14` (`username`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `username_15` (`username`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `username_16` (`username`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `username_17` (`username`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `username_18` (`username`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `username_19` (`username`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `username_20` (`username`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `username_21` (`username`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `username_22` (`username`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `username_23` (`username`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `username_24` (`username`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `username_25` (`username`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `username_26` (`username`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `username_27` (`username`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `username_28` (`username`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `username_29` (`username`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `username_30` (`username`),
  UNIQUE KEY `email_30` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-11 19:03:44
