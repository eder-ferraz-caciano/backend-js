-- --------------------------------------------------------
-- Servidor:                     192.168.1.197
-- Versão do servidor:           10.1.47-MariaDB-0ubuntu0.18.04.1 - Ubuntu 18.04
-- OS do Servidor:               debian-linux-gnu
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela eder.knex_migrations
CREATE TABLE IF NOT EXISTS `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela eder.knex_migrations: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
	(1, '20201125090300_screen.js', 1, '2021-07-17 08:14:24'),
	(2, '20201125090400_user.js', 1, '2021-07-17 08:14:25'),
	(3, '20201125090500_user_screen.js', 1, '2021-07-17 08:14:25'),
	(4, '20201125090600_request_screen.js', 1, '2021-07-17 08:14:25'),
	(5, '20201125090700_user_request.js', 1, '2021-07-17 08:14:26');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;

-- Copiando estrutura para tabela eder.knex_migrations_lock
CREATE TABLE IF NOT EXISTS `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela eder.knex_migrations_lock: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
	(1, 0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;

-- Copiando estrutura para tabela eder.request_screen
CREATE TABLE IF NOT EXISTS `request_screen` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `screen_id` int(10) unsigned NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `note` varchar(250) DEFAULT NULL,
  `created_by` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` varchar(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `request_screen_screen_id_foreign` (`screen_id`),
  CONSTRAINT `request_screen_screen_id_foreign` FOREIGN KEY (`screen_id`) REFERENCES `screen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela eder.request_screen: ~21 rows (aproximadamente)
/*!40000 ALTER TABLE `request_screen` DISABLE KEYS */;
INSERT INTO `request_screen` (`id`, `screen_id`, `description`, `url`, `note`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
	(1, 1, '', '/user/listar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(2, 1, '', '/user/editar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(3, 1, '', '/user/deletar/:id', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(4, 1, '', '/user/exibir/:id', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(5, 1, '', '/user-screen/telas-usuario/:userId', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(6, 1, '', '/user-screen/usuarios-tela/:screenId', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(7, 1, '', '/user-screen/salvar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(8, 1, '', '/user-screen/deletar/:id', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(9, 1, '', '/user-request/listar/:userId', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(10, 1, '', '/user-request/salvar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(11, 1, '', '/user-request/deletar/:id', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(12, 1, '', '/screen/listar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(13, 1, '', '/screen/salvar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(14, 1, '', '/screen/editar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(15, 1, '', '/screen/deletar/:id', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(16, 1, '', '/screen/exibir/:id', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(17, 1, '', '/request-screen/listar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(18, 1, '', '/request-screen/salvar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(19, 1, '', '/request-screen/editar', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(20, 1, '', '/request-screen/deletar/:id', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL),
	(21, 1, '', '/request-screen/exibir/:id', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `request_screen` ENABLE KEYS */;

-- Copiando estrutura para tabela eder.screen
CREATE TABLE IF NOT EXISTS `screen` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `order` varchar(4) DEFAULT NULL,
  `icon_color` varchar(25) DEFAULT NULL,
  `created_by` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` varchar(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela eder.screen: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `screen` DISABLE KEYS */;
INSERT INTO `screen` (`id`, `name`, `description`, `url`, `icon`, `order`, `icon_color`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
	(1, 'Settings', 'System Settings', '/settings', 'mdi-cogs', '10', 'secondary', 'MIGRATE SYSTEM', '2021-07-17 08:14:24', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `screen` ENABLE KEYS */;

-- Copiando estrutura para tabela eder.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `login` varchar(45) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `birth_date` timestamp NULL DEFAULT NULL,
  `url_photograph` varchar(250) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `theme` varchar(500) DEFAULT NULL,
  `created_by` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` varchar(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela eder.user: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `name`, `login`, `password`, `email`, `birth_date`, `url_photograph`, `telephone`, `theme`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
	(1, 'Eder Ferraz Caciano', 'ADMIN', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'eder.ferraz.caciano@hotmail.com', '0000-00-00 00:00:00', '', '', '', 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Copiando estrutura para tabela eder.user_request
CREATE TABLE IF NOT EXISTS `user_request` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `request_id` int(10) unsigned NOT NULL,
  `created_by` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` varchar(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_request_user_id_foreign` (`user_id`),
  KEY `user_request_request_id_foreign` (`request_id`),
  CONSTRAINT `user_request_request_id_foreign` FOREIGN KEY (`request_id`) REFERENCES `request_screen` (`id`),
  CONSTRAINT `user_request_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela eder.user_request: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `user_request` DISABLE KEYS */;
INSERT INTO `user_request` (`id`, `user_id`, `request_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
	(1, 1, 1, 'MIGRATE SYSTEM', '2021-07-17 08:14:26', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `user_request` ENABLE KEYS */;

-- Copiando estrutura para tabela eder.user_screen
CREATE TABLE IF NOT EXISTS `user_screen` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `screen_id` int(10) unsigned NOT NULL,
  `created_by` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_by` varchar(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_screen_user_id_foreign` (`user_id`),
  KEY `user_screen_screen_id_foreign` (`screen_id`),
  CONSTRAINT `user_screen_screen_id_foreign` FOREIGN KEY (`screen_id`) REFERENCES `screen` (`id`),
  CONSTRAINT `user_screen_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela eder.user_screen: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `user_screen` DISABLE KEYS */;
INSERT INTO `user_screen` (`id`, `user_id`, `screen_id`, `created_by`, `created_at`, `deleted_by`, `deleted_at`) VALUES
	(1, 1, 1, 'MIGRATE SYSTEM', '2021-07-17 08:14:25', NULL, NULL);
/*!40000 ALTER TABLE `user_screen` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
