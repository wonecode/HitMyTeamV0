<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210901054747 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE summoner (`id` INT AUTO_INCREMENT NOT NULL, `league_user_id` INT NOT NULL, `name` VARCHAR(255) NOT NULL, `icon` INT NOT NULL, `is_available` TINYINT(1) NOT NULL, `tier` VARCHAR(255) NOT NULL, `ranking` INT DEFAULT NULL, `leaguepoints` INT DEFAULT NULL, `wins` INT DEFAULT NULL, `losses` INT DEFAULT NULL, `is_hotstreak` TINYINT(1) DEFAULT NULL, `main_role` VARCHAR(255) DEFAULT NULL, `main_champion` VARCHAR(255) DEFAULT NULL, `second_champion` VARCHAR(255) DEFAULT NULL, `third_champion` VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_ABE897631EC7CAE4 (`league_user_id`), PRIMARY KEY(`id`)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE summoner ADD CONSTRAINT FK_ABE897631EC7CAE4 FOREIGN KEY (`league_user_id`) REFERENCES league_user (`id`)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE summoner');
    }
}
