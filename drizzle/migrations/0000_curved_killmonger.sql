CREATE TABLE `forms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`created_at` datetime DEFAULT current_timestamp,
	`updated_at` datetime DEFAULT current_timestamp,
	CONSTRAINT `forms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `forms` (`name`);