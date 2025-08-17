-- Drop user-related tables from DavvvatDB
-- This script removes all authentication and user management tables

USE DavvvatDB;

-- Drop junction tables first (due to foreign key constraints)
DROP TABLE IF EXISTS `user_basket_event`;
DROP TABLE IF EXISTS `user_roles`;

-- Drop user tables
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `user`;

-- Drop roles table
DROP TABLE IF EXISTS `roles`;

-- Drop old Events table (different from the new Event table)
DROP TABLE IF EXISTS `Events`;

-- Drop Tags table (if it's only used for user functionality)
DROP TABLE IF EXISTS `Tags`;

-- Keep only the essential tables: brand, Event, Banner
-- These tables will remain and continue to work with the application
