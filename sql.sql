CREATE TABLE `request_screen` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `screen_id` INT(11) NOT NULL,
    `description` VARCHAR(100) DEFAULT NULL,
    `url` VARCHAR(250) DEFAULT NULL,
    `note` VARCHAR(250) DEFAULT NULL,
    `created_by` VARCHAR(45) DEFAULT NULL,
    `created_at` DATETIME DEFAULT NULL,
    `updated_by` VARCHAR(45) DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_by` VARCHAR(45) DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_screen_id` (`screen_id`),
    CONSTRAINT `fk_screen_id` FOREIGN KEY (`screen_id`)
        REFERENCES `screen` (`id`)
        ON DELETE CASCADE
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `screen` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) DEFAULT NULL,
    `description` VARCHAR(250) DEFAULT NULL,
    `created_by` VARCHAR(45) DEFAULT NULL,
    `created_at` DATETIME DEFAULT NULL,
    `updated_by` VARCHAR(45) DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_by` VARCHAR(45) DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `user` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) DEFAULT NULL,
    `login` VARCHAR(45) DEFAULT NULL,
    `password` VARCHAR(250) DEFAULT NULL,
    `email` VARCHAR(250) DEFAULT NULL,
    `birth_date` DATE DEFAULT NULL,
    `url_photograph` VARCHAR(250) DEFAULT NULL,
    `telephone` VARCHAR(45) DEFAULT NULL,
    `theme` LONGTEXT DEFAULT NULL,
    `created_by` VARCHAR(45) DEFAULT NULL,
    `created_at` DATETIME DEFAULT NULL,
    `updated_by` VARCHAR(45) DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_by` VARCHAR(45) DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `user_screen` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) NOT NULL,
    `screen_id` INT(11) NOT NULL,
    `created_by` VARCHAR(45) DEFAULT NULL,
    `created_at` DATETIME DEFAULT NULL,
    `updated_by` VARCHAR(45) DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `deleted_by` VARCHAR(45) DEFAULT NULL,
    `deleted_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `screen_id` (`screen_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `screen_id` FOREIGN KEY (`screen_id`)
        REFERENCES `screen` (`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `user_id` FOREIGN KEY (`user_id`)
        REFERENCES `user` (`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

