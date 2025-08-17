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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `detailsLink` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '/details',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (1,'/banner.png','ایونت بساط','ایونت بساط جایی است که شور و هیجان، خلاقیت و ارتباطات در کنار هم جمع می‌شوند. در این رویداد، فرصتی خواهید داشت تا با افراد الهام‌بخش آشنا شوید، ایده‌های تازه کشف کنید و تجربه‌هایی فراموش‌نشدنی بسازید. از گفتگوهای صمیمی و کارگاه‌های آموزشی گرفته تا اجراهای زنده و فضایی پرانرژی، همه‌چیز برای یک روز خاص و وو','پنجشنبه، ۲۴ فروردین','[\"دانش\", \"موزیک\"]','بازارچه','2025-08-11 09:27:19','2025-08-11 09:27:19','/details');
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
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
