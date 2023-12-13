/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100428 (10.4.28-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : e-budgeting

 Target Server Type    : MySQL
 Target Server Version : 100428 (10.4.28-MariaDB)
 File Encoding         : 65001

 Date: 13/12/2023 20:02:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for h_kegiatan
-- ----------------------------
DROP TABLE IF EXISTS `h_kegiatan`;
CREATE TABLE `h_kegiatan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_anggaran` int(11) DEFAULT NULL,
  `kegiatan` varchar(255) DEFAULT NULL,
  `nominal` decimal(65,0) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  `bulan_kegiatan` char(2) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `opex` int(11) DEFAULT NULL COMMENT 'in direct opex 1 = ya, 0 = tidal ',
  `keterangan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `id` (`id_anggaran`) USING BTREE,
  CONSTRAINT `id` FOREIGN KEY (`id_anggaran`) REFERENCES `m_anggaran` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for r_user
-- ----------------------------
DROP TABLE IF EXISTS `r_user`;
CREATE TABLE `r_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `departemen` varchar(10) DEFAULT NULL,
  `jabatan` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nohp` char(12) DEFAULT NULL,
  `leveluser` int(11) DEFAULT NULL,
  `statususer` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `passwordview` varchar(255) DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  `status_online` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`username`) USING BTREE,
  KEY `jabatan` (`jabatan`) USING BTREE,
  KEY `leveluser` (`leveluser`) USING BTREE,
  KEY `departemen` (`departemen`) USING BTREE,
  CONSTRAINT `departemen` FOREIGN KEY (`departemen`) REFERENCES `r_departemen` (`kode_departement`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `jabatan` FOREIGN KEY (`jabatan`) REFERENCES `r_jabatan` (`kodejabatan`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `leveluser` FOREIGN KEY (`leveluser`) REFERENCES `r_leveluser` (`leveluser`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
